require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
      "name",
      "price",
      "image",
      "shortDescription"
      from "products";`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const sql = `
    select *
      from "products"
      where "productId" = $1;`;
  const values = [productId];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`Cannot find product with productId ${productId}`, 404));
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const sql = `
    select *
      from "carts";`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  const productIdInt = parseInt(productId);
  if (!Number.isInteger(productIdInt) || productIdInt <= 0) {
    res.status(400).json({
      error: 'ProductId must a positive integer.'
    });
  }

  const sql = `
    select "price",
      "productId"
      from "products"
      where "productId" = $1;`;
  const values = [productId];

  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`Cannot find product with "productId" of ${productId}`, 400);
      } else {
        if (!req.session.cartId) {
          const sql = `
            insert into "carts" ("cartId", "createdAt")
              values (default, default)
              returning "cartId"`;
          return db.query(sql)
            .then(newRes => {
              return {
                cartId: newRes.rows[0].cartId,
                price: result.rows[0].price,
                productId: result.rows[0].productId
              };
            });
        } else {
          return {
            cartId: req,
            price: result.rows[0].price,
            productId: result.rows[0].productId
          };
        }
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
      returning "cartItemId"`;
      const values = [req.session.cartId, result.productId, result.price];
      return db.query(sql, values)
        .then(newRes => {
          return {
            cartItemId: newRes.rows[0].cartItemId
          };
        });
    })
    .then(result => {
      const sql = `
      select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1`;
      db.query(sql, [result.cartItemId])
        .then(newRes => {
          res.status(201).json(newRes.rows[0]);
        });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});

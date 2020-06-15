import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('/api/products')
      .then(results => results.json())
      .then(items => this.setState({
        products: items
      }))
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="container">
        <div className="row row-cols-3 my-5 mx-auto">
          {
            this.state.products.map(product => {
              return (
                <ProductListItem
                  key={product.productId}
                  product={product}
                  view={this.props.view} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default ProductList;

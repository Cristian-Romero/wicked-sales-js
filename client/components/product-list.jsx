import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(results => results.json)
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
      <div className="container mt-5">
        <div className="row row-cols-3">{
          this.state.products.map(item => {
            return <ProductListItem forSale={ item } key={ item.productId } />;
          })
        }
        </div>
      </div>
    );
  }
}

export default ProductList;

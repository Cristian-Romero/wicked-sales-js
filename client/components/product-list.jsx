import React from 'react';

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
      .then(data => this.setState({
        products: data
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
        <div className="row row-cols-1 row-cols-md-3 product-container">

        </div>
      </div>
    );
  }
}

export default ProductList;

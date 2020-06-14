import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return !this.state.product
      ? (
        <div className="container">
          <div className="card col-12">
            <div className="row text-muted card-body">
              &lt; Back to catalog
            </div>
            <div className="row">
              <div className="col">
                <img src={ this.state.product.image } alt="" />
              </div>
              <div className="col">
                <h2 className="card-title">{ this.state.product.name }</h2>
                <p className="card-text text-muted">{ this.state.product.price }</p>
                <p className="card-text">{ this.state.product.shortDescription }</p>
              </div>
            </div>
            <div className="row card-text card-body">{this.state.product.longDescription }</div>
          </div>
        </div>
      )
      : null;
  }
}

export default ProductDetails;

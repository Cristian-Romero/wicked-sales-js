import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
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
    return this.state.product
      ? (
        <div className="container my-5 mx-auto">
          <div className="card">
            <div className="row col-3 text-muted card-body back-to-catalog"
              onClick={() => this.props.setView('catalog', {})}
            >
              &lt; Back to catalog
            </div>
            <div className="row">
              <div className="col-5">
                <img src={this.state.product.image} className="col-12" alt="" />
              </div>
              <div className="col-7">
                <h2 className="card-title">{ this.state.product.name }</h2>
                <p className="card-text text-muted">
                  {`$${(this.state.product.price / 100).toFixed(2)}` }
                </p>
                <p className="card-text">{ this.state.product.shortDescription }</p>
                <button type="button"
                  className="btn btn-primary"
                  onClick={ this.props.addToCart(this.state.product) }>
                    Add to Cart
                </button>
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

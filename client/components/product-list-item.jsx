import React from 'react';

class ProductItemList extends React.Component {
  render() {
    const { image, name, price, shortDescription } = this.props.product;
    return (
      <div className="col-4 mb-4">
        <div className="card h-100 product-card"
          onClick={() => this.props.view('details', { productId: this.props.product.productId })}>
          <img src={ image } className="card-img-top fit-picture img-dimen" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{ name }</h5>
            <p className="card-text text-muted">{`$${(price / 100).toFixed(2)}`}</p>
            <p className="card-text">{ shortDescription }</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductItemList;

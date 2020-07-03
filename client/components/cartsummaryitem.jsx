import React from 'react';

class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="container my-5 mx-auto">
        <div className="card">
          <div className="row">
            <div className="col-5">
              <img src={this.props.image} className="col-12" alt="" />
            </div>
            <div className="col-7">
              <h2 className="card-title">{this.props.name}</h2>
              <p className="card-text text-muted">{
                `$${(this.props.price / 100).toFixed(2)}`
              }</p>
              <p className="card-text">{this.props.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;

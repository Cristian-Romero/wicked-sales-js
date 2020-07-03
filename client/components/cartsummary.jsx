import React from 'react';

class CartSummary extends React.Component {

  render() {
    return (
      <div className="container my-5 mx-auto">
        <div className="row col-3 text-muted card-body back-to-catalog"
          onClick={() => this.props.setView('catalog', {})}>
          &lt; Back to catalog</div>
        <div>
          <h1>My Cart</h1>
        </div>

      </div>
    );
  }
}

export default CartSummary;

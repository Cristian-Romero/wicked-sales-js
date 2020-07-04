import React from 'react';
import CartSummaryItem from './cartsummaryitem';

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
        <div>
          {this.props.items.map(item => {
            return (<CartSummaryItem
              key={item.productId}
              image={item.image}
              name={item.name}
              price={item.price}
              shortDescription={item.shortDescription}
            />);
          })}
        </div>
      </div>
    );
  }
}

export default CartSummary;

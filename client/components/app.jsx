import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartsummary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(items => this.setState({
        cart: items
      }));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(result => result.json())
      .then(item => this.setState({
        cart: this.state.cart.concat([item])
      }));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    let currentView;
    switch (this.state.view.name) {
      case 'catalog':
        currentView = <ProductList view={this.setView} />;
        break;
      case 'details':
        currentView = <ProductDetails
          viewParams={this.state.view.params}
          setView={this.setView}
          addToCart={this.addToCart} />;
        break;
      case 'cart':
        currentView = <CartSummary items={this.state.cart}
          setView={this.setView}/>;
        break;
      default: currentView = null;
    }
    return (
      <div>
        <Header itemCount={ this.state.cart.length } setView={this.setView}/>
        { currentView }
      </div>
    );
  }
}

export default App;

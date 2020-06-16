import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(result => result.json())
      .then(item => this.setState({
        cart: this.state.concat(item)
      }));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    const currentView = this.state.view.name === 'catalog'
      ? <ProductList view={ this.setView } />
      : <ProductDetails viewParams={ this.state.view.params } setView={ this.setView } />;
    return (
      <div>
        <Header itemCount={ this.state.cart.length }/>
        { currentView }
      </div>
    );
  }
}

export default App;

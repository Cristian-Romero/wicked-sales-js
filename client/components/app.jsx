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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  render() {
    const currentView = this.state.view.name === 'catalog'
      ? <ProductList view={ this.setView } />
      : <ProductDetails viewParams={ this.state.view.params } setView={ this.setView } />;
    return (
      <div>
        <Header />
        { currentView }
      </div>
    );
  }
}

export default App;

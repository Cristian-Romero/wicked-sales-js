import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-dark bg-dark">
        <div className="container d-flex justify-between-space align-items-baseline">
          <div className="text-white text-decoration-none logo">
            <i className="fas fa-dollar-sign mr-1"></i>
          Wicked Sales
          </div>
          <div className="text-white text-decoration-none cart"
            onClick={() => this.props.setView('cart', {})}>
            { this.props.itemCount }
            <i className="fas fa-shopping-cart ml-1"></i>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

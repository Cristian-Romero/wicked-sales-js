import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-dark bg-dark">
        <div className="container d-flex justify-between-space align-items-baseline">
          <a href="" className="text-white text-decoration-none">
            <i className="fas fa-dollar-sign mr-1"></i>
          Wicked Sales
          </a>
          <a href="" className="text-white text-decoration-none">
            { this.props.itemCount }
            <i className="fas fa-shopping-cart ml-1"
              onClick={this.props.setView({ name: 'cart', params: {} })}>
            </i>
          </a>
        </div>
      </header>
    );
  }
}

export default Header;

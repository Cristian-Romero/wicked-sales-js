import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-dark bg-dark">
        <div className="ml-5 h-100 d-flex align-items-baseline">
          <i className="fas fa-dollar-sign mr-1 text-white"></i>
          <h6 className="mb-0 text-white">Wicked Sales</h6>
        </div>
      </header>
    );
  }
}

export default Header;

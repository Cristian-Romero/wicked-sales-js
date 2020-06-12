import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="ws-header">
        <div className="ml-5 h-100 d-flex align-items-center">
          <i className="fas fa-dollar-sign mr-1"></i>
          <h6 className="mb-0">Wicked Sales</h6>
        </div>
      </header>
    );
  }
}

export default Header;

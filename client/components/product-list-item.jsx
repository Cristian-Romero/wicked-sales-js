import React from 'react';

class ProductItemList extends React.Component {
  render() {
    return (
      <div className="card" style="width: 18rem;">
        <img src="..." className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Card Title</h5>
          <p className="card-text">Some quick text should go here, but I cannot
          think of anything good!</p>
        </div>
      </div>
    );
  }
}

export default ProductItemList;

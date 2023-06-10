import React from "react";
import "./category.css";
import { Link } from "react-router-dom";

const Categories = ({ catName, catId, catImage }) => {
  return (
    <div className="col-sm-6 row-padding category-card" data-testid="test-cat">
      <div className="card">
        <div className="card-body">
          <img className="cat-image" src={catImage} alt={catName} />
          <div className="card-right">
            <p className="card-text">{catName}</p>
            <Link to={`products/${catId}`} className="btn btn-outline-dark">
              EXPLORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;

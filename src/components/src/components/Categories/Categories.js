import React from "react";
import "./category.css";
import { Link } from "react-router-dom";


const Categories = ({ catName }) => {
  
  return (
    <div className="col-sm-6 row-padding">
      <div className="card">
        <div className="card-body">
          <p className="card-text">{catName}</p>
          <Link to={`products/${catName}`} className="btn btn-outline-dark">
            EXPLORE
          </Link>
        </div>
      </div>
    </div>
    
  );
};
export default Categories;
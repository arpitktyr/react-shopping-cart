import React from "react";
import "./Header.css";
import { Link , Form} from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { NavLink, useRouteLoaderData } from 'react-router-dom';

const Header = () => {
  const token = useRouteLoaderData('root');
  const {category,loading, error } = useSelector((state) => state.productSlice);

  const cartItemCount = useSelector((state) => state.handleCart.length);

  return (

    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
      <nav className="navbar navbar-expand-lg navbar-light  py-3 ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            Shopping <i className="fas fa-shopping-basket text-default"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>

              
              {category.map((item)=>(
                <li key={item} className="nav-item">
                <Link  to={`products/${item}`} className="nav-link active">
                  {item}
                </Link>
              </li>
              )
              )}
              {!token && (
               <li className="nav-item active">
                <Link to="/Login?mode=login" className="nav-link " >
                  Login
                </Link>
              </li>) }

              {token && (
              <li className="nav-item dropdown">
                <Link
                  
                  className="nav-link dropdown-toggle active"
                  data-bs-toggle="dropdown"
                >
                 Profile
                </Link>
                <ul className="dropdown-menu">
                <li >
                <Link to="/Profile" className="dropdown-item">
                  Edit Profile
                </Link>
              </li>
              <li >
                <Link to="/Orders" className="dropdown-item">
                  Orders
                </Link>
              </li>
                
             <li>
              <Form action="/logout" method="post">
                <button className="dropdown-item" >Logout</button>
              </Form>
            </li>

               </ul>
              </li>
              )
}
            </ul>

            <div>
              <Link to="/Cart">
                <i className="fas fa-shopping-cart text-dark my-auto">
                  {" "}
                  {cartItemCount}
                </i>
              </Link>
            </div>
          </div>
        </div>
      </nav> )}
    </div>
     
  );
};

export default Header;

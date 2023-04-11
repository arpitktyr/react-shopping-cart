import React, { useEffect } from "react";
import "./Header.css";
import { NavLink, Link, Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useRouteLoaderData } from "react-router-dom";
import { getCategories } from "./../../redux/reducer/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const token = useRouteLoaderData("root");
  const { category, loading } = useSelector((state) => state.productSlice);

  if (category.length === 0 && loading != true) {
    dispatch(getCategories());
  }

  const cartItemCount = useSelector((state) => state.handleCart.length);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light  py-3 ">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand text-dark fw-bold fs-4">
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-dark active"
                        : "nav-link text-dark"
                    }
                  >
                    Home
                  </NavLink>
                </li>

                {category.map((item) => (
                  <li key={item} className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-dark active"
                          : "nav-link text-dark"
                      }
                      to={`products/${item}`}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
                {!token && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-dark active"
                          : "nav-link text-dark"
                      }
                      to="/Login"
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {token && (
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link text-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Profile
                    </span>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-item  text-dark active"
                              : "dropdown-item  text-dark "
                          }
                          to="/Profile"
                        >
                          Edit Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/Orders"
                          className={({ isActive }) =>
                            isActive
                              ? "dropdown-item  text-dark active"
                              : "dropdown-item  text-dark "
                          }
                        >
                          Orders
                        </NavLink>
                      </li>

                      <li>
                        <Form action="/logout" method="post">
                          <button className="dropdown-item  text-dark">
                            Logout
                          </button>
                        </Form>
                      </li>
                    </ul>
                  </li>
                )}
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
        </nav>
      )}
    </div>
  );
};

export default Header;

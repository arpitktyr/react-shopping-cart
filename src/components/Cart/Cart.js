import React, { useState } from "react";

import "./Cart.css";
import { useDispatch } from "react-redux";
import { decreaseQty, delCart, increaseQty } from "../../redux/action";
import { useSelector } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";

const Cart = () => {
  const token = useRouteLoaderData("root");
  // console.log(token);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutMsg, setCheckoutMsg] = useState("");

  let totalAmount = 0;
  const dispatch = useDispatch();
  const removeProduct = (props) => {
    dispatch(delCart(props.id));
  };
  const state = useSelector((state) => state.handleCart);

  const onIncreaseItem = (props) => {
    dispatch(increaseQty(props));
  };
  const onDecreaseItem = (props) => {
    dispatch(decreaseQty(props));
  };
  const checkoutHandler = () => {
    if (token) {
      setCheckoutMsg(
        "This functionality is under development, Hope will implement it."
      );
    } else {
      setCheckoutError("Please first login to proceed with order.");
    }
  };

  return (
    <main className="page">
      <section className="shopping-cart dark">
        <div className="container">
          <div className="block-heading">
            <h2>Cart</h2>
          </div>
          {checkoutError && (
            <div className="row">
              <span className=" alert alert-danger col-sm-12">
                {checkoutError}{" "}
                <strong>
                  {" "}
                  <Link to="/Login" className="text-dark">
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </strong>
              </span>{" "}
              <br />
              <br />
            </div>
          )}
          {checkoutMsg && (
            <div className="row">
              {" "}
              <span className=" alert alert-success col-sm-12">
                {checkoutMsg}
              </span>
              <br />
              <br />
            </div>
          )}
          {state.length > 0 ? (
            <div className="">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {state.map((cart) => {
                      totalAmount +=
                        cart.qty !== "undefined" && cart.qty > 0
                          ? parseInt(cart.price * cart.qty)
                          : parseInt(cart.price);
                      return (
                        <div key={cart.id} className="product">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="mx-auto d-block image img-thumbnail cart-image"
                                src={cart.image}
                                alt={cart.title}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="info">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="product-name">
                                      <h5>{cart.title}</h5>
                                    </div>
                                  </div>

                                  <div className="row price">
                                    <span>₹{cart.price}</span>
                                    <div>
                                      <button
                                        onClick={() => onDecreaseItem(cart)}
                                        className="btn btn-outline-dark bt"
                                      >
                                        -
                                      </button>
                                      <span className="ml-3">{cart.qty}</span>

                                      <button
                                        onClick={() => onIncreaseItem(cart)}
                                        className="btn btn-outline-dark bt"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <span>
                                      <button
                                        className="btn btn-danger ml-3"
                                        onClick={() => removeProduct(cart)}
                                      >
                                        <i className="fas fa-trash "></i>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="summary">
                    <h3>Summary</h3>
                    <div className="summary-item">
                      <span className="text">Subtotal</span>
                      <span className="price">₹{totalAmount}</span>
                    </div>

                    <div className="summary-item">
                      <span className="text">Shipping</span>
                      <span className="price">₹0</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total</span>
                      <span className="price">₹{totalAmount}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg btn-block"
                      onClick={checkoutHandler}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-danger"> Your cart is empty.</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;

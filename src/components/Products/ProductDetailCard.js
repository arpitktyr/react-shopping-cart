import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart } from "../../redux/action";
import { Link } from "react-router-dom";

const ProductDetailCard = (props) => {
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [error, SetError] = useState({});

  const state = useSelector((state) => state.handleCart);

  useEffect(() => {
    state.forEach((element) => {
      if (element.id === props.data.id) {
        setCartBtn("Remove from Cart");
        setQuantity(element.qty);
      }
    });
    //eslint-disable-next-line
  }, []);

  const onChangeHandler = (event) => {
    if (event.target.value <= 0) {
      setQuantity(1);
      SetError("Quantity should not be less than 1");
    } else {
      SetError("");
      setQuantity(event.target.value);
    }
  };

  const handle = (props) => {
    if (cartBtn === "Add to Cart") {
      const productData = {
        ...props.data,
        qty: parseInt(quantity),
      };
      dispatch(addCart(productData));
      setCartBtn("Remove from Cart");
    } else {
      dispatch(delCart(props.data.id));
      setCartBtn("Add to Cart");
    }
  };

  const { title, image, price, description } = props.data;
  // console.log(rating);
  // console.log(props.data);
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card text-black">
          <img src={image} className="card-img-top" alt={title} />
        </div>
      </div>
      <div className="col-sm-6 product-detail">
        <div className=" product-detail card-body">
          {error.length > 0 && (
            <div className="alert alert-danger"> {error}</div>
          )}

          <h5 className="card-title">{title}</h5>
          <p className="text-muted mb-4">{description}</p>

          <div className="price">
            <span className="price-after">₹{price}</span>
            <span className="price-before">
              ₹{Math.round(price + price * 0.1)}
            </span>
            <span className="discount">10% off</span>
          </div>

          <div className="d-flex justify-content-left ">
            <span>Quantity :</span>
            <input
              onChange={onChangeHandler}
              value={quantity}
              className="ml-3 mb-3"
              type="number"
              min="1"
              max={50}
            ></input>
          </div>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => handle(props)}
              type="button"
              className="btn btn-outline-dark"
            >
              <svg
                className="cart-icon"
                width="16"
                height="16"
                viewBox="0 0 16 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                  fill="#000"
                ></path>
              </svg>{" "}
              {cartBtn}
            </button>
            {cartBtn === "Remove from Cart" && (
              <Link to="/Cart" type="button" className="btn btn-outline-dark">
                <svg
                  className="cart-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                    fill="#000"
                  ></path>
                </svg>{" "}
                Go to Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailCard;

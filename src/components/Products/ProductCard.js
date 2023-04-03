import React from "react";
import { Link } from "react-router-dom";
import { productButton } from "../../Constants/Index";

const ProductCard = (prop) => {
  const product = prop.data;

  return (
    <div className="product-card col-sm-4">
      <div className="card">
        <Link data={product._id} to={`/product/${product.id}`}>
          <img
            className="center-cropped"
            src={product.image}
            alt={product.title}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            <Link
              className="product-title"
              data={product.id}
              to={`/product/${product.id}`}
            >
              {" "}
              {product.title.length > 23
                ? product.title.slice(0, 23) + "..."
                : product.title}
            </Link>
          </h5>
          <div className="rating-review">
            <span className="rating">
              <div className="rating-no">
                {product.rating.rate}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                  alt="star"
                  className="review-icon"
                />
              </div>
            </span>
            <span className="review">({product.rating.count})</span>
          </div>
          <div className="price">
            <span className="price-after">₹{product.price}</span>
            <span className="price-before">
              ₹{Math.round(product.price + product.price * 0.1)}
            </span>
            <span className="discount">10% off</span>
          </div>
          <Link className="btn btn-outline-dark" to={`/product/${product.id}`}>
            {productButton}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

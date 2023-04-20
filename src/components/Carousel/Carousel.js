import React from "react";
import Slider from "react-slick";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/reducer/productSlice";

const Carousel = () => {
  const { product, loading, error } = useSelector(
    (state) => state.productSlice
  );
  const dispatch = useDispatch();
  if (product.length === 0 && loading !== true) {
    dispatch(getProducts());
  }
  const filterProduct = product.filter((item) => item.rating.rate > 4);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
        },
      },
    ],
  };
  const topProducts = (
    <div className="container slider-container">
      <Slider {...settings}>
        {filterProduct.map((products) => (
          <div className="slider-item" key={products.id}>
            <Link
              className="product-title carousel-title"
              data={products.id}
              to={`/product/${products.id}`}
            >
              <img
                className="slider-img"
                src={products.image}
                alt={products.title}
              />{" "}
            </Link>
            <div className="slider-content">
              <h5 className="card-title">
                <Link
                  className="product-title carousel-title"
                  data={products.id}
                  to={`/product/${products.id}`}
                >
                  {" "}
                  {products.title.length > 23
                    ? products.title.slice(0, 23) + "..."
                    : products.title}
                </Link>
              </h5>

              <div className="rating-review">
                <span className="rating">
                  <div className="rating-no">
                    {products.rating.rate}
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                      className="review-icon"
                      alt="star"
                    />
                  </div>
                </span>
                <span className="review">({products.rating.count})</span>
              </div>
              <div className="price">
                <span className="price-after">₹{products.price}</span>
                <span className="price-before">
                  ₹{Math.round(products.price + products.price * 0.1)}
                </span>
                <span className="discount">10% off</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

  return (
    <>
      {error ? (
        <span className="alert alert-danger"> Something Went Wrong !!</span>
      ) : (
        topProducts
      )}
    </>
  );
};
export default Carousel;

import React from "react";
import "./Home.css";
import Categorieslist from "../Categories/Categorieslist";
import Carousel from "../Carousel/Carousel";
import { getProducts } from "../../redux/reducer/productSlice";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productSlice
  );

  if (product.length === 0 && loading != true) {
    dispatch(getProducts());
  }

  return (
    <div className="home-container">
      <div className="card bg-dark text-white border-0">
        <img
          src={"images/home5.webp"}
          className="img-fluid"
          alt="grocery bag "
        />
      </div>
      <Categorieslist />
      {error ? (
        <span className="alert alert-danger"> Something Went Wrong !!</span>
      ) : (
        <Carousel />
      )}
    </div>
  );
};

export default Home;

import React from "react";

import "./Home.css";
import Categorieslist from "../Categories/Categorieslist";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  return (
    <div className="home-container">
      <div className="card bg-dark text-white border-0">
        <img
          src={process.env.PUBLIC_URL + "/images/home5.webp"}
          className="img-fluid"
          alt="grocery bag "
        />
        <div className="card-img-overlay component-space"></div>
      </div>
      <Categorieslist />
      <Carousel />
    </div>
  );
};

export default Home;

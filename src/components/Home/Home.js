import React from "react";
import "./Home.css";
import Categorieslist from "../Categories/Categorieslist";
import Carousel from "../Carousel/Carousel";
import useDeviceType from "../../hook/useDeviceType";

const Home = () => {
  const deviceType = useDeviceType();
  console.log(deviceType);
  return (
    <div className="home-container">
      <div className="card bg-dark text-white border-0">
        <img
          src={"images/home5.webp"}
          className="img-fluid"
          alt="grocery bag"
        />
      </div>
      <Categorieslist />
      <Carousel />
    </div>
  );
};

export default Home;

import "./About.css";
import Constant from "./Constant";

import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="app text-center">
      <img
        src={process.env.PUBLIC_URL + "/images/about.jpg"}
        alt="grocery store"
        width="400"
      />
      <div>
        <h1>{Constant.aboutHeading}</h1>
        <p>
          {Constant.aboutPara}
          <br />
          {Constant.aboutMission}
          <br />
          {Constant.aboutVision}
        </p>
      </div>

      <Link to="/">
        <button className="btn btn-outline-dark ">START SHOPPING</button>
      </Link>
    </div>
  );
};
export default About;

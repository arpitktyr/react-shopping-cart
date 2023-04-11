import "./About.css";
import { aboutMission, aboutPara, aboutVision, aboutHeading } from "./Constant";

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
        <h1>{aboutHeading}</h1>
        <p>
          {aboutPara}
          <br />
          {aboutMission}
          <br />
          {aboutVision}
        </p>
      </div>

      <Link to="/">
        <button className="btn btn-outline-dark ">START SHOPPING</button>
      </Link>
    </div>
  );
};
export default About;

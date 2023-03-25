import React from "react";

const Errorpage = (props) => {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + "/images/error.jpg"}
        className="card-img"
        alt="404 error"
      />
    </div>
  );
};

export default Errorpage;

import React from "react";
import { useRouteError } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-5">
            <img src="/images/sad-cmp.png" className="card-img" alt="Error" />
          </div>
          <div className="col-sm-7 mt-5">
            <h1>{title}</h1>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Errorpage;

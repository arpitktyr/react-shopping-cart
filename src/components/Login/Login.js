import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { UserContext } from "../../context/user-context";

function Login() {
  const form = useForm({ mode: "onBlur" });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();
  //for redirecting already logged in
  const token = useRouteLoaderData("root");

  useEffect(() => {
    if (token && token !== "EXPIRED") {
      navigate("/Profile", { replace: true });
    }
  }, [token, navigate]);

  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login, setLogin] = useState(false);

  if (login === true) {
    setTimeout(() => {
      navigate("/Profile", { replace: true });
    }, 1000);
  }
  const formSubmitHandler = async (userData) => {
    setData({ message: "", errors: {} });
    setIsSubmitting(true);
    const response = await fetch(
      "https://node-cart-backend.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    setIsSubmitting(false);
    const resData = await response.json();
    if (!response.ok) {
      if (resData.message) {
        setData((prevData) => {
          return { ...prevData, message: resData.message };
        });
      }
      if (resData.errors) {
        setData((prevData) => {
          return { ...prevData, errors: resData.errors };
        });
      }
    } else {
      const token = resData.token;
      userContextData.setUserName(resData.name);
      userContextData.setUserEmail(resData.email);
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      setLogin(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="login-form">
          <form
            className="form-container"
            method="post"
            onSubmit={handleSubmit(formSubmitHandler)}
            noValidate
          >
            <h1 className="form-title">Log in</h1>
            {login && (
              <div className="alert alert-success" aria-live="polite">
                Login Successfull, You will redirected to Homepage.
              </div>
            )}
            {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((err) => (
                  <li key={err} className="text-danger">
                    {" "}
                    {err}
                  </li>
                ))}
              </ul>
            )}
            {data && data.message && (
              <p className="text-danger"> {data.message}</p>
            )}

            <div className="form-group">
              <label htmlFor="email"> Email </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format.",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                id="password"
                {...register("password", {
                  required: { value: true, message: "Password is required." },
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password?.message}</span>
              )}
            </div>

            <button
              type="submit"
              name="submit"
              disabled={isSubmitting}
              style={{ margin: "20px 0" }}
              className="btn btn-dark btn-block"
            >
              {isSubmitting ? "Submitting.." : "Submit"}
            </button>
            <div>
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <Link className="text-dark" to="/Register">
                  Create an Account
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

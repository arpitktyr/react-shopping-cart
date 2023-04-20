import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { UserContext } from "../../context/user-context";
import { useForm } from "react-hook-form";

function Register() {
  const form = useForm();
  const { register, handleSubmit, getValues } = form;
  const { errors } = form.formState;
  const { setUserEmail, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");

  useEffect(() => {
    if (token && token !== "EXPIRED") {
      navigate("/Profile", { replace: true });
    }
  }, [token, navigate]);

  const [data, setData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signup, setSignup] = useState(false);

  if (signup === true) {
    setTimeout(() => {
      navigate("/Profile", { replace: true });
    }, 1000);
  }

  const formSubmitHandler = async (userData) => {
    setData({ message: "", errors: {} });

    setIsSubmitting(true);
    const response = await fetch(
      "https://node-cart-backend.onrender.com/signup",
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
      setUserEmail(resData.user.email);
      setUserName(resData.user.name);
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      setSignup(true);
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
            <h1 className="form-title">Create a new user</h1>
            {signup && (
              <div className="alert alert-success" aria-live="polite">
                Registered Successfully, Will redirected to Homepage.
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
              <label htmlFor="name"> Name </label>
              <input
                type="name"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required.",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]+$/,
                    message: "Invalid name.",
                  },
                })}
              />
              <span className="text-danger">{errors.name?.message}</span>
            </div>
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
              <span className="text-danger">{errors.email?.message}</span>
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
                  required: {
                    value: true,
                    message: "Password is required.",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters long.",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "Password should not be at more than 20 characters long.",
                  },
                })}
              />
              <span className="text-danger">{errors.password?.message}</span>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"> Confirm Password </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Enter password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Password does not match.";
                  },
                })}
              />
              <span className="text-danger">
                {errors.confirmPassword?.message}
              </span>
            </div>

            <button
              type="submit"
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
                <Link className="text-dark" to="/Login">
                  Login Here
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { UserContext } from "../../context/user-context";

function Register() {
  const { setUserEmail, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [inputError, setInputError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
    confirmPasswordError: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signup, setSignup] = useState(false);

  if (signup === true) {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);
  }

  const emailHandler = (e) => {
    setUserData((prevData) => {
      return { ...prevData, email: e.target.value };
    });
    setUserEmail(e.target.value);
  };

  const nameHandler = (e) => {
    setUserData((prevData) => {
      return { ...prevData, name: e.target.value };
    });
    setUserName(e.target.value);
  };

  const passwordHandler = (e) => {
    setUserData((prevData) => {
      return { ...prevData, password: e.target.value };
    });
  };

  const confirmPasswordHandler = (e) => {
    setUserData((prevData) => {
      return { ...prevData, confirmPassword: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setInputError({ email: "", password: "" });
    setData({ message: "", errors: {} });
    // console.log(userData);
    const { email, password, name, confirmPassword } = userData;
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      setInputError((prevData) => {
        return { ...prevData, nameError: "Please enter a Name." };
      });
      return;
    } else if (!nameRegex.test(name)) {
      setInputError((prevData) => {
        return {
          ...prevData,
          nameError: "Only aphabet letters are allowed.",
        };
      });
      return;
    }
    if (name.length > 20 || name.length < 4) {
      setInputError((prevData) => {
        return {
          ...prevData,
          nameError:
            "Name length should be greater then 4 character and not more than 20 character.",
        };
      });
      return;
    } else {
      setInputError((prevData) => {
        return {
          ...prevData,
          nameError: "",
        };
      });
    }

    if (!email) {
      setInputError((prevData) => {
        return { ...prevData, emailError: "Please enter a email address." };
      });
      return;
    } else if (!emailRegex.test(email)) {
      setInputError((prevData) => {
        return {
          ...prevData,
          emailError: "That doesn't look like an email address",
        };
      });
      return;
    } else {
      setInputError((prevData) => {
        return {
          ...prevData,
          emailError: "",
        };
      });
    }

    if (!password) {
      setInputError((prevData) => {
        return {
          ...prevData,
          passwordError: "Please enter a password.",
        };
      });
      return;
    } else if (password.length < 6) {
      setInputError((prevData) => {
        return {
          ...prevData,
          passwordError: "Password must be at least 8 characters long",
        };
      });
      return;
    } else {
      setInputError((prevData) => {
        return {
          ...prevData,
          passwordError: "",
        };
      });
    }
    if (password !== confirmPassword) {
      setInputError((prevData) => {
        return {
          ...prevData,
          confirmPasswordError: "Please does not match.",
        };
      });
      return;
    }

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
            onSubmit={submitHandler}
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
                onChange={nameHandler}
                value={userData.name}
              />
              {inputError.nameError && (
                <span className="text-danger">{inputError.nameError}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email"> Email </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                onChange={emailHandler}
                value={userData.email}
              />
              {inputError.emailError && (
                <span className="text-danger">{inputError.emailError}</span>
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
                onChange={passwordHandler}
                value={userData.password}
              />
              {inputError.passwordError && (
                <span className="text-danger">{inputError.passwordError}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"> Confirm Password </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Enter password"
                id="confirmPassword"
                onChange={confirmPasswordHandler}
                value={userData.confirmPassword}
              />
              {inputError.confirmPasswordError && (
                <span className="text-danger">
                  {inputError.confirmPasswordError}
                </span>
              )}
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

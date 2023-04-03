import { useState } from "react";
import { Link, useSearchParams, redirect, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [inputError, setInputError] = useState({
    emailError: "",
    passwordError: "",
  });

  let mode = searchParams.get("mode");
  let isLogin;
  if (mode) {
    isLogin = mode === "login";
  } else {
    isLogin = true;
    mode = "login";
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailHandler = (e) => {
    setUserData((prevData) => {
      return { ...prevData, email: e.target.value };
    });
  };

  const passwordHandler = (e) => {
    setUserData((prevData) => {
      return { ...prevData, password: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setInputError({ email: "", password: "" });
    setData({ message: "", errors: {} });
    // console.log(userData);
    const { email, password } = userData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    setIsSubmitting(true);
    const response = await fetch(
      "https://node-cart-backend.onrender.com/" + mode,
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
    //console.log(resData);

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
      navigate("/", { replace: true });
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
            <h1 className="form-title">
              {isLogin ? "Log in" : "Create a new user"}
            </h1>
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
                aria-label="Email"
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
                aria-label="Password"
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
                <Link
                  className="text-dark"
                  to={`/login/?mode=${isLogin ? "signup" : "login"} `}
                >
                  {isLogin ? "Create an Account" : "Login Here"}
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

// export async function action({ request }) {
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get("mode") || "login";

//   if (mode !== "login" && mode !== "signup") {
//     throw json({ message: "Unsupported mode." }, { status: 422 });
//   }

//   const data = await request.formData();
//   let errors = {};

//   // Email and password validation
//   const email = data.get("email");
//   const password = data.get("password");

//   if (!email && !password) {
//     errors.emailError = errors.passwordError =
//       "Email and password are required";
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     errors.emailError = "That doesn't look like an email address";
//   }

//   if (password.length < 6) {
//     errors.passwordError = "Password must be at least 8 characters long";
//   }
//   // return data if we have errors
//   if (Object.keys(errors).length) {
//     return errors;
//   }

//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   const response = await fetch(
//     "https://node-cart-backend.onrender.com/" + mode,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(authData),
//     }
//   );

//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not authenticate user." }, { status: 500 });
//   }

//   const resData = await response.json();
//   const token = resData.token;

//   localStorage.setItem("token", token);
//   const expiration = new Date();
//   expiration.setHours(expiration.getHours() + 1);
//   localStorage.setItem("expiration", expiration.toISOString());

//   return redirect("/");
// }

export function logoutAction() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/Login?mode=login");
}

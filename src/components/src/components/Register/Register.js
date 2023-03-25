import { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { registerHeading } from "../../Constants/Index";

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    mobile: "",
    confirmpassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const registerUser = async (data) => {
    // return fetch("https://reqres.in/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }).then((data) => data.json());
    //Register the user
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      let res = await registerUser({
        email: formValues.email,
        password: formValues.password,
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phnregex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "You have entered an invalid email format";
    }
    if (!values.mobile) {
      errors.mobile = "Mobile is required";
    } else if (!phnregex.test(values.mobile)) {
      errors.mobile = "Enter a valid mobile number";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm password is required";
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword = "password not matched";
    }

    return errors;
  };

  return (
    <div className="main-container">
      <div className="register-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h1 className="form-title">{registerHeading}</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <input
                className="input-field"
                autoComplete="off"
                aria-label="Username"
                type="text"
                name="username"
                aria-relevant="true"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p aria-live="assertive" className="error-div">
              {formErrors.username}
            </p>
            <br />
            <div className="field">
              <input
                className="input-field"
                autoComplete="off"
                aria-label="Email"
                type="text"
                name="email"
                aria-required="true"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p aria-live="assertive" className="error-div">
              {formErrors.email}
            </p>
            <br />
            <div className="field">
              <input
                className="input-field"
                autoComplete="off"
                aria-label="Mobile"
                type="text"
                name="mobile"
                aria-required="true"
                placeholder="Mobile"
                value={formValues.mobile}
                onChange={handleChange}
              />
            </div>
            <p aria-live="assertive" className="error-div">
              {formErrors.mobile}
            </p>
            <br />

            <div className="field">
              <input
                className="input-field"
                aria-label="Password"
                type="password"
                name="password"
                aria-required="true"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p aria-live="assertive" className="error-div">
              {formErrors.password}
            </p>
            <br />
            <div className="field">
              <input
                className="input-field"
                aria-label="Confirm Password"
                type="password"
                name="confirmpassword"
                aria-required="true"
                placeholder="Confirm Password"
                value={formValues.confirmpassword}
                onChange={handleChange}
              />
            </div>
            <p aria-live="assertive" className="error-div">
              {formErrors.confirmpassword}
            </p>
            <br />
            <button className="register-btn fluid ui button blue btn-outline-dark">
              Submit
            </button>
            <div>
              <Link className="login-link" to="/Login">
                Already regestered? Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

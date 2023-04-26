import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const form = useForm({ mode: "onBlur" });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [msg, setMsg] = useState("");

  let mapStyle = {
    width: "100%",
    height: "100%",
    padding: "20px",
    border: "0",
  };
  const formSubmitHandler = () => {
    setMsg("Your response recorded, We will get back to you soon");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57128.70069653092!2d80.18687383125001!3d26.502629900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c371965217be9%3A0xe6055bd416e97d49!2sGrocery!5e0!3m2!1sen!2sin!4v1668862924250!5m2!1sen!2sin"
            style={mapStyle}
            loading="lazy"
            title="Google map location"
          ></iframe>
        </div>
        <div className="col-sm-6">
          <h1>Get In Touch</h1>
          {msg && <div className=" alert alert-success">{msg}</div>}
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required.",
                  },
                })}
              />
              <span className="text-danger">{errors.name?.message}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
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
              <label htmlFor="mobnumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="mobnumber"
                placeholder="Your Mobile Number"
                {...register("mobnumber", {
                  required: {
                    value: true,
                    message: "Phone No. is required.",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid Mobile No.",
                  },
                })}
              />
              <span className="text-danger">{errors.mobnumber?.message}</span>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                placeholder="Message"
                {...register("message", {
                  required: {
                    value: true,
                    message: "Message is required.",
                  },
                })}
              ></textarea>
              <span className="text-danger">{errors.message?.message}</span>
            </div>
            <br />

            <button type="submit" className="btn btn-outline-dark ms-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

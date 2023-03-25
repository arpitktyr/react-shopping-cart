import React from "react";
import { Link } from "react-router-dom";
import { contactHeading } from "../../Constants/Index";
const Contact = () => {
  let mapStyle = {
    width: "100%",
    height: "100%",
    padding: "20px",
    border: "0",
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57128.70069653092!2d80.18687383125001!3d26.502629900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c371965217be9%3A0xe6055bd416e97d49!2sGrocery!5e0!3m2!1sen!2sin!4v1668862924250!5m2!1sen!2sin"
            allowfullscreen=""
            style={mapStyle}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="col-sm-6">
          <h1>{contactHeading}</h1>
          <form>
            <div className="form-group">
              <label for="exampleFormControlInput1">Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Your Phone Number"
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Message</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Message"
              ></textarea>
            </div>
            <br />
            <Link to="/">
              <button type="button" className="btn btn-outline-dark ms-2">
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

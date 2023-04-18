import React, { useState } from "react";

const EditProfile = ({ userData, onSave }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [pincode, setPincode] = useState(userData.pincode);
  const [address, setAddress] = useState(userData.address);
  const [mobile, setMobile] = useState(userData.mobile);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      name,
      email,
      pincode,
      address,
      mobile,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="form-group">
        <label>Name: </label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-group">
        <label>Pincode: </label>
        <input
          className="form-control"
          type="text"
          value={pincode}
          onChange={handlePincodeChange}
        />
      </div>
      <div className="form-group">
        <label>Address: </label>
        <textarea
          className="form-control"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label>Mobile: </label>
        <input
          className="form-control"
          type="text"
          value={mobile}
          onChange={handleMobileChange}
        />
      </div>
      <button className="btn btn-success" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditProfile;

import React from "react";
import { useForm } from "react-hook-form";

const EditProfile = ({ userData, onSave }) => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      pincode: userData?.pincode,
      address: userData?.address,
      mobile: userData?.mobile,
    },
  });
  const { errors } = formState;

  const handleProfileForm = (data) => {
    const { name, email, address, pincode, mobile } = data;
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
      name="profileForm"
      onSubmit={handleSubmit(handleProfileForm)}
      style={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          type="text"
          id="name"
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
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <span className="text-danger">{errors.name?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
          id="email"
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
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <span className="text-danger">{errors.email?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="pincode">Pincode</label>
        <input
          className="form-control"
          type="text"
          id="pincode"
          {...register("pincode", {
            required: {
              value: true,
              message: "Pincode is required.",
            },
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Enter valid Pincode.",
            },
          })}
          aria-invalid={errors.pincode ? "true" : "false"}
        />{" "}
        {errors.pincode && (
          <span className="text-danger">{errors.pincode?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          className="form-control"
          id="address"
          {...register("address", {
            required: {
              value: true,
              message: "Address is required.",
            },
          })}
          aria-invalid={errors.address ? "true" : "false"}
        />
        {errors.address && (
          <span className="text-danger">{errors.address?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile</label>
        <input
          className="form-control"
          type="text"
          id="mobile"
          {...register("mobile", {
            required: {
              value: true,
              message: "Mobile is required.",
            },
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid Mobile No.",
            },
          })}
          aria-invalid={errors.mobile ? "true" : "false"}
        />
        {errors.mobile && (
          <span className="text-danger">{errors.mobile?.message}</span>
        )}
      </div>
      <button name="save" className="btn btn-success" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditProfile;

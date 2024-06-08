import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove error message for the field if it exists
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Validate form data before signup
  const validateForm = () => {
    const errors = {};

    if (formData.email.trim() === "") {
      errors.email = "Email field cannot be empty!";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle forgotpasswrod
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(forgotpassword(formData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // Success alert
          MySwal.fire({
            title: "Success",
            text: action.payload.response,
            icon: "success",
          });
        } else {
          // Error alert
          MySwal.fire({
            title: "Error",
            text: action.payload.response,
            icon: "error",
          });
        }
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div className="offset-md-4 col-md-4 align-self-center">
          <form className="border p-3 rounded-0">
            <p className="text-center fs-4 fw-light">Enter Your Email Address</p>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control form-control-sm rounded-0"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="fs-8 text-danger">{formErrors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <button
                className="form-control btn btn-primary rounded-0"
                onClick={handleForgotPassword}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

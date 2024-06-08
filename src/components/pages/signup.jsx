import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signup } from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Signup = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const phoneRegex = /^\d{11}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // State to hold form data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    confirm: "",
  });

  // State to hold form errors
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

    if (formData.firstname.trim() === "") {
      errors.firstname = "Incorrect First name supplied";
    }

    if (formData.lastname.trim() === "") {
      errors.lastname = "Incorrect Last name supplied";
    }

    // Mobile phone number validation
    if (!phoneRegex.test(formData.mobile)) {
      errors.mobile = "Invalid mobile phone number";
    }

    // Email validation
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (formData.password !== formData.confirm) {
      errors.confirm = "Password mismatch";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateRandomString = (length = 25) => {
    const currentTimestamp = String(Math.floor(Date.now() / 1000));

    const hexLength = length - currentTimestamp.length;

    let randomString = "";
    const characters = "0123456789ABCDEF";
    for (let i = 0; i < hexLength; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomString;
  };

  // Handle signup
  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      formData.customer_id = generateRandomString(25);
      dispatch(signup(formData)).then((action) => {
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
            <p className="text-center fs-4 fw-light">User Account Creation</p>
            <div className="mb-3">
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="form-control form-control-sm rounded-0"
                placeholder="First name"
                value={formData.firstname}
                onChange={handleChange}
              />
              {formErrors.firstname && (
                <div className="fs-8 text-danger">{formErrors.firstname}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="form-control form-control-sm rounded-0"
                placeholder="Last name"
                value={formData.lastname}
                onChange={handleChange}
              />
              {formErrors.lastname && (
                <div className="fs-8 text-danger">{formErrors.lastname}</div>
              )}
            </div>

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
              <input
                type="text"
                name="mobile"
                id="mobile"
                className="form-control form-control-sm rounded-0"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {formErrors.mobile && (
                <div className="fs-8 text-danger">{formErrors.mobile}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control form-control-sm rounded-0"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="fs-8 text-danger">{formErrors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="confirm"
                id="confirm"
                className="form-control form-control-sm rounded-0"
                placeholder="Confirm password"
                value={formData.confirm}
                onChange={handleChange}
              />
              {formErrors.confirm && (
                <div className="fs-8 text-danger">{formErrors.confirm}</div>
              )}
            </div>

            <div className="mb-3">
              <button
                className="form-control btn btn-primary rounded-0"
                onClick={handleRegister}
              >
                Signup
              </button>
            </div>
            <p className="text-center">
              <small>
                Already registered?{" "}
                <NavLink className="text-decoration-none" to="/signin">
                  Login
                </NavLink>
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

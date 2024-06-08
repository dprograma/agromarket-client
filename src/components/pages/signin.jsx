import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { signin, getUser, setAccessToken } from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (formData.email.trim() === "") {
      errors.email = "Email field cannot be empty!";
    }

    if (formData.password.trim() === "") {
      errors.password = "Password field cannot be empty!";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle signin
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signin(formData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // Persist the user data
          const { access_token } = action.payload.response
          dispatch(getUser(access_token)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              // Success alert
              dispatch(setAccessToken(access_token))
              console.log("GET USER DATA: ", res.payload.response)
            }})
          // Redirect to dashboard
          navigate("/dashboard");
        } else {
          // Error alert
          MySwal.fire({
            title: "Error",
            text: "Incorrect email or password.",
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
            <p className="text-center fs-4 fw-light">User Login</p>
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
              <button
                className="form-control btn btn-primary rounded-0"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <p className="text-center">
              <small>
                Don't have an account?{" "}
                <NavLink className="text-decoration-none" to="/signup">
                  Signup
                </NavLink>
              </small>
            </p>
            <p className="text-center">
              <small>
                <NavLink className="text-decoration-none" to="/forgot-password">
                  Forgot password?
                </NavLink>
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

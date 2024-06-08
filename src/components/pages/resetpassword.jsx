import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetpassword } from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // State to hold form data
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
    uid,
    token,
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

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (validateForm) {
      dispatch(resetpassword(formData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // Success alert
          MySwal.fire({
            title: "Success",
            text: action.payload.response,
            icon: "success",
          });

          // Redirect to sign-in page
          navigate("/signin");
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
            <p className="text-center fs-4 fw-light">Reset Your Password</p>
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
                onClick={handlePasswordReset}
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

export default ResetPassword;

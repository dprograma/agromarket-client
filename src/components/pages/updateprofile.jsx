import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateBio, updateImage, updatePassword} from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // Retrieve values from central store
  const { isAuthenticated, user, access_token } = useSelector(state => state.auth)

  const { avatar, firstname, lastname } = isAuthenticated && user.response

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // State to hold bio data
  const [bioData, setBioData] = useState({
    username: "",
    bio: "",
  });

  // State to hold password data
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  // State to hold image data
  const [imageData, setImageData] = useState();

  // State to hold password errors
  const [passwordErrors, setPasswordErrors] = useState({});

  // State to hold bio data errors
  const [bioErrors, setBioErrors] = useState({});

  useEffect(() => {
    dispatch(getUser(access_token)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        // Success alert
        console.log("USER DATA: ", action.payload.response)
      }
    });
  }, [dispatch]);

  // Update image data on input change
  const handleImageChange = (e) => {
    setImageData(e.target.files[0]);
  };

  // Update password data on input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove error message for the field if it exists
    setPasswordErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Update password data on input change
  const handleBioChange = (e) => {
    const { name, value } = e.target;
    setBioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove error message for the field if it exists
    setBioErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Validate form data before signup
  const validatePassword = () => {
    const errors = {};

    // Password validation
    if (!passwordRegex.test(passwordData.password)) {
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (passwordData.password !== passwordData.confirm_password) {
      errors.confirm_password = "Password mismatch";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate form data before signup
  const validateBio = () => {
    const errors = {};

    if (bioData.username === "") {
      errors.username = "This field cannot be empty!";
    }

    if (bioData.bio === "") {
      errors.bio = "This field cannot be empty!";
    }

    setBioErrors(errors);
    return Object.keys(errors).length === 0;
  };


  // Handle update profile picture
const handleUpdateProfilePicture = (e) => {
  e.preventDefault();

  const formData = new FormData()
  formData.append('avatar', imageData)

  // Dispatch updateImage with formData
  dispatch(updateImage({ formData, access_token })).then((action) => {
    if (action.meta.requestStatus === "fulfilled") {
      // Update imageData with new profile picture URL
      dispatch(getUser(access_token));
      console.log("Image uploaded successfully");
    } else {
      console.error("Error uploading profile image");
    }
  });
};


  // Handle update password
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      dispatch(updatePassword(passwordData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(getUser(access_token));
          console.log("Password updated successfully");
        } else {
          console.error("Error updating password");
        }
      });
    }
  };

  // Handle update bio data
  const handleUpdateBio = (e) => {
    e.preventDefault();
    if (validateBio()) {
      dispatch(updateBio(passwordData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(getUser(access_token));
          console.log("Password updated successfully");
        } else {
          console.error("Error updating password");
        }
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div className="offset-md-4 col-md-4 align-self-center">
          <form className="border p-3 rounded-0 mb-4" encType="multipart/form-data">
            <div class="text-center mb-3 w-100">
              <img src={ avatar }
               className="img-fluid img-thumbnail" alt="Profile Pic" />
            </div>
            <div className="mb-3">
              <input
                type="file"
                name="file"
                id="file"
                className="form-control form-control-sm rounded-0"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <button
                className="form-control btn btn-primary rounded-0"
                onClick={handleUpdateProfilePicture}
              >
                Update Image
              </button>
            </div>
          </form>

          <form className="border p-3 rounded-0 mb-4">
            <div className="mb-3">
              <input
                type="password"
                name="old_password"
                id="old_password"
                className="form-control form-control-sm rounded-0"
                placeholder="Old Password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control form-control-sm rounded-0"
                placeholder="New Password"
                value={passwordData.password}
                onChange={handlePasswordChange}
              />
              {passwordErrors.password && (
                <div className="fs-8 text-danger">
                  {passwordErrors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="form-control form-control-sm rounded-0"
                placeholder="Confirm password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
              />
              {passwordErrors.confirm_password && (
                <div className="fs-8 text-danger">
                  {passwordErrors.confirm_password}
                </div>
              )}
            </div>
            <div className="mb-3">
              <button
                className="form-control btn btn-primary rounded-0"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </div>
          </form>

          <form className="border p-3 rounded-0 mb-4">
            <div className="mb-3">
              <input
                type="text"
                name="username"
                id="username"
                className="form-control form-control-sm rounded-0"
                placeholder="Username"
                value={bioData.username}
                onChange={handleBioChange}
              />
              {bioErrors.username && (
                <div className="fs-8 text-danger">{bioErrors.username}</div>
              )}
            </div>

            <div className="mb-3">
              <textarea name="bio" id="bio" cols={30} rows={15}>
                Give a short description of yourself
              </textarea>
              {bioErrors.bio && (
                <div className="fs-8 text-danger">{bioErrors.bio}</div>
              )}
            </div>
            <div className="mb-3">
              <button
                className="form-control btn btn-primary rounded-0"
                onClick={handleUpdateBio}
              >
                Update Bio Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

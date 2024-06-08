import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout, resetAuthState } from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  // Retrieve authentication state from local storage
  const { isAuthenticated, user, access_token } = useSelector(state => state.auth)
  const { avatar, firstname, lastname } = isAuthenticated && user? user.response: {avatar: "", firstname: "", lastname: ""};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logout(access_token)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {       
        // Success alert
        MySwal.fire({
          title: "Success",
          text: action.payload.response,
          icon: "success",
        });
        dispatch(resetAuthState())
        // Redirect to sign-in page
        navigate("/");
      } else {
        // Error alert
        MySwal.fire({
          title: "Error",
          text: action.payload.response,
          icon: "error",
        });
      }
    });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <span style={{ fontSize: 16, color: "red" }}>Sig</span>
          <span style={{ fontSize: 16 }}>Ma</span>
          <span style={{ fontSize: 16 }}>Co.</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="btn btn-success pe-5 ps-5" to="/sell">
                  Sell
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={avatar} className="img-thumbnail" style={{ width: "35px", height: "35px", borderRadius:"50%"}}/> <small>Hi, {firstname}</small>
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/update-profile">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" onClick={handleLogOut}>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/signin"
                >
                  Signin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

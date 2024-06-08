import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/home";
import Dashboard from "./components/pages/dashboard";
import Signin from "./components/pages/signin";
import Signup from "./components/pages/signup";
import Navbar from "./components/pages/header";
import ResetPassword from "./components/pages/resetpassword";
import AccountActivation from "./components/pages/confirm";
import useLocalStorage from "react-use-localstorage";
import ForgotPassword from "./components/pages/forgotpassword";
import UpdateProfile from "./components/pages/updateprofile";
import PostAd from "./components/pages/sell";
import { useSelector } from "react-redux";

const App = () => {
  // Retrieve authentication state from local storage
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("authenticated: ", isAuthenticated)
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/signin" exact Component={Signin} />
        <Route path="/signup" exact Component={Signup} />
        <Route
          path="/confirm/:uid/:token"
          exact
          Component={AccountActivation}
        />
        <Route
          path="/reset-password/:uid/:token"
          exact
          Component={ResetPassword}
        />
        <Route path="/forgot-password" exact Component={ForgotPassword} />
        <Route
          path="/update-profile"
          exact
          element={
            isAuthenticated ? (
              <UpdateProfile />
            ) : (
              <Navigate to="/signin" replace={true} />
            )
          }
        />
        <Route
          path="/dashboard"
          exact
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/signin" replace={true} />
            )
          }
        />
         <Route
          path="/sell"
          exact
          element={
            isAuthenticated ? (
              <PostAd />
            ) : (
              <Navigate to="/signin" replace={true} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "../slices/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AccountActivation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    dispatch(confirm({ uid, token })).then((action) => {
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
  }, [dispatch, uid, token, navigate]);

  return <div></div>;
};

export default AccountActivation;

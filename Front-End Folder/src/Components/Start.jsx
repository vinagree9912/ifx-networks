import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-4 rounded w-25 border loginForm shadow-sm bg-white">
        <h2 className="text-center mb-4">Login As</h2>
        <div className="d-flex justify-content-between mb-3">
          <button
            type="button"
            className="btn btn-primary w-100 me-2"
            onClick={() => navigate("/dashboard")}
          >
            anonymous
          </button>
          <button
            type="button"
            className="btn btn-success w-100 ms-2"
            onClick={() => navigate("/adminlogin")}
          >
            Admin
          </button>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            className="btn btn-outline-info w-100"
            onClick={() => navigate("/register")}
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;

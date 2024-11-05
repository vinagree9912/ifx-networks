import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call the logout endpoint
        await axios.get("https://ifx-networks.onrender.com/logout", { withCredentials: true });

        // Optionally clear any client-side stored authentication state (e.g., in localStorage or context)
        // localStorage.removeItem("authToken");

        // Redirect to login page or home page
        navigate("/login");
      } catch (error) {
        console.log("Error logging out:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "", // New photo field
    role: "",  // Role field
    password: "",
    passwordConfirm: "",
    verified: false, // Default false for new users
    created_at: new Date().toISOString(), // Default to current date
    updated_at: new Date().toISOString()  // Default to current date
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    setError(""); // Clear any previous errors

    try {
      // Send a POST request to the /api/auth/login endpoint
      const response = await axios.post("https://ifx-networks-1.onrender.com/api/auth/register", formData);

      // Check if the registration was successful
      if (response.data.status === "success") {
        setMessage(response.data.message); // Show success message if needed
            navigate("/adminlogin");
      }
    } catch (error) {
      if (error.response) {
        // Handle errors returned by the server
        setError(error.response.data.detail || "An error occurred.");
      } else {
        // Handle other types of errors (e.g., network issues)
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-50 border">
        <h2 className="text-center">Register</h2>

        {/* Display success or error messages */}
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Photo URL</label>
            <input
              type="text"
              id="photo"
              name="photo"
              className="form-control"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="form-control"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>

          {/* New Role Selection Field */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

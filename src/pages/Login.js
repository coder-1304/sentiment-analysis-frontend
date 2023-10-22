import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../components/OTPVerification/OTPVerification";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import Cookies from "js-cookie";
import postData from "../API/postData";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error message when the user makes changes
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const response = await postData("/login", formData);
      if (response.success) {
        Cookies.set("jwt_token", response.jwt);
        navigate("/home");
      } else {
        console.log(response);
        alert("Incorrect Credentials");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log(Cookies.get("jwt_token"));
    if (Cookies.get("jwt_token")) {
      console.log(Cookies.get("jwt_token"));
      navigate("/home");
    }
  }, []);

  return (
    <div className="registration-container">
      {loading ? <LoadingOverlay /> : null}
      <div className="registration-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p className="new-user">
          New user?{" "}
          <span
            className="login-text"
            onClick={() => {
              navigate("/");
            }}
          >
            Register
          </span>
        </p>
      </div>
      {showOtpVerification ? <OTPVerification email={formData.email} /> : null}
    </div>
  );
};

export default LoginPage;

import React, { useEffect, useRef, useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../components/OTPVerification/OTPVerification";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import postData from "../API/postData";
import Cookies from "js-cookie";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const response = await postData("/register", formData);
      if (response.success) {
        setLoading(false);
        setShowOtpVerification(true);
      } else {
        console.log(response);
        alert("Something went wrong");
      }
      // setTimeout(()=>{
      // },1500)
      //   navigate("/home")
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
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="button" onClick={handleSubmit}>
            Register
          </button>
        </form>
        <p className="new-user">
          Not a New user?{" "}
          <span
            className="login-text"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </div>
      {showOtpVerification ? <OTPVerification email={formData.email} /> : null}
    </div>
  );
};

export default RegistrationPage;

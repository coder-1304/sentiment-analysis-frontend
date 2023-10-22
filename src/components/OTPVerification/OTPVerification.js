import React, { useState } from "react";
import "./OTPVerification.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import postData from "../../API/postData";
import Cookies from "js-cookie";

const OTPVerification = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    // Here, you can add your logic to verify the OTP
    // For this example, let's assume the correct OTP is "123456"
    setLoading(true);
    const formData = {
      email: email,
      otp: otp
    }
    const response = await postData("/verifyOtp", formData);
    if (response.success) {
      Cookies.set("jwt_token",response.JWT);
      setLoading(false);
      navigate("/home");
    } else {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className={`dialog-bar open`}>
      <div className="dialog-content">
        <p>We have sent an OTP to {email}. Please verify:</p>
        <input
          type="number"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Enter OTP"
          className="otp-field"
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {loading ? (
          <LoadingOverlay />
        ) : (
          <button className="verify-button" onClick={handleVerify}>
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;

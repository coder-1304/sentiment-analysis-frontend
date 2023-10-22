import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide the notification after 3 seconds (adjust as needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`notification ${visible ? "visible" : ""}`}>{message}</div>
  );
};

export default Notification;

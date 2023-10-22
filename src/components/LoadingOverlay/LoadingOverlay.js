import React from 'react';
import './LoadingOverlay.css'; // Create a corresponding CSS file

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="text">Please Wait</div>
    </div>
  );
};

export default LoadingOverlay;

import React from "react";
import "./IncorrectFeedback.css"; // Create a corresponding CSS file
import { useState } from "react";
import Cookies from "js-cookie";
import postData from "../../API/postData";

const IncorrectFeedback = ({ prediction, callback }) => {
  const select = async () => {
    if (selectedOption === prediction) {
      alert("Selected option cannot be the predicted emotion");
    } else if (selectedOption === "") {
      alert("Plese select an option");
    } else {
      const formData = {
        predictionId: Cookies.get("ID"),
        correctFeedback: false,
        feedback: selectedOption
      };
      const response = await postData("/feedback", formData);
      if (!response.success) {
        alert("Something went wrong");
        return;
      }
      callback();
    }
  };
  const [selectedOption, setOption] = useState("");
  return (
    <div className={`dialog-bar open`}>
      <div className="dialog-content">
        <div className="question-text">
          What should be the correct prediction?
        </div>
        <div className="options">
          <div
            className={`option ${
              selectedOption === "neutral" ? "selected" : ""
            }`}
            onClick={() => setOption("neutral")}
          >
            <div className="emoji">😐</div>
            <div className="emotion">Neutral</div>
          </div>

          <div
            className={`option ${selectedOption === "joy" ? "selected" : ""}`}
            onClick={() => setOption("joy")}
          >
            <div className="emoji">😄</div>
            <div className="emotion">Joy</div>
          </div>

          <div
            className={`option ${
              selectedOption === "sadness" ? "selected" : ""
            }`}
            onClick={() => setOption("sadness")}
          >
            <div className="emoji">😢</div>
            <div className="emotion">Sadness</div>
          </div>

          <div
            className={`option ${selectedOption === "fear" ? "selected" : ""}`}
            onClick={() => setOption("fear")}
          >
            <div className="emoji">😨</div>
            <div className="emotion">Fear</div>
          </div>

          <div
            className={`option ${
              selectedOption === "surprise" ? "selected" : ""
            }`}
            onClick={() => setOption("surprise")}
          >
            <div className="emoji">😲</div>
            <div className="emotion">Surprise</div>
          </div>

          <div
            className={`option ${selectedOption === "anger" ? "selected" : ""}`}
            onClick={() => setOption("anger")}
          >
            <div className="emoji">😡</div>
            <div className="emotion">Anger</div>
          </div>

          <div
            className={`option ${selectedOption === "shame" ? "selected" : ""}`}
            onClick={() => setOption("shame")}
          >
            <div className="emoji">😳</div>
            <div className="emotion">Shame</div>
          </div>

          <div
            className={`option ${
              selectedOption === "disgust" ? "selected" : ""
            }`}
            onClick={() => setOption("disgust")}
          >
            <div className="emoji">🤢</div>
            <div className="emotion">Disgust</div>
          </div>
        </div>
        <button id="select-button" onClick={select}>
          Select
        </button>
      </div>
    </div>
  );
};

export default IncorrectFeedback;

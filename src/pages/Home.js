import "../styles/Home.css";
import { useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";
import IncorrectFeedback from "../components/IncorrectFeedback/IncorrectFeedback";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import {
  anger,
  disgust,
  emotionsMeter,
  fear,
  joy,
  neutral,
  sadness,
  shame,
  surprise,
  logout
} from "../assets/index.js";
import postData from "../API/postData";

const Home = () => {
  const [memeImage, setMemeImage] = useState("");
  const [resultText, setResultText] = useState("");
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const correctFeedback = async (e) => {
    const formData = {
      predictionId: Cookies.get("ID"),
      correctFeedback: true
    }
    const response = await postData("/feedback", formData);
    if (!response.success) {
      alert("Something went wrong");
      return;
    }
    setShowFeedback(!showFeedback);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  const incorrectFeedback = (e) => {
    setShowIncorrectFeedback(true);
  };

  const hideFeedback = () => {
    setShowIncorrectFeedback(false);
    setShowFeedback(false);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  async function apiCall() {
    setLoading(true);
    const resultText = document.getElementById("result-text");
    const textInput = document.getElementById("text-input");
    const text = textInput.value;
    if (text.length === 0) {
      alert("Please add some text");
      return;
    }
    document.getElementById("emotions-meter").style.display = "none";
    const data = {
      text: text,
    };
    console.log(data);
    // var memeImage = document.getElementById("meme-image");
    let color = "";
    let result = "";
    let bgCol = "";
    let image = neutral;

    // Send a POST request to the server
    const formData = {
      text: text,
    };

    const response = await postData("/predict", formData);
    if (response.success) {
      Cookies.set("ID", response.ID);
      switch (response.sentiment) {
        case "neutral":
          color = "gray";
          result = "Neutral 😐";
          image = neutral;
          break;
        case "joy":
          color = "rgb(105, 202, 105)";
          result = "Joy 😄";
          image = joy;
          bgCol = "rgb(232, 255, 232)";
          break;
        case "sadness":
          result = "Sadness 😢";
          image = sadness;
          color = "rgb(105, 139, 202)";
          bgCol = "rgb(222, 231, 255)";
          break;
        case "fear":
          result = "Fear 😨";
          image = fear;
          color = "rgb(171, 157, 186)";
          bgCol = "rgb(33, 33, 33)";
          break;
        case "surprise":
          result = "Surprise 😲";
          image = surprise;
          color = "rgb(205, 205, 0)";
          bgCol = "rgb(225, 225, 165)";
          break;
        case "anger":
          result = "Anger 😡";
          image = anger;
          color = "rgb(202, 105, 105)";
          bgCol = "rgb(244, 194, 194)";
          break;
        case "shame":
          result = "Shame 😳";
          image = shame;
          color = "rgb(255, 121, 143)";
          bgCol = "rgb(255, 234, 234)";
          break;
        case "disgust":
          result = "Disgust 🤢";
          image = disgust;
          bgCol = "rgb(187, 249, 255)";
          color = "rgb(0, 223, 186)";
          break;
        default:
          resultText.style.color = "black"; // Default color for other sentiments
      }
      setMemeImage(image);
      // memeImage.src = `./images/${res.predicted_emotion}.jpg`;
      setResultText(result);
      // resultText.textContent =  result;
      setTextColor(color);
      setShowFeedback(true);
      setLoading(false);
    } else {
      console.log(response);
      alert("Something went wrong");
    }

  }

  const logoutUser = ()=>{
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <div className="center-container">
      {loading ? <LoadingOverlay /> : null}
      <div className="container">
        <div className="title">
          <h1 id="main-title">Sentiment Analysis</h1>
          <img id="logout-icon" src={logout} alt="" onClick={logoutUser} />
        </div>

        <div className="form-container">
          <p>Enter your text:</p>
          <textarea
            id="text-input"
            rows="4"
            placeholder="Type your text here..."
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <button id="analyze-button" onClick={apiCall}>
            Analyze
          </button>
        </div>
        <img id="emotions-meter" src={emotionsMeter} alt="" />
        <div className="upper-result-container">
          <img id="meme-image" src={memeImage} alt="" />
          <div className="result-container">
            <p style={{ color: textColor }} id="result-text">
              {" "}
              {resultText}
            </p>
          </div>
        </div>
        {showFeedback ? (
          <div className="feedback">
            <div className="feedback-border">
              <p className="prediction-question">
                Was that prediction correct?
              </p>
              <div className="feedback-options">
                <div className="yes-button" onClick={correctFeedback}>
                  YES
                </div>
                <div className="no-button" onClick={incorrectFeedback}>
                  NO
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showNotification ? (
          <Notification message="Thanks for your Feedback" />
        ) : null}
        {showIncorrectFeedback ? (
          <IncorrectFeedback prediction={prediction} callback={hideFeedback} />
        ) : null}
      </div>
    </div>
  );
};
export default Home;

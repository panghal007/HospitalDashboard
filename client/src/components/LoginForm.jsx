import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import "./LoginForm.css";

const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const uploadImage = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hospitals/login",
        { email, password }
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        const dataToStore = {
          userData: user,
          token: token,
        };
        localStorage.setItem("Data", JSON.stringify(dataToStore));
        setStep(2);
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const renderFormFields = () => {
    switch (step) {
      case 1:
        return (
          <div className="login--container">
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit2} type="submit">
              Login
            </button>
           
          </div>
        );
      case 2:
        return (
          <div className="webcam">
            {image ? (
              <div className="captured-image">
                <img src={image} alt="Captured" />
                <button onClick={() => setImage(null)}>Retake</button>
                <button onClick={uploadImage}>Upload Image</button>
              </div>
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            )}
            {!image && <button onClick={capture}>Capture Image</button>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    
        <form className="login-form"onSubmit={handleSubmit}>
          {renderFormFields()}
          {/* {step < 2 && <button type="submit">Next</button>} */}
        </form>
      
  );
};

export default LoginForm;

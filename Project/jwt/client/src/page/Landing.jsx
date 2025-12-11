import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import videoBg from "../assets/live-bg.mp4"; // keep your file here

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      {/* background video */}
      <video className="landing-video" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* overlay & center card */}
      <div className="landing-overlay">
        <div className="landing-card">
          <h1 className="landing-title">Student Management System</h1>

          

          <div className="landing-actions">
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

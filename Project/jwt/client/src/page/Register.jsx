import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const API = "http://localhost:3000/api";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/register`, { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="page-root">
      {/* background video */}
      <video autoPlay muted loop className="bg-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* glass card */}
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Create Account</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

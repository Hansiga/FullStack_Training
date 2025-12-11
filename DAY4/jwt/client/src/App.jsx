import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // ---------------- LOGIN STATES ----------------
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ---------------- REGISTER STATES ----------------
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // ---------------- OTHER STATES ----------------
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [daysSinceIAte, setDaysSinceIAte] = useState("");
  const [foods, setFoods] = useState([]);

  const API_URL = "http://localhost:3000/api";

  // ---------------- CHECK LOGIN ON LOAD ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      fetchFoods(token);
    }
  }, []);

  // ---------------- FETCH FOODS ----------------
  const fetchFoods = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/food`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(response.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: regUsername,
        password: regPassword,
      });

      localStorage.setItem("token", response.data.token);
      setIsLogin(true);
      fetchFoods(response.data.token);
      setRegUsername("");
      setRegPassword("");
      alert("Registered successfully!");
    } catch (error) {
      console.log("Register error:", error);
      alert("Registration failed!");
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: loginUsername,
        password: loginPassword,
      });

      localStorage.setItem("token", response.data.token);
      setIsLogin(true);
      fetchFoods(response.data.token);
      setLoginUsername("");
      setLoginPassword("");
    } catch (error) {
      console.log("Login error:", error);
      alert("Invalid credentials!");
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setFoods([]);
  };

  // ---------------- ADD FOOD ----------------
  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/food`,
        { name, daysSinceIAte: Number(daysSinceIAte) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setDaysSinceIAte("");
      fetchFoods(token);
    } catch (error) {
      console.log("Add food error:", error);
    }
  };

  // ---------------- LOGIN / REGISTER UI ----------------
  if (!isLogin) {
    return (
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // ---------------- AFTER LOGIN UI ----------------
  return (
    <div className="app-container">
      <h2>Welcome!</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Add Food</h3>
      <form onSubmit={handleAddFood}>
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Days Since Ate"
          value={daysSinceIAte}
          onChange={(e) => setDaysSinceIAte(e.target.value)}
        />
        <button type="submit">Add Food</button>
      </form>

      <h3>Food List</h3>
      <ul>
        {foods.map((item) => (
          <li key={item._id}>
            {item.name} — {item.daysSinceIAte} days ago
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

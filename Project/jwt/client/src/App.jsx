import { Routes, Route } from "react-router-dom";
import Landing from "./page/Landing";
import Register from "./page/Register";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

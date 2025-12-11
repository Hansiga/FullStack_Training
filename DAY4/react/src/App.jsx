import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import BookList from "./BookList.jsx";

const App = () => {
  return (
    <>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/BookList">BookList</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BookList" element={<BookList />} />
      </Routes>
    </>
  );
};

export default App;



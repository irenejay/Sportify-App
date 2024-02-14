import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Leagues from "./components/Leagues";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Leagues" element={<Leagues />} />
      </Routes>
    </div>
  );
}

export default App;

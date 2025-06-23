import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import React Router components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Add from "./components/Add";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
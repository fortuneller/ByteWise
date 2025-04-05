import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import CreateLesson from "./pages/CreateLesson";
import CreateFolder from "./pages/CreateFolder"; // Add this import

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateLesson />} />
        <Route path="/create-folder" element={<CreateFolder />} />
      </Routes>
    </>
  );
}

export default App;

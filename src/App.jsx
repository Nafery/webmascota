import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import LoginPage from "./pages/login/index";
import UserProfilePage from "./pages/user_profile";
import PetDetailsPage from './pages/pet';
import CreateAttentionPage from "./pages/attention";
import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/pet/:petId" element={<PetDetailsPage />} />
        <Route path="/attention" element={<CreateAttentionPage />} />
      </Routes>
    </Router>
  )
}

export default App

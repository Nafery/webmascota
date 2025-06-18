import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import LoginPage from "./pages/login/index";
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
      </Routes>
    </Router>
  )
}

export default App

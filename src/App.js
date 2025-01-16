// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Homepage from './components/Home';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import YourWorks from './components/YourWorks';
import ToDo from './components/ToDo'; 
import HabitTracking from './components/HabitTracking';
import Community from './components/Community';
import Progress from './components/Progress';
import Sessions from './components/Sessions';
import MindMap from './components/MindMap';
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Nested Routes for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="your-works" element={<YourWorks />} />
          <Route path="todo" element={<ToDo />} />
          <Route path="habit-tracking" element={<HabitTracking />} />
          <Route path="community" element={<Community />} />
          <Route path="progress" element={<Progress />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="mind-map" element={<MindMap />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

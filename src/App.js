// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import './App.css';

const App = () => {
  const location = useLocation();

  // Exclude Navbar for dashboard routes
  const hideNavbarRoutes = ['/dashboard', '/dashboard/profile', '/dashboard/your-works', '/dashboard/todo', '/dashboard/habit-tracking', '/dashboard/community', '/dashboard/progress', '/dashboard/sessions', '/dashboard/mind-map'];
  const shouldShowNavbar = !hideNavbarRoutes.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
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

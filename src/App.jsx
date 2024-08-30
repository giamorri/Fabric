// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

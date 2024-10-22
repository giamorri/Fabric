import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';

import Signup from './components/Signup';
import Signin from './components/Signin';
import PostDetails from './components/PostDetails';
import Closet from './components/Closet';
import SavedCloset from './components/SavedCloset'; 
import HomeCloset from './components/HomeCloset';
import MannequinCloset from './components/MannequinCloset'; 
import UserProfile from './components/UserProfile';

const App = () => {

  return (

      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/post/:postId" element={<PostDetails />} />  
            <Route path="/Closet" element={<Closet />} />
            <Route path="/SavedCloset" element={<SavedCloset />} />
            <Route path="/HomeCloset" element={<HomeCloset />} />
            <Route path="/MannequinCloset" element={<MannequinCloset />} />
            <Route path="/user/:userId" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    
  );
};

export default App;

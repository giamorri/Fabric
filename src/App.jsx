import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';

import Signup from './components/Signup';
import Signin from './components/Signin';
import PostDetails from './components/PostDetails';
import Moodboard from './components/Moodboard'; 
import './components/Moodboard.css'; 

const App = ({ onImageChange }) => {
  const [backgroundImage, setBackgroundImage] = useState('image1.jpg');

  const handleImageChange = (newImage) => {
    setBackgroundImage(newImage);
  };



  return (

    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings onImageChange={handleImageChange} />} />
            
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/post/:postId" element={<PostDetails />} />  
            <Route path="/Moodboard" element={<Moodboard />} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

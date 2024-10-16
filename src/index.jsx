// src/index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const RootComponent = () => {
  const defaultImage = '/background/image1.jpg';  // Correct default path
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);

  const handleImageChange = (newImage) => {
    setBackgroundImage(newImage);
    console.log(`Background image updated to: ${newImage}`);  // Log new background image
  };

  // Apply the background image whenever it changes
  useEffect(() => {
    console.log(`Applying background image: ${backgroundImage}`);
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);

  return (
    <React.StrictMode>
      <App onImageChange={handleImageChange} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RootComponent />
);

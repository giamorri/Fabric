// src/components/Settings.jsx
import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ onImageChange }) => {
  const images = [
    '/background/image1.png',  // Make sure paths are correct
    '/background/image1.jpg',
    '/background/image2.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);  // Default selection

  const handleSelectChange = (event) => {
    const newImage = event.target.value;
    setSelectedImage(newImage);
    console.log(`New background selected: ${newImage}`);  // Log selected image
    onImageChange(newImage);  // Update the background in the parent component
  };

  return (
    <div className="settings-container">
      <h2>Choose Background Image</h2>
      <select value={selectedImage} onChange={handleSelectChange}>
        {images.map((image, index) => (
          <option key={index} value={image}>
            {`Background ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Settings;

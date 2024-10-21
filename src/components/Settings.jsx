import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState('');

  const backgroundImages = [
    require('../background/1.webp'),
    require('../background/2.webp'),
    require('../background/3.webp'),
    require('../background/4.webp'),
    require('../background/5.webp'),
    require('../background/6.webp'),
    require('../background/7.webp'),
    require('../background/8.webp'),
    require('../background/9.webp'),
    require('../background/10.webp'),
    require('../background/image1.jpg'),
  ];

  const handleImageSelect = (event) => {
    const newImage = event.target.value;
    setSelectedImage(newImage);
    onImageChange(newImage);
    localStorage.setItem('selectedBackground', newImage); // Save in localStorage to persist
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('selectedBackground');
    if (savedImage) {
      setSelectedImage(savedImage);
      onImageChange(savedImage);
    } else {
      setSelectedImage(require('../background/image1.jpg')); // Default image
      onImageChange(require('../background/image1.jpg'));
    }
  }, [onImageChange]);

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-options">
        <div className="background-options">
          <h3>Select Background</h3>
          <div className="image-grid">
            {backgroundImages.map((image, index) => (
              <label key={index} className="thumbnail-container">
                <input
                  type="radio"
                  name="background"
                  value={image}
                  checked={selectedImage === image}
                  onChange={handleImageSelect}
                />
                <img src={image} alt={`Background ${index + 1}`} className="thumbnail" />
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="contactBox">
        <h3>Contact the Developers</h3>
        <ul>
          <li><strong>Email:</strong> devteam@fabric.com</li>
          <li><strong>Phone:</strong> +123 456 7890</li>
          <li><strong>Website:</strong> <a href="https://www.example.com" style={{ color: '#fff' }}>www.example.com</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;

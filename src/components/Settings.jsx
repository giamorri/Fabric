import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [selectedImage, setSelectedImage] = useState('');

  // List of available background images
  const backgroundImages = [
    require('../background/1.webp'),
    require('../background/2.webp'),
    require('../background/3.webp'),
    require('../background/4.webp'),
    require('../background/5.webp'),
    require('../background/6.webp'),
    require('../background/7.webp'),
    require('../background/image1.jpg'),
  ];

  // Function to handle image selection
  const handleImageSelect = (event) => {
    const newImage = event.target.value;
    setSelectedImage(newImage);
  };

  // Effect to load the image from localStorage on mount (if needed for future)
  useEffect(() => {
    const savedImage = localStorage.getItem('selectedBackground');
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Backgrounds Section */}
      <div className="settings-options">
        <div className="background-options">
          <h3>Backgrounds (Coming Soon)</h3>
          <p className="coming-soon-text">You can select an image, but this feature is coming soon!</p>
          <div className="image-grid">
            {backgroundImages.map((image, index) => (
              <label key={index} className="thumbnail-container">
                <input
                  type="radio"
                  name="background"
                  value={image}
                  checked={selectedImage === image}
                  onChange={handleImageSelect}
                  disabled // Disable the selection to indicate it's not functional yet
                />
                <img src={image} alt={`Background ${index + 1}`} className="thumbnail" />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Box */}
      <div className="contactBox">
        <h3>Contact the Developers</h3>
        <p>For any issues or inquiries, feel free to contact the development team:</p>
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

import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

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
    onImageChange(newImage); // Pass the new image to App
    localStorage.setItem('selectedBackground', newImage); // Persist image in localStorage
    document.body.style.backgroundImage = `url(${newImage})`; // Apply image as body background

    // Apply background color based on the selected image
    switch (newImage) {
      case require('../background/1.webp'):
        setBackgroundColor('rgba(85, 37, 24, 0.7)'); // Brown
        break;
      case require('../background/2.webp'):
        setBackgroundColor('rgba(150, 30, 30, 0.7)'); // Red
        break;
      case require('../background/3.webp'):
        setBackgroundColor('rgba(0, 100, 0, 0.7)'); // Green
        break;
      case require('../background/4.webp'):
        setBackgroundColor('rgba(255, 182, 193, 0.7)'); // Pink
        break;
      case require('../background/5.webp'):
        setBackgroundColor('rgba(0, 0, 0, 0.7)'); // Black
        break;
      case require('../background/6.webp'):
        setBackgroundColor('rgba(255, 182, 193, 0.4)'); // Light Pink
        break;
      case require('../background/image1.jpg'):
        setBackgroundColor('rgba(101, 67, 33, 0.7)'); // Dark Brown
        break;
      default:
        setBackgroundColor('rgba(255, 255, 255, 1)'); // Default white
        break;
    }

    // Apply the background color
    document.body.style.backgroundColor = backgroundColor; // Set the overlay color
    document.body.style.backgroundSize = 'cover'; // Ensures the image covers the screen
    document.body.style.backgroundAttachment = 'fixed'; // Makes sure the image stays fixed
    document.body.style.backgroundRepeat = 'no-repeat'; // No repetition
    document.body.style.backgroundPosition = 'center'; // Centers the image
  };

  // Effect to load the image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('selectedBackground');
    if (savedImage) {
      setSelectedImage(savedImage);
      onImageChange(savedImage); // Load saved image
      document.body.style.backgroundImage = `url(${savedImage})`; // Apply saved image as background
      document.body.style.backgroundColor = backgroundColor; // Apply the stored background color
      document.body.style.backgroundSize = 'cover'; // Ensure it covers the screen
      document.body.style.backgroundAttachment = 'fixed'; // Ensure it remains fixed
      document.body.style.backgroundRepeat = 'no-repeat'; // No repetition
      document.body.style.backgroundPosition = 'center'; // Centers the image
    } else {
      const defaultImage = require('../background/image1.jpg');
      setSelectedImage(defaultImage);
      onImageChange(defaultImage);
      document.body.style.backgroundImage = `url(${defaultImage})`; // Default background
      document.body.style.backgroundColor = backgroundColor; // Apply default color
      document.body.style.backgroundSize = 'cover'; // Ensure it covers the screen
      document.body.style.backgroundAttachment = 'fixed'; // Ensure it remains fixed
      document.body.style.backgroundRepeat = 'no-repeat'; // No repetition
      document.body.style.backgroundPosition = 'center'; // Centers the image
    }
  }, [onImageChange, backgroundColor]);

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

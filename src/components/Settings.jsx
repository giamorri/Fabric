import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ onImageChange }) => {
  // Stores the selected image's URL
  const [image, setImage] = useState('');

  // Handles image selection
  const handleImageChange = (e) => {
    const newImage = e.target.files[0]; //first file from the input
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage); //makes a temporary URL for the selected image
      setImage(imageUrl); //updates to new image URL
      onImageChange(imageUrl); //passes the new image
    } else {
      setImage(''); //if no image is selected, set to empty string
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      
      {/* image upload input */}
      <input type="file" onChange={handleImageChange} accept="image/*" />

      
      {/* display the selected image */}
      {image && <img src={image} alt="Selected background" style={{ width: '300px' }} />}

      {/* contact the devs */}
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

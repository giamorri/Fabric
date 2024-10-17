
import React, { useState } from 'react';

const Settings = ({ onImageChange }) => {
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const newImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(newImage);
    setImage(imageUrl);
    onImageChange(imageUrl); 
  };

  return (
    <div>
      <h2>Settings</h2>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected background" style={{ width: '300px' }} />}
    </div>
  );
};

export default Settings;

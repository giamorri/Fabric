import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState('default-profile.jpg');
  const [coverImage, setCoverImage] = useState('default-cover.jpg');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="cover-photo" onClick={() => triggerFileInput(coverInputRef)}>
          <img src={coverImage} alt="Cover" className="cover-photo-img" />
          <div className="upload-overlay">
            <span>Upload Cover Photo</span>
          </div>
          <input
            type="file"
            ref={coverInputRef}
            onChange={(e) => handleImageUpload(e, setCoverImage)}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <div className="profile-picture-container" onClick={() => triggerFileInput(profileInputRef)}>
          <img src={profileImage} alt="Profile" className="profile-picture" />
          <div className="upload-overlay">
            <span>Upload Profile Picture</span>
          </div>
          <input
            type="file"
            ref={profileInputRef}
            onChange={(e) => handleImageUpload(e, setProfileImage)}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <h1 className="profile-name">{username}</h1>
        <p className="fabricusername">@{username}</p>
        <div className="follower-info">
          <span>0 followers · 0 following</span>
        </div>
        </div>
      </div>
  );
};

export default Profile;
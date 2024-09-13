import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => 
  {
  
    const username = localStorage.getItem('username'); // Retrieve the username from localStorage

    
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="cover-photo">
          <img src="cover-photo.jpg" alt="Cover" className="cover-photo-img" />
        </div>
        <div className="profile-picture-container">
          <img src="profile-picture.jpg" alt="Profile" className="profile-picture" />
        </div>
        <h1 className="profile-name">{username}</h1> 
        <p className="fabricusername">@{username}</p>
        <div className="follower-info">
          <span>0 followers · 0 following</span>
        </div>
        
        <div className="profile-actions">
          
          <button className="edit-profile-button">Edit profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

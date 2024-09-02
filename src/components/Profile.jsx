import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="cover-photo">
          <img src="cover-photo.jpg" alt="Cover" className="cover-photo-img" />
        </div>
        <div className="profile-picture-container">
          <img src="profile-picture.jpg" alt="Profile" className="profile-picture" />
        </div>
        <h1 className="profile name">Gia Morri</h1>
        <p className="fabricusername">@giamorri</p>
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

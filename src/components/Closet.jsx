import React from 'react';
import { Link } from 'react-router-dom';
import './Closet.css';

const Closet = () => {
  return (
    <div className="closet-container">
      <h1>My Closet</h1>
      <div className="closet-folders">
        <div className="folder">
          <Link to="/SavedCloset">Saved Closet (coming soon)</Link>
        </div>
        <div className="folder">
          <Link to="/HomeCloset">Home Closet (coming soon)</Link>
        </div>
        <div className="folder">
          <Link to="/MannequinCloset">Mannequin Closet (coming soon)</Link>
        </div>
      </div>
    </div>
  );
};

export default Closet;

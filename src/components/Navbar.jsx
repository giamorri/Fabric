import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/Settings">Settings</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

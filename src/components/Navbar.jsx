import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import sampleLogo from './images/logoSample3.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="fabricSample">
        <img src={sampleLogo}></img>
      </ul>
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

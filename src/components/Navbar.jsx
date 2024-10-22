import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './Navbar.css';
import sampleLogo from './images/logoSample3.png';

const Navbar = () => 
  {

  const [dropdownVisible, setDropdownVisible] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsLoggedIn(true); 
    }
  }, []);

  const handleMouseEnter = () => {
    setDropdownVisible(true); 
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false); 
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('username'); 
    localStorage.removeItem('profileImage'); // Clear profile image from localStorage

    setIsLoggedIn(false); 
    window.location.href = '/Signin'; 
  };

  return (
    <nav className="navbar">
      <ul className="fabricSample">
        <img src={sampleLogo} alt=""></img>
      </ul>
      <ul className="navbar-list">
        <li><Link to="/Home">HOME</Link></li>
        <li><Link to="/Profile">PROFILE</Link></li>
        <li><Link to="/Closet">CLOSET</Link></li>
        <li><Link to="/Settings">SETTINGS</Link></li>
        
      
        {!isLoggedIn ? (
          <li 
            className="dropdown" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#">LOGIN</Link>
            {dropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/Signin">SIGN IN</Link></li>
                <li><Link to="/Signup">SIGN UP</Link></li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import './Navbar.css';
import sampleLogo from './images/logoSample3.png';

const Navbar = () => 
  {

  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage visibility of the login dropdown

  const handleMouseEnter = () => {
    setDropdownVisible(true); // Show the dropdown on mouse enter
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false); // Hide the dropdown on mouse leave
  };


  return (
    <nav className="navbar">
      <ul className="fabricSample">
        <img src={sampleLogo} alt=""></img>
      </ul>
      <ul className="navbar-list">
        <li><Link to="/Home">HOME</Link></li>
        <li><Link to="/Profile">PROFILE</Link></li>
        
        {/* Login dropdown  */}
        <li 
          className="dropdown" 
          onMouseEnter={handleMouseEnter} // Show the dropdown on hover
          onMouseLeave={handleMouseLeave} // Hide the dropdown when mouse leaves
        >
          <Link to="#">LOGIN</Link> {/* # is used here because we do not want it to navigate */}
          
          {dropdownVisible && ( // Conditionally render the dropdown
            <ul className="dropdown-menu">
              <li><Link to="/Signin">SIGN IN</Link></li> {/* Link for sign in */}
              <li><Link to="/Signup">SIGN UP</Link></li> {/* Link for sign up */}
            </ul>
          )}
        </li>
        <li><Link to="/Settings">SETTINGS</Link></li>
        <li><Link to="/Contact">CONTACT</Link></li>
      
      </ul>
    </nav>
  );
};

export default Navbar;

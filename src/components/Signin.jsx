import React, { useState } from 'react';
import './SigninSignup.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function


  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    
    const data = await response.json();
  
    if (response.ok) {
      // Save the entire user object in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Sign in successful');
      
      // Redirect to profile page after successful sign in
      window.location.href = '/Profile';
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };
  

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signin;

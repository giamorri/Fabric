import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For linking to Sign-in page
import './SigninSignup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);  // Track sign-up success

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // After successful sign-up, show success message and prompt to sign in
        setSignupSuccess(true); 
        setMessage('Sign up successful. Please sign in.');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('Error: Signup failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign Up</h2>
        {signupSuccess ? (
          <div>
            <p>{message}</p>
            <p>
              You can now <Link to="/Signin">Sign In</Link>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
        {message && !signupSuccess && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;

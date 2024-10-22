import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // Track signup success

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        password, // Note: Plaintext password is for demonstration only; not recommended for production
        createdAt: Timestamp.now()
      });

      setSignupSuccess(true); // Indicate that signup was successful
      setMessage('Account created successfully!'); // Set success message
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign Up</h2>
        {signupSuccess ? (
          // Success message with link to Sign In page
          <div>
            <p>{message}</p>
            <p>You can now <Link to="/signin">Sign In</Link> to your account.</p>
          </div>
        ) : (
          // Sign up form
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
        {/* Display error or informational message */}
        {message && !signupSuccess && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signup;

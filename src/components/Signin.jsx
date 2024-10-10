import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './SigninSignup.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();

<<<<<<< Updated upstream
    if (response.ok) {
      // Save the username to localStorage
      localStorage.setItem('username', data.user.username); // Assuming the response contains the user object
      localStorage.setItem('profileImage', `http://localhost:5000/${data.user.profileImage}`); // Save full image URL

      
      setMessage('Sign in successful');
      // Redirect to profile page after successful sign in
      window.location.href = '/Profile';
    } else {
      setMessage(`Error: ${data.error}`);
=======
    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('username', userData.username); // Save username to localStorage
        setMessage('Sign in successful');
        window.location.href = '/Profile'; // Redirect to the Profile page
      } else {
        setMessage('User data not found');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
>>>>>>> Stashed changes
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
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
          <button type="submit">Sign In</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Signin;

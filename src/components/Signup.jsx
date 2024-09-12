import React from 'react';
import './SigninSignup.css'; // Make sure to import the CSS file

const Signup = () => {
  return (
    <div className="auth-wrapper"> {/* Added transparent brown box */}
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="switch-auth">
          <p>Already have an account? <a href="/Signin">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

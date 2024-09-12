import React from 'react';
import './SigninSignup.css'; // Make sure to import the CSS file

const Signin = () => {
  return (
    <div className="auth-wrapper"> {/* Added transparent brown box */}
      <div className="auth-container">
        <h2>Sign In</h2>
        <form>
          <input type="text" placeholder="Username or Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
        <div className="switch-auth">
          <p>Don't have an account? <a href="/Signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

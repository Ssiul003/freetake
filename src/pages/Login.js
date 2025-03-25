import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
    setIsForgotPassword(false);  // Reset Forgot Password form if toggling
  };
  
  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email');
  };

  let formContent;

  if (isForgotPassword) {
    // Forgot Password Flow
    formContent = (
      <div>
        <h2>Reset Your Password</h2>
        <form className='authentication-form' onSubmit={handlePasswordReset}>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
        <button className="back-to-login-btn" onClick={() => setIsForgotPassword(false)}>Back To Login?</button>
      </div>
    );
  } else if (!isSignUp) {
    // Login Flow
    formContent = (
      <div>
        <form className='authentication-form'>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          <button className="forgot-password-btn" onClick={handleForgotPassword}>Forgot Password?</button>
        </p>
      </div>
    );
  } else {
    // Sign Up Flow
    formContent = (
      <div>
        <form className='authentication-form'>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Create your password" required />
          </div>
          <div>
            <label>Confirm Password: </label>
            <input type="password" placeholder="Confirm your password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }

  return (
    <div className='authentication-container'>
      <div style={{visibility: isForgotPassword ? 'hidden' : 'visible'}}>
        <h1>Select Your Needs!</h1>
      </div>
      <div style={{visibility: isForgotPassword ? 'hidden' : 'visible'}} className='login-toggle'>
        <button onClick={!isSignUp ? toggleForm : null} className={!isSignUp ? 'off-signup-form' : 'on-signup-form'}>Sign Up</button>
        <button onClick={isSignUp ? toggleForm : null} className={isSignUp ? 'off-login-form' : 'on-login-form'}>Login</button>
      </div>
      <div>
        {formContent}
      </div>
    </div>
  );
};

export default Login;

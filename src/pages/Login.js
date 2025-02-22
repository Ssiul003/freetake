import React, { useState } from 'react';

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
        <h2>Reset Password</h2>
        <form onSubmit={handlePasswordReset}>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
        <p>
          Remember your password?{' '}
          <button onClick={() => setIsForgotPassword(false)}>Go Back to Login</button>
        </p>
      </div>
    );
  } else if (!isSignUp) {
    // Login Flow
    formContent = (
      <div>
        <h2>Login</h2>
        <form>
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
          Don't have an account?{' '}
          <button onClick={toggleForm}>Sign Up</button>
        </p>
        <p>
          <button onClick={handleForgotPassword}>Forgot Password?</button>
        </p>
      </div>
    );
  } else {
    // Sign Up Flow
    formContent = (
      <div>
        <h2>Sign Up</h2>
        <form>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Create a password" required />
          </div>
          <div>
            <label>Confirm Password: </label>
            <input type="password" placeholder="Confirm your password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <button onClick={toggleForm}>Login</button>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h1>Welcome to FreeTake!</h1>
      {formContent}
    </div>
  );
};

export default Login;

import React, { useState } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };

  let formContent;

  if (!isSignUp) {
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
      </div>
    );
  } else {
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


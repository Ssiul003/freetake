import React, { useState } from 'react';

// all form components
import ForgotPasswordForm from '../components/ForgotPasswordForm/ForgotPasswordForm';
import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';

import '../pages-styles/Login.css';

// custom hooks
import { useSignupStates } from '../hooks/useSignup';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
    setIsForgotPassword(false);  
  };
  
  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email');
  };

  const {
    formInput,
    formError,
    handleSignupInput,
    handleSignup,
    showPassword,
    toggleShowPassword
  } = useSignupStates();

  var formContent = null;

  if (isForgotPassword) {
    formContent =
      <ForgotPasswordForm
        handlePasswordReset={handlePasswordReset}
        onClick={() => setIsForgotPassword(false)}
      />
  } else if (!isSignUp) {
    formContent =
      <LoginForm
        handleForgotPassword={handleForgotPassword}
      />
  } else {
    formContent =
      <SignupForm
        formInput={formInput}
        formError={formError}
        handleSignupInput={handleSignupInput}
        handleSignup={handleSignup}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />
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
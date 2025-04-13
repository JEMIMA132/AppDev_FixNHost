import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';


const LoginForm = ({ onToggleForm }) => {
  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Sign in to access your account</p>
      <form className="login-form">
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="youremail@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-btn">Sign In</button>
      </form>
      <p className="register-link">
        Don't have an account?{' '}
        <span onClick={onToggleForm} className="toggle-link">
          Register now
        </span>
      </p>
      <div className="divider">Or continue with</div>
      <div className="social-login">
        <button className="social-btn">
          <FcGoogle className="social-icon" /> Google
        </button>
        <button className="social-btn">
          <FaFacebook className="social-icon" /> Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
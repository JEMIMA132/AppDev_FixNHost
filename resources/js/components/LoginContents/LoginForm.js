import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const LoginForm = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate successful login
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate('/homepage'); // redirect after login
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Sign in to access your account</p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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

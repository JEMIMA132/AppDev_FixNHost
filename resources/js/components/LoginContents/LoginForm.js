import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const LoginForm = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      if (response.data.token) {
        // Store the token
        localStorage.setItem('token', response.data.token);
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/homepage');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Sign in to access your account</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="sign-in-btn" 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="register-link">
        Don't have an account?{' '}
        <span onClick={onToggleForm} className="toggle-link">
          Register now
        </span>
      </p>
    </div>
  );
};

export default LoginForm;

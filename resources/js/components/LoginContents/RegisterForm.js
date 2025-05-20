import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const RegisterForm = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    date_of_birth: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/register', formData);

      if (response.data.token) {
        // Store the token
        localStorage.setItem('token', response.data.token);
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/homepage');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <p>Sign up to get started</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group name-group">
          <div className="name-field">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="name-field">
            <label>Middle Name</label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="form-group name-group">
          <div className="name-field">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="name-field">
            <label>Suffix</label>
            <input
              type="text"
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group name-group">
          <div className="name-field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="name-field">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              disabled={loading}
              className="custom-gender-select"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button 
          type="submit" 
          className="register-btn create-account-btn" 
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p className="login-link">
        Already have an account?{' '}
        <span onClick={onToggleForm} className="toggle-link">
          Sign in
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;

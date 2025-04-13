import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onToggleForm }) => {
  const navigate = useNavigate();

  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation: check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Validation: check if all fields are filled
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate successful registration
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    // Save user data to localStorage and set login status
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(newUser));

    // Redirect to homepage after successful registration
    navigate('/homepage');
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <p>Join our platform and get started</p>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group name-group">
          <div className="name-field">
            <label>First Name</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="" 
              required 
            />
          </div>
          <div className="name-field">
            <label>Last Name</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="" 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="••••••••" 
            required 
          />
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
        </div>
        <button type="submit" className="create-account-btn">Create Account</button>
        {error && <p className="error-msg">{error}</p>}
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

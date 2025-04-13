import React from 'react';


const RegisterForm = ({ onToggleForm }) => {
  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <p>Join our platform and get started</p>
      <form className="register-form">
        <div className="form-group name-group">
          <div className="name-field">
            <label>First Name</label>
            <input type="text" placeholder="John" />
          </div>
          <div className="name-field">
            <label>Last Name</label>
            <input type="text" placeholder="Doe" />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="youremail@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
        </div>
        <button type="submit" className="create-account-btn">Create Account</button>
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
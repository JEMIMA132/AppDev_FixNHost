import React, { useState } from 'react'; // Ensure useState is imported
import Header from '../Headers/Header'; // Adjust path as needed
import Footer from '../Footers/Footer'; // Adjust path as needed
import LoginForm from '../LoginContents/LoginForm'; // Path is correct
import RegisterForm from '../LoginContents/RegisterForm'; // Corrected path to LoginContents

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true); // State to toggle between forms

  const handleToggleForm = () => {
    setShowLoginForm((prev) => !prev); // Toggle between LoginForm and RegisterForm
  };

  return (
    <div className="login-page">
      <Header />
      <main>
        {showLoginForm ? (
          <LoginForm onToggleForm={handleToggleForm} />
        ) : (
          <RegisterForm onToggleForm={handleToggleForm} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Login;
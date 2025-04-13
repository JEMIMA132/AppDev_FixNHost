import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/homepage"; // Default to homepage if no state

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate storing user data in localStorage (in a real app, this would hit an API)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(
      (u) => u.email === emailPhone || u.phone === emailPhone
    );

    if (userExists) {
      alert("User already exists!");
    } else {
      users.push({ fullName, username, email: emailPhone, phone: emailPhone, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully! Please log in.");
      navigate("/login", { state: { from } }); // Redirect back to login with intent
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src="/images/logos.svg" alt="FixNHost Logo" className="signup-logo" />
      </div>
      <div className="signup-right">
        <h2>Create New Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email/phone number"
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account?</p>
          <button onClick={() => navigate("/login", { state: { from } })}>Sign In</button>
          <div className="social-login">
            <a href="/auth/google">
              <img src="/images/google.svg" alt="Google Signup" />
            </a>
            <a href="/auth/facebook">
              <img src="/images/fb.svg" alt="Facebook Signup" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
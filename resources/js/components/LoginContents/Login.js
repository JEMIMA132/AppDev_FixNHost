import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/homepage"; // Default to homepage if no state

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a simple login check (in a real app, this would hit an API)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => (u.email === emailPhone || u.phone === emailPhone) && u.password === password
    );

    if (user) {
      alert("Login successful!");
      // Redirect based on the intended action
      if (from === "book-service") {
        navigate("/book-service"); // Implement this route later
      } else if (from === "become-vendor") {
        navigate("/become-vendor"); // Implement this route later
      } else {
        navigate("/homepage");
      }
    } else {
      alert("Invalid credentials or no account found. Please sign up.");
      navigate("/signup", { state: { from } }); // Pass the intent to signup
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/images/logos.svg" alt="FixNHost Logo" className="login-logo" />
      </div>
      <div className="login-right">
        <h2>WELCOME BACK!</h2>
        <p>Enter your credentials to login</p>
        <form onSubmit={handleLogin}>
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
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account?</p>
          <button onClick={() => navigate("/signup", { state: { from } })}>Create Account</button>
          <div className="social-login">
            <a href="/auth/google">
              <img src="/images/google.svg" alt="Google Login" />
            </a>
            <a href="/auth/facebook">
              <img src="/images/fb.svg" alt="Facebook Login" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
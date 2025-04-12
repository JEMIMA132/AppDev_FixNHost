import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Headers/Header"; // Import the Header component
import Homepage from "./components/HomeContent/Homepage";

// Placeholder components for other routes
const Services = () => <div>Services Page (Under Construction)</div>;
const About = () => <div>About Us Page (Under Construction)</div>;
const Contact = () => <div>Contact Us Page (Under Construction)</div>;
const PrivacyPolicy = () => <div>Privacy Policy Page (Under Construction)</div>;
const TermsOfService = () => <div>Terms of Service Page (Under Construction)</div>;
const FAQs = () => <div>FAQs Page (Under Construction)</div>;
const Login = () => <div>Login Page (Under Construction)</div>;

const App = () => {
  return (
    <Router>
      <Header /> {/* Render Header on all pages */}
      <Routes>
        {/* Redirect root path (/) to /homepage */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* Additional routes for Header links */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </Router>
  );
};

// Mount the React App to the DOM
if (document.getElementById("root")) {
  // Note: If using React 18, use createRoot instead
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
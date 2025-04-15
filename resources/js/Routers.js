import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./components/HomeContent/Homepage";
import Login from "./components/LoginContents/Login";
import Signup from "./components/LoginContents/Signup";
import LandingPage from "./components/LoginContents/Landingpage";
import Services from "./components/ServicesContent/Services";
import AboutUs from "./components/Abouts/AboutUs";
import ContactUs from "./components/Contacts/ContactUs";
import Policy from "./components/Dropdowns/Policy";
import Terms from "./components/Dropdowns/Terms";
import Faqs from "./components/Dropdowns/Faqs";
import Become from "./components/Becomes/Become"; // Import the Become component
import Choose from "./components/ServicesContent/Choose";

// Private Route Component (for pages that need the user to be logged in)
const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

// Placeholder components for FixVendor and HostVendor (update as needed)
const FixVendor = () => <div>FixVendor component goes here</div>;
const HostVendor = () => <div>HostVendor component goes here</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Redirect to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login & Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Pages */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms-of-services" element={<Terms />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/become" element={<Become />} /> {/* Add Become route */}

        {/* Service Selection Route */}
        <Route path="/choose/:type/:id" element={<Choose />} />

        {/* Vendor Routes */}
        <Route path="/fix-vendor" element={<FixVendor />} />
        <Route path="/host-vendor" element={<HostVendor />} />

        {/* Protected Route Example */}
        <Route path="/protected-home" element={<PrivateRoute element={<Homepage />} />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

// Mount the React App
if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
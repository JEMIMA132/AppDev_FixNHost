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
import Policy from "./components/Dropdowns/Policy"; // Adjust path as needed
import Terms from "./components/Dropdowns/Terms"; // Adjust path as needed
import Faqs from "./components/Dropdowns/Faqs"; // Adjust path as needed
import Book from "./components/Becomes/Book"; // Already imported

// Private Route Component (for pages that need the user to be logged in)
const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

// Placeholder components for FixVendor and HostVendor (replace with actual components later)
const FixVendor = () => <Navigate to="/book" replace />;
const HostVendor = () => <Navigate to="/book" replace />;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Book />} />

        {/* Login & Signup Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Pages */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms-of-services" element={<Terms />} />
        <Route path="/faqs" element={<Faqs />} />

        {/* New Routes for FixVendor and HostVendor */}
        <Route path="/fix-vendor" element={<FixVendor />} />
        <Route path="/host-vendor" element={<HostVendor />} />

        {/* Private Routes (These will redirect to login if not logged in) */}
        <Route path="/protected-home" element={<PrivateRoute element={<Homepage />} />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </Router>
  );
};

// Mount the React App
if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;
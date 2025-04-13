
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
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Routes for navigation (no component rendering) */}
        <Route path="/services" element={<></>} />
        <Route path="/about" element={<></>} />
        <Route path="/contact" element={<></>} />
        <Route path="/privacy-policy" element={<Policy/>} />
        <Route path="/terms-of-services" element={<Terms/>} />
        <Route path="/faqs" element={<Faqs/>} />

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
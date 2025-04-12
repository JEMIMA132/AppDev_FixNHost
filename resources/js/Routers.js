import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/HomeContent/Homepage";
import PrivacyPolicy from "./components/SupportArea/PrivacyPolicy";
import TermsOfService from "./components/SupportArea/TermsOfService";
import FAQs from "./components/SupportArea/FAQs";
import AboutUs from "./components/AboutUsArea/AboutUs";
import ContactUs from "./components/ContactUsArea/ContactUs";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />


        {/* Routes for navigation (no component rendering) */}
        <Route path="/services" element={<></>} />
        <Route path="/about" element={<></>} />
        <Route path="/contact" element={<></>} />
        <Route path="/login" element={<></>} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </Router>
  );
};

// Mount the React App
if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default App;

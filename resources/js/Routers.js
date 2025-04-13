import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/HomeContent/Homepage";
import Login from "./components/LoginContents/Login";
import Signup from "./components/LoginContents/Signup";
import LandingPage from "./components/LoginContents/Landingpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes for navigation (no component rendering) */}
        <Route path="/services" element={<></>} />
        <Route path="/about" element={<></>} />
        <Route path="/contact" element={<></>} />
        <Route path="/privacy-policy" element={<></>} />
        <Route path="/terms-of-service" element={<></>} />
        <Route path="/faqs" element={<></>} />

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
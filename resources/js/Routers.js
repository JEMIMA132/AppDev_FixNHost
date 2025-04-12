import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Headers/Header";
import Homepage from "./components/HomeContent/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />

        {/* Routes for navigation (no component rendering) */}
        <Route path="/services" element={<></>} />
        <Route path="/about" element={<></>} />
        <Route path="/contact" element={<></>} />
        <Route path="/privacy-policy" element={<></>} />
        <Route path="/terms-of-service" element={<></>} />
        <Route path="/faqs" element={<></>} />
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

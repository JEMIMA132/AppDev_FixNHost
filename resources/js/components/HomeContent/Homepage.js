import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header"; // Adjust the path based on your project structure

const Homepage = () => {
  const navigate = useNavigate();

  const handleBookWedding = () => {
    alert("Book Wedding Service clicked! Add your booking logic here.");
  };

  const handleBookRepair = () => {
    alert("Book Repair Service clicked! Add your booking logic here.");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <Header /> {/* Added Header component here */}
      <div className="homepage">
        <div className="hero-section">
          <h1 className="hero-title">Your One-Stop Wedding & Repair Services</h1>
          <p className="hero-subtitle">
            Celebrate your special day or fix what’s broken with ease.
          </p>
          <button className="login-button" onClick={handleLoginRedirect}>
            Go to Login
          </button>
        </div>

        <div className="services-section">
          <div className="service-card wedding-service">
            <h2>Wedding Services</h2>
            <p>
              Plan your dream wedding with our expert planners, decorators, and
              vendors. From venues to catering, we’ve got you covered.
            </p>
            <button className="book-button" onClick={handleBookWedding}>
              Book Wedding Service
            </button>
          </div>

          <div className="service-card repair-service">
            <h2>Repair Services</h2>
            <p>
              Need something fixed? Our skilled technicians handle everything from
              appliances to vehicles with precision and care.
            </p>
            <button className="book-button" onClick={handleBookRepair}>
              Book Repair Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
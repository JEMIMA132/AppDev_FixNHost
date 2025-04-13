import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Headers/Header"; // Adjust path if needed

const images = [
  "/images/event1.svg",
  "/images/event2.svg",
  "/images/event3.svg"
];

const Homepage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3s
    return () => clearInterval(interval);
  }, []);

  const handleBookService = () => {
    // Redirect to login page with intent to book a service
    navigate("/login", { state: { from: "book-service" } });
  };

  const handleBecomeVendor = () => {
    // Redirect to login page with intent to become a vendor
    navigate("/login", { state: { from: "become-vendor" } });
  };

  return (
    <>
      <Header />
      <div className="hero-full-slider">
        <img
          src={images[currentImage]}
          alt="Event or Repair"
          className="background-image"
        />
        <div className="hero-overlay">
          <h1>Your Go-To Platform for<br />Repairs & Events</h1>
          <p>
            Book trusted home repair experts or plan your perfect event — all in one place.
          </p>
          <div className="hero-buttons">
            <button onClick={handleBookService}>Book a Service</button>
            <button onClick={handleBecomeVendor}>Become a Vendor</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
  '/images/slide 1.svg',
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleBookService = () => {
    navigate('/login', { state: { from: 'book-service' } });
  };

  const handleBecomeVendor = () => {
    navigate('/login', { state: { from: 'become-vendor' } });
  };

  return (
    <section className="hero">
      <img
        src={images[currentImage]}
        alt="Hero Slide"
        className="hero__image"
      />
      <div className="hero__overlay">
        <h1>
          Your Go-To Platform for<br />Repairs & Events
        </h1>
        <p>
          Book trusted home repair experts or plan your perfect event — all in one place.
        </p>
        <div className="hero__buttons">
          <button onClick={handleBookService} className="hero__button">Book a Service</button>
          <button onClick={handleBecomeVendor} className="hero__button">Become a Vendor</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
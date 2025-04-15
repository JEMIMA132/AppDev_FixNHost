import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

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

  const handleBecomeVendor = () => {
    navigate('/become'); // Updated to navigate to /become
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
          Your Go-To Platform for<br /><span className="highlight-repairs">Repairs</span> & <span className="highlight-events">Events</span>
        </h1>
        <p>
          Book trusted home repair experts or plan your perfect event — all in one place.
        </p>
        <div className="hero__buttons">
          <button onClick={handleBecomeVendor} className="hero__button">
            <FaUserPlus style={{ marginRight: '8px' }} /> {/* Person icon for Become a Vendor */}
            Become a Vendor
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
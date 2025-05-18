import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();

  const handleBecomeVendor = () => {
    navigate('/become');
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__image-container">
          <img
            src="/images/fixserve.svg"
            alt="Fix Service Expert"
            className="hero__image"
          />
        </div>
        <div className="hero__text">
          <h2>
            Your Go-To Platform for<br />
            Repairs & Events
          </h2>
          <p>
            Connect with trusted home repair experts and event planners that match your specific needs and schedule. Whether you need urgent repairs or planning a special occasion, our platform makes finding the right professional quick, easy, and reliable — all in one place.
          </p>
          <div className="button-container">
            <button onClick={handleBecomeVendor} className="hero__button">
              <FaUserPlus /> Become a Vendor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
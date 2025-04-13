// OurMission.js
import React from 'react';
import { FaCheckCircle, FaAward, FaHeart, FaEye, FaRocket, FaUsers } from 'react-icons/fa'; // Added icons for Vision

const OurMission = () => {
  return (
    <>
      <section className="our-mission">
        <div className="our-mission__header">
          <h2>Our Mission</h2>
          <p>
            At FixNHost, we aim to create a seamless connection between customers and service providers, ensuring quality, reliability, and satisfaction in every interaction.
          </p>
        </div>
        <div className="our-mission__values">
          <div className="our-mission__value">
            <FaCheckCircle className="value-icon" />
            <h3>Quality</h3>
            <p>We carefully select and vet all service providers to ensure the highest standards of professionalism and expertise.</p>
          </div>
          <div className="our-mission__value">
            <FaAward className="value-icon" />
            <h3>Trust</h3>
            <p>We build trust through transparent reviews and ratings, empowering customers to make informed decisions.</p>
          </div>
          <div className="our-mission__value">
            <FaHeart className="value-icon" />
            <h3>Satisfaction</h3>
            <p>We’re committed to ensuring every customer has a positive and stress-free experience with FixNHost.</p>
          </div>
        </div>
      </section>

      <section className="our-mission our-vision"> {/* Reusing same class with modifier */}
        <div className="our-mission__header">
          <h2>Our Vision</h2>
          <p>
            To revolutionize the service industry by empowering communities with innovative, accessible, and trustworthy solutions for every need.
          </p>
        </div>
        <div className="our-mission__values">
          <div className="our-mission__value">
            <FaEye className="value-icon" />
            <h3>Innovation</h3>
            <p>We strive to pioneer cutting-edge solutions that redefine how services are accessed and delivered.</p>
          </div>
          <div className="our-mission__value">
            <FaRocket className="value-icon" />
            <h3>Accessibility</h3>
            <p>We envision a world where quality services are available to everyone, anytime, anywhere.</p>
          </div>
          <div className="our-mission__value">
            <FaUsers className="value-icon" />
            <h3>Community</h3>
            <p>We aim to foster strong, connected communities through reliable and inclusive service networks.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
// OurStory.js
import React from 'react';

const OurStory = () => {
  return (
    <section className="our-story">
      <div className="our-story__image">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Our Story"
        />
      </div>
      <div className="our-story__content">
        <h2>Our Story</h2>
        <p>
          Founded in 2025, FixNHost emerged from a vision to simplify life's challenges. Our founders, frustrated by the difficulty of finding dependable repair services and event planners, set out to create a platform that connects customers with trusted professionals. From fixing air conditioners to hosting unforgettable events, we aim to make every experience seamless and stress-free. Today, FixNHost is proud to serve thousands of customers, delivering quality and reliability with every service.
        </p>
      </div>
    </section>
  );
};

export default OurStory;
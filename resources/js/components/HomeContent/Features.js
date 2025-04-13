import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section className="features">
      <h2>Our Services</h2>
      <p>We offer a unique combination of professional appliance repair services and elegant wedding event hosting solutions.</p>
      <div className="features__cards">
        <div className="features__card">
          <h3>Food and Beverage Services</h3>
          <img src="/images/foods.svg" alt="Food and Beverage" className="features__image" />
          <Link to="/food-beverage" className="features__link">Learn more →</Link>
        </div>
        <div className="features__card">
          <h3>Event Planning & Coordination</h3>
          <img src="/images/events.svg" alt="Event Planning" className="features__image" />
          <Link to="/event-planning" className="features__link">Learn more →</Link>
        </div>
        <div className="features__card">
          <h3>Air Conditioning & Ventilation</h3>
          <img src="/images/airs.svg" alt="Air Conditioning" className="features__image" />
          <Link to="/ac-ventilation" className="features__link">Learn more →</Link>
        </div>
        <div className="features__card">
          <h3>Carpentry & Structural Repairs</h3>
          <img src="/images/carp.svg" alt="Carpentry" className="features__image" />
          <Link to="/carpentry-repairs" className="features__link">Learn more →</Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
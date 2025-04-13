// ServicesHero.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';


const ServicesHero = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="services-hero">
      <h2>Our Professional Services</h2>
      <p>Discover our comprehensive range of appliance repair and event hosting services tailored to your needs.</p>
      <div className="services-hero__search">
        <input
          type="text"
          placeholder="Search for services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch className="search-icon" />
        </button>
      </div>
    </section>
  );
};

export default ServicesHero;
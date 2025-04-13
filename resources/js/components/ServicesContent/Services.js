// Services.js
import React, { useState } from 'react';
import Header from '../Headers/Header'; // Adjust path based on your folder structure
import Footer from '../Footers/Footer'; // Adjust path based on your folder structure
import ServicesHero from '../ServicesContent/ServicesHero'; // Import the hero component
import TheServices from '../ServicesContent/TheServices'; // Import the services list component

const Services = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  return (
    <div className="services">
      <Header />
      <ServicesHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TheServices searchTerm={searchTerm} />
      <Footer />
    </div>
  );
};

export default Services;
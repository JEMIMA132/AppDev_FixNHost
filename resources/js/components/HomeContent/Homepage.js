import React from 'react';

import Header from '../Headers/Header'; // Adjust path if needed
import Hero from '../HomeContent/Hero'; // Adjust path based on your folder structure
import Features from '../HomeContent/Features'; // Adjust path if needed
import Primary from '../HomeContent/Primary'; // Adjust path if needed
import Footer from '../Footers/Footer'; // Adjust path if needed
const Homepage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Primary />
      <Footer />
    </>
  );
};

export default Homepage;
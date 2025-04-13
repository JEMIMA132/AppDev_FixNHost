// AboutUs.js
import React from 'react';
import Header from '../Headers/Header'; // Adjust path based on your folder structure
import Footer from '../Footers/Footer'; // Adjust path based on your folder structure
import AboutHero from '../Abouts/AboutHero'; // Import the AboutHero component
import OurStory from '../Abouts/OurStory';
import OurMission from '../Abouts/OurMission';
import OurLeader from '../Abouts/OurLeader'; // Import the OurLeader component

const AboutUs = () => {
  return (
    <div className="about-us">
      <Header />
      <main>
        <AboutHero />
        <OurStory />
        <OurMission />
        <OurLeader />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
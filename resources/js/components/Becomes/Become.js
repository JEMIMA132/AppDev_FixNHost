import React, { useState } from 'react';
import Header from '../Headers/Header';
import BecomeHero from '../Becomes/BecomeHero';
import BecomeMain from '../Becomes/BecomeMain';
import Footer from '../Footers/Footer';

const Become = () => {
  const [activeTab, setActiveTab] = useState('fix'); // Lifted state to parent

  return (
    <>
      <Header />
      <BecomeHero activeTab={activeTab} setActiveTab={setActiveTab} />
      <BecomeMain activeTab={activeTab} />
      <Footer />
    </>
  );
};

export default Become;
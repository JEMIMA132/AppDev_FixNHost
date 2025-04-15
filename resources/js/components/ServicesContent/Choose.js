import React from 'react';
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';
import ChooseMain from '../ServicesContent/ChooseMain';

const Choose = () => {
  return (
    <div className="choose" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <ChooseMain />
      <Footer />
    </div>
  );
};

export default Choose;
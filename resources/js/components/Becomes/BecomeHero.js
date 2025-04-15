import React from 'react';
import { FaTools, FaGlassCheers } from 'react-icons/fa';

const BecomeHero = ({ activeTab, setActiveTab }) => {
  return (
    <section className="become-hero">
      <h1>Become a Service Provider</h1>
      <p>
        Join our platform and connect with customers looking for your expertise.<br />
        Choose your specialty and start growing your business today.
      </p>
      <div className="become-hero__tabs">
        <button
          className={`tab-button ${activeTab === 'fix' ? 'active' : ''}`}
          onClick={() => setActiveTab('fix')}
        >
          <FaTools className="icon" /> Fix Service Provider
        </button>
        <button
          className={`tab-button ${activeTab === 'host' ? 'active' : ''}`}
          onClick={() => setActiveTab('host')}
        >
          <FaGlassCheers className="icon" /> Host Service Provider
        </button>
      </div>
    </section>
  );
};

export default BecomeHero;
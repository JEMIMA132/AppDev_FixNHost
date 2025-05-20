import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import VSidebar from './VSidebar';
import VHeader from './VHeader';

const VDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  return (
    <div className="vendor-dashboard">
      <VSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`vendor-dashboard__wrapper ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <VHeader toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <main className="vendor-dashboard__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VDashboard;

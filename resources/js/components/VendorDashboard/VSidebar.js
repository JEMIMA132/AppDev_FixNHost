import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wrench,
  CalendarCheck,
  Star, 
  Image,
  Receipt,
  BarChart2,
  MessageSquare,
  Settings,
  UserCog,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const VSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div className={`vendor-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="vendor-sidebar__nav">
        <div className="vendor-sidebar__logo">
          <img src="/images/logot.svg" alt="Vendor Logo" className="vendor-sidebar__logo-image" />
        </div>
        <ul className="vendor-sidebar__list">
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/dashboard" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <LayoutDashboard className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Dashboard</span>
            </Link>
          </li>
          <li className="vendor-sidebar__item">
            <div className="vendor-sidebar__link" onClick={toggleServicesDropdown}>
              <Wrench className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Services</span>
              {isServicesOpen ? (
                <ChevronDown className="vendor-sidebar__dropdown-icon" size={16} />
              ) : (
                <ChevronRight className="vendor-sidebar__dropdown-icon" size={16} />
              )}
            </div>
            {isServicesOpen && (
              <ul className="vendor-sidebar__dropdown">
                <li className="vendor-sidebar__dropdown-item">
                  <Link
                    to="/vendor-dashboard/services/list"
                    className="vendor-sidebar__link vendor-sidebar__link--dropdown"
                    onClick={handleLinkClick}
                  >
                    <Wrench className="vendor-sidebar__icon" size={14} />
                    <span className="vendor-sidebar__label">All Services</span>
                  </Link>
                </li>
                <li className="vendor-sidebar__dropdown-item">
                  <Link
                    to="/vendor-dashboard/services/add"
                    className="vendor-sidebar__link vendor-sidebar__link--dropdown"
                    onClick={handleLinkClick}
                  >
                    <Wrench className="vendor-sidebar__icon" size={14} />
                    <span className="vendor-sidebar__label">Add Service</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/bookings" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <CalendarCheck className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Booking Requests</span>
            </Link>
          </li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/reviews" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <Star className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Reviews</span>
            </Link>
          </li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/portfolio" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <Image className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Portfolio</span>
            </Link>
          </li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/transactions" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <Receipt className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Transactions</span>
            </Link>
          </li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/reports" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <BarChart2 className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Reports</span>
            </Link>
          </li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/messages" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <MessageSquare className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Messages</span>
            </Link>
          </li>
          <li className="vendor-sidebar__separator"></li>
          <li className="vendor-sidebar__item">
            <Link to="/vendor-dashboard/settings" className="vendor-sidebar__link" onClick={handleLinkClick}>
              <Settings className="vendor-sidebar__icon" size={16} />
              <span className="vendor-sidebar__label">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VSidebar;

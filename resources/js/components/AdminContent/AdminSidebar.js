import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users,
  User, 
  Store,
  CalendarCheck,
  Receipt, 
  Star, 
  BarChart,
  Headphones, 
  Settings,
  UserCog,
  ChevronDown,
  ChevronRight,
  Wrench,
  MicVocal,
  BarChart2
} from 'lucide-react';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVendorsOpen, setIsVendorsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleVendorsDropdown = () => {
    setIsVendorsOpen(!isVendorsOpen);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="admin-sidebar__nav">
        <div className="admin-sidebar__logo">
          <img src="/images/logot.svg" alt="Aeros Logo" className="admin-sidebar__logo-image" />
        </div>
        <ul className="admin-sidebar__list">
          <li className="admin-sidebar__item">
            <Link to="/admin-dashboard/dashboard" className="admin-sidebar__link" onClick={handleLinkClick}>
              <LayoutDashboard className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Dashboard</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <Link to="users" className="admin-sidebar__link" onClick={handleLinkClick}>
              <Users className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Users</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <Link to="customers" className="admin-sidebar__link" onClick={handleLinkClick}>
              <User className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Customers</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <div className="admin-sidebar__link" onClick={toggleVendorsDropdown}>
              <Store className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Vendors</span>
              {isVendorsOpen ? (
                <ChevronDown className="admin-sidebar__dropdown-icon" size={16} />
              ) : (
                <ChevronRight className="admin-sidebar__dropdown-icon" size={16} />
              )}
            </div>
            {isVendorsOpen && (
              <ul className="admin-sidebar__dropdown">
                <li className="admin-sidebar__dropdown-item">
                  <Link
                    to="vendors/fix-vendors"
                    className="admin-sidebar__link admin-sidebar__link--dropdown"
                    onClick={handleLinkClick}
                  >
                    <Wrench className="admin-sidebar__icon" size={14} />
                    <span className="admin-sidebar__label">Fix Vendors</span>
            </Link>
          </li>
                <li className="admin-sidebar__dropdown-item">
                  <Link
                    to="vendors/host-vendors"
                    className="admin-sidebar__link admin-sidebar__link--dropdown"
                    onClick={handleLinkClick}
                  >
                    <MicVocal className="admin-sidebar__icon" size={14} />
                    <span className="admin-sidebar__label">Host Vendors</span>
            </Link>
          </li>
              </ul>
            )}
          </li>
          <li className="admin-sidebar__item">
            <Link to="bookings" className="admin-sidebar__link" onClick={handleLinkClick}>
              <CalendarCheck className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Bookings</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <Link to="transaction" className="admin-sidebar__link" onClick={handleLinkClick}>
              <Receipt className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Transaction</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <Link to="reviews" className="admin-sidebar__link" onClick={handleLinkClick}>
              <Star className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Reviews</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <Link to="reports" className="admin-sidebar__link" onClick={handleLinkClick}>
              <BarChart2 className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Reports</span>
            </Link>
          </li>
          <li className="admin-sidebar__item">
            <Link to="live-chat" className="admin-sidebar__link" onClick={handleLinkClick}>
              <Headphones className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Live Support Chat</span>
            </Link>
          </li>
          <li className="admin-sidebar__separator"></li>
          <li className="admin-sidebar__item">
            <Link to="settings/admin" className="admin-sidebar__link" onClick={handleLinkClick}>
              <Settings className="admin-sidebar__icon" size={16} />
                    <span className="admin-sidebar__label">Admin Settings</span>
                  </Link>
                </li>
          <li className="admin-sidebar__item">
            <Link to="settings/account" className="admin-sidebar__link" onClick={handleLinkClick}>
              <UserCog className="admin-sidebar__icon" size={16} />
              <span className="admin-sidebar__label">Account Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
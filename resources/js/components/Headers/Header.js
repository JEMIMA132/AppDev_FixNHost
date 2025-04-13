import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaBell, FaEnvelope, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (loggedInStatus === 'true' && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="header__logo">
          <img src="/images/logo1.svg" alt="Logo" />
        </div>
      </div>
      <nav className={`header__nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/homepage" onClick={toggleMobileMenu}>HOME</Link></li>
          <li><Link to="/services" onClick={toggleMobileMenu}>SERVICES</Link></li>
          <li><Link to="/aboutus" onClick={toggleMobileMenu}>ABOUT US</Link></li>
          <li><Link to="/contactus" onClick={toggleMobileMenu}>CONTACT US</Link></li>
          <li className="dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              SUPPORT
              <img
                src="/images/arrows.svg"
                alt="Dropdown Arrow"
                className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
              />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/privacy-policy" onClick={toggleMobileMenu}>PRIVACY POLICY</Link>
                <Link to="/terms-of-services" onClick={toggleMobileMenu}>TERMS OF SERVICES</Link>
                <Link to="/faqs" onClick={toggleMobileMenu}>FAQS</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="header__auth">
        {isLoggedIn ? (
          <div className="header__auth-profile">
            <Link to="/notifications" className="header__icon">
              <FaBell />
            </Link>
            <Link to="/messages" className="header__icon">
              <FaEnvelope />
            </Link>
            <img
              src={user.profilePicture || '/images/electrician.svg'}
              alt="Profile"
              className="profile-picture"
            />
            <div className="profile-dropdown">
              <div className="profile-dropdown-toggle" onClick={toggleProfileDropdown}>
                <span className="username">{`${user.firstName} ${user.lastName}`}</span>
                <FaChevronDown className={`profile-dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`} />
              </div>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <Link to="/profile" className="profile-dropdown-item" onClick={toggleProfileDropdown}>
                    <FaUser className="profile-dropdown-icon" />
                    Profile
                  </Link>
                  <Link to="/settings" className="profile-dropdown-item" onClick={toggleProfileDropdown}>
                    <FaCog className="profile-dropdown-icon" />
                    Settings
                  </Link>
                  <div className="profile-dropdown-separator"></div>
                  <button onClick={handleLogout} className="profile-dropdown-item">
                    <FaSignOutAlt className="profile-dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login" className="auth-button">LOGIN/REGISTER</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
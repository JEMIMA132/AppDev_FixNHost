import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Settings, LogOut, Bell, MessageSquare } from 'lucide-react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
          {isMobileMenuOpen ? <X /> : <Menu />}
        </div>
        <div className="header__logo">
          <img src="/images/logot.svg" alt="HostFix Logo" />
        </div>
      </div>
      <nav className={`header__nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/homepage" onClick={toggleMobileMenu}>Home</Link></li>
          <li><Link to="/services" onClick={toggleMobileMenu}>Services</Link></li>
          <li><Link to="/aboutus" onClick={toggleMobileMenu}>About Us</Link></li>
          <li><Link to="/contactus" onClick={toggleMobileMenu}>Contact Us</Link></li>
          <li className="dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              Support
              <ChevronDown className={isDropdownOpen ? 'open' : ''} />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/privacy-policy" onClick={toggleMobileMenu}>Privacy Policy</Link>
                <Link to="/terms-of-services" onClick={toggleMobileMenu}>Terms of Services</Link>
                <Link to="/faqs" onClick={toggleMobileMenu}>FAQs</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="header__auth">
        {isLoggedIn ? (
          <div className="header__auth-profile">
            <Link to="/notifications" className="header__icon">
              <Bell />
            </Link>
            <Link to="/messages" className="header__icon">
              <MessageSquare />
            </Link>
            <img
              src={user.profilePicture || '/images/electrician.svg'}
              alt="Profile"
              className="profile-picture"
            />
            <div className="profile-dropdown">
              <div className="profile-dropdown-toggle" onClick={toggleProfileDropdown}>
                <span className="username">{`${user.firstName} ${user.lastName}`}</span>
                <ChevronDown className={`profile-dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`} />
              </div>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <Link to="/profile" className="profile-dropdown-item" onClick={toggleProfileDropdown}>
                    <User className="profile-dropdown-icon" />
                    Profile
                  </Link>
                  <Link to="/settings" className="profile-dropdown-item" onClick={toggleProfileDropdown}>
                    <Settings className="profile-dropdown-icon" />
                    Settings
                  </Link>
                  <div className="profile-dropdown-separator"></div>
                  <button onClick={handleLogout} className="profile-dropdown-item">
                    <LogOut className="profile-dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
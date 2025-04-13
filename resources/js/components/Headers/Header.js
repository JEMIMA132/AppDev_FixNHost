import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        <Link to="/login" className="auth-button">LOGIN/REGISTER</Link>
      </div>
    </header>
  );
};

export default Header;
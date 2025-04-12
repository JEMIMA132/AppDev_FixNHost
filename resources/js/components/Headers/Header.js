import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMessagesClick = () => {
    alert("No messages at the moment.");
  };

  const handleNotificationsClick = () => {
    alert("No notifications at the moment.");
  };

  return (
    <header className="Header">
      <div className="Header__logo">
        <NavLink to="/">
          <img
            src="/images/fixnhostlogo.svg"
            alt="FixNHost Logo"
            className="Header__logo-img"
          />
        </NavLink>
      </div>

      <nav className="Header__nav">
        <NavLink to="/homepage" className="Header__link">
          Home
        </NavLink>
        <NavLink to="/services" className="Header__link">
          Services
        </NavLink>
        <NavLink to="/about" className="Header__link">
          About Us
        </NavLink>
        <NavLink to="/contact" className="Header__link">
          Contact Us
        </NavLink>
        <div className="Header__dropdown">
          <button onClick={toggleDropdown} className="Header__dropdown-toggle">
            Support <RiArrowDropDownLine className="Header__dropdown-icon" />
          </button>
          {isDropdownOpen && (
            <div className="Header__dropdown-menu">
              <NavLink
                to="/privacy-policy"
                className="Header__dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms-of-service"
                className="Header__dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/faqs"
                className="Header__dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                FAQs
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="Header__actions">
        <NavLink to="#" onClick={handleMessagesClick}>
          <img src="/images/messages.svg" alt="Messages" className="Header__icon" />
        </NavLink>
        <NavLink to="#" onClick={handleNotificationsClick}>
          <img src="/images/notif.svg" alt="Notifications" className="Header__icon" />
        </NavLink>
        <NavLink to="/login" className="Header__login-btn">
          LOGIN
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
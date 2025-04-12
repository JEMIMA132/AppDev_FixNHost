import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMessagesDropdown = () => {
    setIsMessagesOpen((prev) => !prev);
    setIsNotificationsOpen(false);
  };

  const toggleNotificationsDropdown = () => {
    setIsNotificationsOpen((prev) => !prev);
    setIsMessagesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMessagesOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

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

      <nav className="Header__nav" ref={dropdownRef}>
        <NavLink 
          to="/homepage" 
          className={({ isActive }) => `Header__link${isActive ? " active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/services" 
          className={({ isActive }) => `Header__link${isActive ? " active" : ""}`}
        >
          Services
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `Header__link${isActive ? " active" : ""}`}
        >
          About Us
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => `Header__link${isActive ? " active" : ""}`}
        >
          Contact Us
        </NavLink>

        {/* Support Dropdown */}
        <div className="Header__dropdown-wrapper">
          <button 
            onClick={toggleDropdown}
            className={`Header__link ${isDropdownOpen ? "active" : ""}`}
          >
            Support <RiArrowDropDownLine className="Header__dropdown-icon" />
          </button>

          {isDropdownOpen && (
            <div className="Header__dropdown-menu">
              <NavLink
                to="/privacy-policy"
                className={({ isActive }) => `Header__dropdown-item${isActive ? " active" : ""}`}
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms-of-service"
                className={({ isActive }) => `Header__dropdown-item${isActive ? " active" : ""}`}
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/faqs"
                className={({ isActive }) => `Header__dropdown-item${isActive ? " active" : ""}`}
              >
                FAQs
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="Header__actions">
        {/* Messages Icon and Dropdown */}
        <div className="Header__icon-wrapper" onClick={toggleMessagesDropdown}>
          <img
            src="/images/messages.svg"
            alt="Messages"
            className="Header__icon"
          />
          {isMessagesOpen && (
            <div className="Header__dropdown-menu">
              <div className="Header__dropdown-item">No messages received</div>
            </div>
          )}
        </div>

        {/* Notifications Icon and Dropdown */}
        <div className="Header__icon-wrapper" onClick={toggleNotificationsDropdown}>
          <img
            src="/images/notif.svg"
            alt="Notifications"
            className="Header__icon"
          />
          {isNotificationsOpen && (
            <div className="Header__dropdown-menu">
              <div className="Header__dropdown-item">No notifications today</div>
            </div>
          )}
        </div>

        <NavLink to="/login" className="Header__login-btn">
          LOGIN
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

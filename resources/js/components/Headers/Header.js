import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSupportBold, setIsSupportBold] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false); // State for Messages dropdown
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for Notifications dropdown
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSupportClick = () => {
    setIsSupportBold((prev) => !prev); // Toggle bold state for Support
    toggleDropdown(); // Also toggle the support dropdown
  };

  const toggleMessagesDropdown = () => {
    setIsMessagesOpen((prev) => !prev); // Toggle messages dropdown visibility
    setIsNotificationsOpen(false); // Close notifications dropdown if it's open
  };

  const toggleNotificationsDropdown = () => {
    setIsNotificationsOpen((prev) => !prev); // Toggle notifications dropdown visibility
    setIsMessagesOpen(false); // Close messages dropdown if it's open
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsMessagesOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Support Dropdown */}
        <div className="Header__dropdown-wrapper" onClick={handleSupportClick}>
          <NavLink 
            to="#" 
            className={`Header__link ${isSupportBold ? "active" : ""}`} // Bold if clicked
          >
            Support <RiArrowDropDownLine className="Header__dropdown-icon" />
          </NavLink>

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

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo on the left */}
      <div className="flex-shrink-0">
        <NavLink to="/">
          <img
            src="/images/fixnhostlogo.svg" // Path relative to public folder
            alt="FixNHost Logo"
            className="h-10 w-auto"
          />
        </NavLink>
      </div>

      {/* Centered Navigation Links */}
      <nav className="flex-1 flex justify-center space-x-8">
        <NavLink
          to="/homepage" // Matches your routing
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition-colors ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition-colors ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition-colors ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition-colors ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Contact Us
        </NavLink>

        {/* Support Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
          >
            Support
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <NavLink
                to="/privacy-policy"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms-of-service"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/faqs"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                FAQs
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Login Button on the right */}
      <div className="flex-shrink-0">
        <NavLink
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
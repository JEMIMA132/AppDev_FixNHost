import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa'; // Import Font Awesome icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section footer__brand">
          <img src="/images/logo2.svg" alt="FixNHost Logo" className="footer__logo" />
          <p>Your one-stop solution for appliance repairs and elegant event hosting services.</p>
          <div className="footer__social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="footer__social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer__social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="footer__social-icon" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="footer__social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="footer__social-icon" />
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Fix Services</h3>
          <ul>
            <li><Link to="/ac-repair">AC Repair</Link></li>
            <li><Link to="/appliance-repair">Appliance Repair</Link></li>
            <li><Link to="/plumbing-services">Plumbing Services</Link></li>
            <li><Link to="/emergency-services">Emergency Services</Link></li>
            <li><Link to="/maintenance-plans">Maintenance Plans</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Host Services</h3>
          <ul>
            <li><Link to="/wedding-venues">Wedding Venues</Link></li>
            <li><Link to="/event-planning">Event Planning</Link></li>
            <li><Link to="/catering-services">Catering Services</Link></li>
            <li><Link to="/corporate-events">Corporate Events</Link></li>
            <li><Link to="/special-packages">Special Packages</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 FixNHost. All rights reserved.</p>
        <div className="footer__bottom-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
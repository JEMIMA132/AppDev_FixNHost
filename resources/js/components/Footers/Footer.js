import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__left">
          <div className="footer__logo">
            <img src="/images/fixnhostlogo (1).svg" alt="FixNHost Logo" />
          </div>
          <div className="footer__contact">
            <div className="footer__contact-item">
              <i className="fas fa-map-marker-alt"></i>
              21 AC Aquino Avenue, Street
            </div>
            <div className="footer__contact-item">
              <i className="fas fa-phone"></i>
              +639506149789
            </div>
            <div className="footer__contact-item">
              <i className="fas fa-envelope"></i>
              FixnHost@Gmail.Com
            </div>
          </div>
        </div>
        
        <div className="footer__right">
          <div className="footer__links">
            <div><a href="/privacy-policy">Privacy Policy</a></div>
            <div><a href="/terms-of-service">Terms Of Service</a></div>
            <div><a href="/faqs">FAQs</a></div>
          </div>
          <div className="footer__social">
            <span>Follow Us</span>
            <div className="footer__social-icons">
              <a href="#" className="social-icon">
                <img src="/images/fb.svg" alt="Facebook" />
              </a>
              <a href="#" className="social-icon">
                <img src="/images/int.svg" alt="Instagram" />
              </a>
              <a href="#" className="social-icon">
                <img src="/images/twitt.svg" alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>©2025 FixNHost. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

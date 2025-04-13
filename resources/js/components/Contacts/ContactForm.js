import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactForm = () => {
  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p className="subtitle">Get in touch for appliance repairs or to discuss your event hosting needs</p>
      
      <div className="contact-content">
        <div className="form-section">
          <h2>Send Us a Message</h2>
          
          <div className="radio-group">
            <label>
              <input type="radio" name="interest" value="repair" defaultChecked />
              <span>Repair Services</span>
            </label>
            <label>
              <input type="radio" name="interest" value="event" />
              <span>Event Hosting</span>
            </label>
            <label>
              <input type="radio" name="interest" value="both" />
              <span>Both Services</span>
            </label>
          </div>

          <div className="form-inputs">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="your@email.com" />
            <input type="tel" placeholder="Your Phone Number" />
            <textarea placeholder="Tell us about your needs..."></textarea>
          </div>

          <button className="send-button">Send Message</button>
        </div>

        <div className="info-section">
          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h3>Our Location</h3>
              <p>1234 Repair Avenue</p>
              <p>Event City, ST 56789</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <div>
              <h3>Phone Numbers</h3>
              <p>Repairs: (555) 123-4567</p>
              <p>Events: (555) 987-6543</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <h3>Email Us</h3>
              <p>Repairs: repairs@fixnhost.com</p>
              <p>Events: events@fixnhost.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaClock className="icon" />
            <div>
              <h3>Business Hours</h3>
              <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed (Events ONLY)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
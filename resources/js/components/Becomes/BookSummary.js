// BookSummary.js
import React from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaFileAlt 
} from 'react-icons/fa'; // Import React Icons


const BookSummary = ({ bookingData, vendorData, onConfirm, onClose }) => {
  const { fullName, email, phone, address, serviceDate, preferredTime, description } = bookingData;
  const { serviceName, vendorName, price } = vendorData;

  return (
    <div className="book-summary__overlay">
      <div className="book-summary__content">
        <div className="book-summary__header">
          <h3>Booking Summary</h3>
          <button className="book-summary__close" onClick={onClose}>✕</button>
        </div>
        <div className="book-summary__section">
          <div className="book-summary__item">
            <FaUser className="book-summary__icon" />
            <span>{fullName}</span>
          </div>
          <div className="book-summary__item">
            <FaEnvelope className="book-summary__icon" />
            <span>{email}</span>
          </div>
          <div className="book-summary__item">
            <FaPhone className="book-summary__icon" />
            <span>{phone}</span>
          </div>
          <div className="book-summary__item">
            <FaMapMarkerAlt className="book-summary__icon" />
            <span>{address}</span>
          </div>
          <div className="book-summary__row">
            <div className="book-summary__item">
              <FaCalendarAlt className="book-summary__icon" />
              <span>Date: {serviceDate}</span>
            </div>
            <div className="book-summary__item">
              <FaClock className="book-summary__icon" />
              <span>Time: {preferredTime}</span>
            </div>
          </div>
          <div className="book-summary__item">
            <FaFileAlt className="book-summary__icon" />
            <span>{description}</span>
          </div>
        </div>
        <div className="book-summary__section book-summary__service-details">
          <h4>Service Details</h4>
          <p><strong>Service:</strong> {serviceName}</p>
          <p><strong>Vendor:</strong> {vendorName}</p>
          <p><strong>Price:</strong> {price}</p>
        </div>
        <button className="book-summary__confirm-button" onClick={onConfirm}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookSummary;
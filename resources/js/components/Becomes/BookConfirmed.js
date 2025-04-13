// BookConfirmed.js
import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Import React Icon for checkmark

const BookConfirmed = ({ onBookAnother }) => {
  return (
    <div className="book-confirmed__overlay">
      <div className="book-confirmed__content">
        <div className="book-confirmed__icon-wrapper">
          <FaCheck className="book-confirmed__icon" />
        </div>
        <h3>Booking Confirmed!</h3>
        <p>Thank you for your booking. We've sent the details to your email.</p>
        <button className="book-confirmed__button" onClick={onBookAnother}>
          Book Another Service
        </button>
      </div>
    </div>
  );
};

export default BookConfirmed;
// BookPop.js
import React from 'react';


const BookPop = ({ serviceName, onConfirm, onCancel }) => {
  return (
    <div className="book-pop__overlay">
      <div className="book-pop__content">
        <h3>Continue the booking?</h3>
        <p>You are about to book a {serviceName} service. Would you like to continue?</p>
        <div className="book-pop__buttons">
          <button className="book-pop__button book-pop__button--cancel" onClick={onCancel}>
            No
          </button>
          <button className="book-pop__button book-pop__button--confirm" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPop;
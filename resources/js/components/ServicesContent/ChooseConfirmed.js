import React from 'react';
import { FaCheck } from 'react-icons/fa';

const ChooseConfirmed = ({ onChooseAnother }) => {
  return (
    <div className="choose-confirmed__overlay">
      <div className="choose-confirmed__content">
        <div className="choose-confirmed__icon-wrapper">
          <FaCheck className="choose-confirmed__icon" />
        </div>
        <h3>Choice Confirmed!</h3>
        <p>Thank you for your selection. We've sent the details to your email.</p>
        <button className="choose-confirmed__button" onClick={onChooseAnother}>
          Choose Another Option
        </button>
      </div>
    </div>
  );
};

export default ChooseConfirmed;
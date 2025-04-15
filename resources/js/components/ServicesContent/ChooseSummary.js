import React from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaFileAlt 
} from 'react-icons/fa';

const ChooseSummary = ({ planningData, eventData, onConfirm, onClose }) => {
  const { fullName, email, phone, eventLocation, eventDate, eventTime, details } = planningData;
  const { eventName, venueName, cost } = eventData;

  return (
    <div className="choose-summary__overlay">
      <div className="choose-summary__content">
        <div className="choose-summary__header">
          <h3>Planning Summary</h3>
          <button className="choose-summary__close" onClick={onClose}>✕</button>
        </div>
        <div className="choose-summary__section">
          <div className="choose-summary__item">
            <FaUser className="choose-summary__icon" />
            <span>{fullName}</span>
          </div>
          <div className="choose-summary__item">
            <FaEnvelope className="choose-summary__icon" />
            <span>{email}</span>
          </div>
          <div className="choose-summary__item">
            <FaPhone className="choose-summary__icon" />
            <span>{phone}</span>
          </div>
          <div className="choose-summary__item">
            <FaMapMarkerAlt className="choose-summary__icon" />
            <span>{eventLocation}</span>
          </div>
          <div className="choose-summary__row">
            <div className="choose-summary__item">
              <FaCalendarAlt className="choose-summary__icon" />
              <span>Date: {eventDate}</span>
            </div>
            <div className="choose-summary__item">
              <FaClock className="choose-summary__icon" />
              <span>Time: {eventTime}</span>
            </div>
          </div>
          <div className="choose-summary__item">
            <FaFileAlt className="choose-summary__icon" />
            <span>{details}</span>
          </div>
        </div>
        <div className="choose-summary__section choose-summary__event-details">
          <h4>Event Details</h4>
          <p><strong>Event:</strong> {eventName}</p>
          <p><strong>Venue:</strong> {venueName}</p>
          <p><strong>Cost:</strong> {cost}</p>
        </div>
        <button className="choose-summary__confirm-button" onClick={onConfirm}>
          Confirm Planning
        </button>
      </div>
    </div>
  );
};

export default ChooseSummary;
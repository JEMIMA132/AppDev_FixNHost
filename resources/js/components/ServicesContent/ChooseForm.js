import React, { useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const ChooseForm = ({ eventName, venueName, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventLocation: '',
    eventDate: '',
    eventTime: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="choose-form__overlay">
      <div className="choose-form__content">
        <div className="choose-form__header">
          <h3>Plan {eventName} at {venueName}</h3>
          <button className="choose-form__close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="choose-form__form">
          <div className="choose-form__form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          <div className="choose-form__form-row">
            <div className="choose-form__form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="choose-form__form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>
          </div>
          <div className="choose-form__form-group">
            <label>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              placeholder="123 Main St, City, State, ZIP"
              required
            />
          </div>
          <div className="choose-form__form-row">
            <div className="choose-form__form-group">
              <label>Event Date</label>
              <div className="choose-form__input-wrapper">
                <FaCalendarAlt className="choose-form__icon" />
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="choose-form__form-group">
              <label>Event Time</label>
              <div className="choose-form__input-wrapper">
                <FaClock className="choose-form__icon" />
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="choose-form__form-group">
            <label>Event Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Please describe your event requirements..."
              rows="4"
              required
            />
          </div>
          <button type="submit" className="choose-form__submit-button">
            Submit Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChooseForm;
// BookSelect.js
import React, { useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa'; // Import React Icons for date and time


const BookSelect = ({ vendorName, serviceName, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    serviceDate: '',
    preferredTime: '',
    description: '',
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
    <div className="book-select__overlay">
      <div className="book-select__content">
        <div className="book-select__header">
          <h3>Book {vendorName} - {serviceName}</h3>
          <button className="book-select__close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="book-select__form">
          <div className="book-select__form-group">
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
          <div className="book-select__form-row">
            <div className="book-select__form-group">
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
            <div className="book-select__form-group">
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
          <div className="book-select__form-group">
            <label>Service Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, State, ZIP"
              required
            />
          </div>
          <div className="book-select__form-row">
            <div className="book-select__form-group">
              <label>Service Date</label>
              <div className="book-select__input-wrapper">
                <FaCalendarAlt className="book-select__icon" />
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="book-select__form-group">
              <label>Preferred Time</label>
              <div className="book-select__input-wrapper">
                <FaClock className="book-select__icon" />
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="book-select__form-group">
            <label>Service Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please describe what service you need..."
              rows="4"
              required
            />
          </div>
          <button type="submit" className="book-select__submit-button">
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookSelect;
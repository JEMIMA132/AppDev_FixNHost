/* Inserting a new BookingsModal component (similar to CustomerModal) for view/edit booking details */

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const BookingsModal = ({ isOpen, onClose, onBookingUpdated, editMode = false, bookingData = null }) => {
  const initialFormData = {
    bookingId: '',
    clientName: '',
    vendorName: '',
    vendorType: '',
    serviceType: '',
    eventDate: '',
    bookingStatus: 'pending',
    paymentMethod: '',
    paymentStatus: 'pending',
    dateBooked: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (bookingData) {
        setFormData({
          ...bookingData,
          eventDate: bookingData.eventDate || new Date().toISOString().split('T')[0],
          dateBooked: bookingData.dateBooked || new Date().toISOString().split('T')[0]
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, bookingData]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      // In view mode, do nothing (or you can close the modal)
      onClose();
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const endpoint = editMode ? `/api/bookings/${bookingData.id}` : '/api/bookings';
      const method = editMode ? 'put' : 'post';
      const response = await axios[method](endpoint, formData);
      setSuccessMessage(editMode ? 'Booking updated successfully!' : 'Booking added successfully!');
      onBookingUpdated(response.data, editMode);
      setTimeout(() => { onClose(); }, 1000);
    } catch (err) {
      console.error(`Failed to ${editMode ? 'update' : 'add'} booking:`, err.response?.data);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: `Failed to ${editMode ? 'update' : 'add'} booking. Please try again.` });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bookings-modal__overlay">
      <div className="bookings-modal">
        <div className="bookings-modal__header">
          <h2>{editMode ? (bookingData ? 'Edit Booking' : 'Add New Booking') : 'View Booking'}</h2>
          <button className="bookings-modal__close-button" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="bookings-modal__form">
          {errors.general && <div className="bookings-modal__error">{errors.general}</div>}
          <div className="bookings-modal__field-row">
            <div className="bookings-modal__field">
              <label htmlFor="bookingId">Booking ID</label>
              <input type="text" id="bookingId" name="bookingId" value={formData.bookingId} onChange={handleChange} readOnly />
            </div>
          </div>
          <div className="bookings-modal__field-row">
            <div className="bookings-modal__field">
              <label htmlFor="clientName">Client Name</label>
              <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.clientName ? 'is-invalid' : ''} />
              {errors.clientName && <div className="bookings-modal__error">{errors.clientName[0]}</div>}
            </div>
            <div className="bookings-modal__field">
              <label htmlFor="vendorName">Vendor Name</label>
              <input type="text" id="vendorName" name="vendorName" value={formData.vendorName} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.vendorName ? 'is-invalid' : ''} />
              {errors.vendorName && <div className="bookings-modal__error">{errors.vendorName[0]}</div>}
            </div>
          </div>
          <div className="bookings-modal__field-row">
            <div className="bookings-modal__field">
              <label htmlFor="vendorType">Vendor Type</label>
              <input type="text" id="vendorType" name="vendorType" value={formData.vendorType} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.vendorType ? 'is-invalid' : ''} />
              {errors.vendorType && <div className="bookings-modal__error">{errors.vendorType[0]}</div>}
            </div>
            <div className="bookings-modal__field">
              <label htmlFor="serviceType">Service Type</label>
              <input type="text" id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.serviceType ? 'is-invalid' : ''} />
              {errors.serviceType && <div className="bookings-modal__error">{errors.serviceType[0]}</div>}
            </div>
          </div>
          <div className="bookings-modal__field-row">
            <div className="bookings-modal__field">
              <label htmlFor="eventDate">Event/Service Date</label>
              <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.eventDate ? 'is-invalid' : ''} />
              {errors.eventDate && <div className="bookings-modal__error">{errors.eventDate[0]}</div>}
            </div>
            <div className="bookings-modal__field">
              <label htmlFor="bookingStatus">Booking Status</label>
              <select id="bookingStatus" name="bookingStatus" value={formData.bookingStatus} onChange={handleChange} disabled={!editMode} className={errors.bookingStatus ? 'is-invalid' : ''}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              {errors.bookingStatus && <div className="bookings-modal__error">{errors.bookingStatus[0]}</div>}
            </div>
          </div>
          <div className="bookings-modal__field-row">
            <div className="bookings-modal__field">
              <label htmlFor="paymentMethod">Payment Method</label>
              <input type="text" id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.paymentMethod ? 'is-invalid' : ''} />
              {errors.paymentMethod && <div className="bookings-modal__error">{errors.paymentMethod[0]}</div>}
            </div>
            <div className="bookings-modal__field">
              <label htmlFor="paymentStatus">Payment Status</label>
              <select id="paymentStatus" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} disabled={!editMode} className={errors.paymentStatus ? 'is-invalid' : ''}>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
              {errors.paymentStatus && <div className="bookings-modal__error">{errors.paymentStatus[0]}</div>}
            </div>
          </div>
          <div className="bookings-modal__field-row">
            <div className="bookings-modal__field">
              <label htmlFor="dateBooked">Date Booked</label>
              <input type="date" id="dateBooked" name="dateBooked" value={formData.dateBooked} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.dateBooked ? 'is-invalid' : ''} />
              {errors.dateBooked && <div className="bookings-modal__error">{errors.dateBooked[0]}</div>}
            </div>
          </div>
          <div className="bookings-modal__actions">
            <button type="button" className="bookings-modal__button bookings-modal__button--secondary" onClick={onClose} disabled={loading}>Cancel</button>
            {editMode ? (
              <button type="submit" className="bookings-modal__button bookings-modal__button--primary" disabled={loading}>{loading ? 'Updating...' : 'Update Booking'}</button>
            ) : (
              <button type="submit" className="bookings-modal__button bookings-modal__button--primary" disabled={loading}>Close</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingsModal;

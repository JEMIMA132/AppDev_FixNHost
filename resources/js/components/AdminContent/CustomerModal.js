import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const CustomerModal = ({ isOpen, onClose, onCustomerAdded, editMode = false, customerData = null }) => {
  const initialFormData = {
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    phone: '',
    gender: '',
    email: '',
    status: 'Active',
    date_created: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editMode && customerData) {
        setFormData({
          ...customerData,
          date_created: customerData.date_created || new Date().toISOString().split('T')[0]
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, editMode, customerData]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const endpoint = editMode ? `/api/customers/${customerData.id}` : '/api/customers';
      const method = editMode ? 'put' : 'post';
      
      const response = await axios[method](endpoint, formData);
      setSuccessMessage(editMode ? 'Customer updated successfully!' : 'Customer added successfully!');
      onCustomerAdded(response.data, editMode);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error(`Failed to ${editMode ? 'update' : 'add'} customer:`, err.response?.data);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: `Failed to ${editMode ? 'update' : 'add'} customer. Please try again.` });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="customer-modal__overlay">
      <div className="customer-modal">
        <div className="customer-modal__header">
          <h2>{editMode ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button className="customer-modal__close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="customer-modal__form">
          {errors.general && (
            <div className="customer-modal__error">{errors.general}</div>
          )}

          <div className="customer-modal__field-row">
            <div className="customer-modal__field">
              <label htmlFor="first_name">First Name *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className={errors.first_name ? 'is-invalid' : ''}
              />
              {errors.first_name && (
                <div className="customer-modal__error">{errors.first_name[0]}</div>
              )}
            </div>

            <div className="customer-modal__field">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="customer-modal__field-row">
            <div className="customer-modal__field">
              <label htmlFor="last_name">Last Name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className={errors.last_name ? 'is-invalid' : ''}
              />
              {errors.last_name && (
                <div className="customer-modal__error">{errors.last_name[0]}</div>
              )}
            </div>

            <div className="customer-modal__field">
              <label htmlFor="suffix">Suffix</label>
              <input
                type="text"
                id="suffix"
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="customer-modal__field-row">
            <div className="customer-modal__field">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={errors.phone ? 'is-invalid' : ''}
              />
              {errors.phone && (
                <div className="customer-modal__error">{errors.phone[0]}</div>
              )}
            </div>

            <div className="customer-modal__field">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={errors.email ? 'is-invalid' : ''}
              />
              {errors.email && (
                <div className="customer-modal__error">{errors.email[0]}</div>
              )}
            </div>
          </div>

          <div className="customer-modal__field-row">
            <div className="customer-modal__field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'is-invalid' : ''}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="customer-modal__field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="customer-modal__actions">
            <button
              type="button"
              className="customer-modal__button customer-modal__button--secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="customer-modal__button customer-modal__button--primary"
              disabled={loading}
            >
              {loading ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Customer' : 'Add Customer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const FixModal = ({ isOpen, onClose, onVendorAdded, editMode = false, vendorData = null }) => {
  const initialFormData = {
    name: '',
    phone: '',
    gender: '',
    serviceOffered: '',
    status: 'Active',
    dateCreated: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editMode && vendorData) {
        setFormData({
          ...vendorData,
          dateCreated: vendorData.dateCreated || new Date().toISOString().split('T')[0]
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, editMode, vendorData]);

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
      const endpoint = editMode ? `/api/fix-vendors/${vendorData.id}` : '/api/fix-vendors';
      const method = editMode ? 'put' : 'post';
      
      const response = await axios[method](endpoint, formData);
      setSuccessMessage(editMode ? 'Vendor updated successfully!' : 'Vendor added successfully!');
      onVendorAdded(response.data, editMode);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error(`Failed to ${editMode ? 'update' : 'add'} vendor:`, err.response?.data);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: `Failed to ${editMode ? 'update' : 'add'} vendor. Please try again.` });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fix-modal__overlay">
      <div className="fix-modal">
        <div className="fix-modal__header">
          <h2>{editMode ? 'Edit Fix Vendor' : 'Add New Fix Vendor'}</h2>
          <button className="fix-modal__close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="fix-modal__form">
          {errors.general && (
            <div className="fix-modal__error">{errors.general}</div>
          )}

          <div className="fix-modal__field-row">
            <div className="fix-modal__field">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && (
                <div className="fix-modal__error">{errors.name[0]}</div>
              )}
            </div>

            <div className="fix-modal__field">
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
                <div className="fix-modal__error">{errors.phone[0]}</div>
              )}
            </div>
          </div>

          <div className="fix-modal__field-row">
            <div className="fix-modal__field">
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

            <div className="fix-modal__field">
              <label htmlFor="serviceOffered">Service Offered *</label>
              <select
                id="serviceOffered"
                name="serviceOffered"
                value={formData.serviceOffered}
                onChange={handleChange}
                required
                className={errors.serviceOffered ? 'is-invalid' : ''}
              >
                <option value="">Select Service</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Painting">Painting</option>
                <option value="Cleaning">Cleaning</option>
                <option value="HVAC">HVAC</option>
                <option value="Landscaping">Landscaping</option>
                <option value="Other">Other</option>
              </select>
              {errors.serviceOffered && (
                <div className="fix-modal__error">{errors.serviceOffered[0]}</div>
              )}
            </div>
          </div>

          <div className="fix-modal__field-row">
            <div className="fix-modal__field">
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

          <div className="fix-modal__actions">
            <button
              type="button"
              className="fix-modal__button fix-modal__button--secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="fix-modal__button fix-modal__button--primary"
              disabled={loading}
            >
              {loading ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Vendor' : 'Add Vendor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FixModal;



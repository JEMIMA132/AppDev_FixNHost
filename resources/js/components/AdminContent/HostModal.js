import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const HostModal = ({ isOpen, onClose, onVendorAdded, editMode = false, vendorData = null, availableServiceTypes = [] }) => {
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = ['Name is required'];
    if (!formData.phone.trim()) newErrors.phone = ['Phone is required'];
    if (!formData.serviceOffered.trim()) newErrors.serviceOffered = ['Service Offered is required'];
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    // Local add/edit logic
    if (editMode) {
      onVendorAdded(formData, true);
      setSuccessMessage('Vendor updated successfully!');
    } else {
      const newVendor = {
        ...formData,
        id: Date.now(),
        dateCreated: new Date().toISOString().split('T')[0],
      };
      onVendorAdded(newVendor, false);
      setSuccessMessage('Vendor added successfully!');
    }
    setTimeout(() => {
      setLoading(false);
      onClose();
      setSuccessMessage('');
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="host-modal__overlay">
      <div className="host-modal">
        <div className="host-modal__header">
          <h2>{editMode ? 'Edit Host Vendor' : 'Add New Host Vendor'}</h2>
          <button className="host-modal__close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="host-modal__form">
          {errors.general && (
            <div className="host-modal__error">{errors.general}</div>
          )}

          <div className="host-modal__field-row">
            <div className="host-modal__field">
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
                <div className="host-modal__error">{errors.name[0]}</div>
              )}
            </div>

            <div className="host-modal__field">
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
                <div className="host-modal__error">{errors.phone[0]}</div>
              )}
            </div>
          </div>

          <div className="host-modal__field-row">
            <div className="host-modal__field">
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

            <div className="host-modal__field">
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
                <option value="Event Hosting">Event Hosting</option>
                <option value="Wedding Planning">Wedding Planning</option>
                <option value="Conference Management">Conference Management</option>
                <option value="Party Planning">Party Planning</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Social Events">Social Events</option>
                <option value="Other">Other</option>
                {availableServiceTypes.map((serviceType, index) => (
                  <option key={`dynamic-type-${index}`} value={serviceType.name}>{serviceType.name}</option>
                ))}
              </select>
              {errors.serviceOffered && (
                <div className="host-modal__error">{errors.serviceOffered[0]}</div>
              )}
            </div>
          </div>

          <div className="host-modal__field-row">
            <div className="host-modal__field">
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

          <div className="host-modal__actions">
            <button
              type="button"
              className="host-modal__button host-modal__button--secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="host-modal__button host-modal__button--primary"
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

export default HostModal;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const UserModal = ({ isOpen, onClose, onUserAdded, editMode, userData }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    gender: 'Male',
    role: 'Customer',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && userData) {
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone: userData.phone || '',
        gender: userData.gender || 'Male',
        role: userData.role || 'Customer',
        status: userData.status || 'Active',
        id: userData.id,
      });
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        phone: '',
        gender: 'Male',
        role: 'Customer',
        status: 'Active',
      });
      setErrors({});
    }
  }, [editMode, userData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.first_name.trim()) errs.first_name = 'First name is required';
    if (!formData.last_name.trim()) errs.last_name = 'Last name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    onUserAdded(formData, editMode);
  };

  return (
    <div className="user-modal__overlay" onClick={onClose}>
      <div className="user-modal" onClick={e => e.stopPropagation()}>
        <header className="user-modal__header">
          <h2>{editMode ? 'Edit User' : 'Add User'}</h2>
          <button className="user-modal__close-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>
        <form className="user-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="user-modal__field-row">
            <div className="user-modal__field">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'is-invalid' : ''}
              />
              {errors.first_name && <div className="user-modal__error">{errors.first_name}</div>}
            </div>
            <div className="user-modal__field">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'is-invalid' : ''}
              />
              {errors.last_name && <div className="user-modal__error">{errors.last_name}</div>}
            </div>
          </div>

          <div className="user-modal__field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'is-invalid' : ''}
            />
            {errors.phone && <div className="user-modal__error">{errors.phone}</div>}
          </div>

          <div className="user-modal__field-row">
            <div className="user-modal__field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="user-modal__field">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option>Customer</option>
                <option>Vendor</option>
                <option>Admin</option>
              </select>
            </div>

            <div className="user-modal__field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="user-modal__actions">
            <button
              type="submit"
              className="user-modal__button user-modal__button--primary"
            >
              {editMode ? 'Update User' : 'Add User'}
            </button>
            <button
              type="button"
              className="user-modal__button user-modal__button--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;


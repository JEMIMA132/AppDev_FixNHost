import React, { useState, useEffect } from 'react';
import { Paperclip, CheckCircle } from 'lucide-react';

const ProfileInfo = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: 'None',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    country: '',
    profilePicture: null
  });
  const [formData, setFormData] = useState(user);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    setShowNotification(true);
    // Dispatch a custom event to notify other components (e.g., Profile.js) of the update
    window.dispatchEvent(new Event('userUpdated'));
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(user);
  };

  return (
    <div className="profile-content">
      <h1>Profile Information</h1>
      <div className="profile-content-picture">
        <div className="profile-content-picture__avatar-holder">
          {formData.profilePicture ? (
            <img src={formData.profilePicture} alt="Profile" className="profile-content-picture__image" />
          ) : (
            <div className="profile__user-avatar-placeholder">
              {user.firstName && user.lastName ? `${user.firstName[0]}${user.lastName[0]}` : 'NA'}
            </div>
          )}
          <div className="profile-content-picture__upload-button">
            <label htmlFor="avatar-upload" className="profile-content-picture__upload-label">
              <Paperclip size={16} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="profile-content-picture__input"
            />
          </div>
        </div>
      </div>
      <div className="profile-content-form">
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="profile-content-form__field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter your middle name"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="profile-content-form__field">
            <label>Suffix</label>
            <select
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
            >
              <option value="None">None</option>
              <option value="Jr">Jr</option>
              <option value="Sr">Sr</option>
              <option value="II">II</option>
              <option value="III">III</option>
            </select>
          </div>
        </div>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="profile-content-form__field">
            <label>Birthday</label>
            <input
              type="text"
              name="birthday"
              placeholder="mm/dd/yyyy"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="profile-content-form__field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="profile-content-form__field"></div> {/* Empty field for alignment */}
        </div>
        <div className="profile-content-form__actions">
          <button className="profile-content-form__button profile-content-form__button--cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="profile-content-form__button profile-content-form__button--save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      {showNotification && (
        <div className="profile-content-notification">
          <CheckCircle size={20} className="profile-content-notification__icon" />
          <p>Changes saved successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
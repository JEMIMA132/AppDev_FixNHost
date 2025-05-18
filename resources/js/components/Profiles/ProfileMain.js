import React, { useState, useEffect } from 'react';


const ProfileMain = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Smith',
    middleName: 'David',
    suffix: 'None',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    birthday: '05/15/1990',
    gender: 'Male',
    country: 'United States'
  });

  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="profile-main">
      <h1>Profile</h1>
      <p className="profile-main__subtitle">Manage your profile information and preferences</p>
      <div className="profile-main__header">
        <div className="profile-main__avatar">
          {initials}
          <div className="profile-main__camera">📷</div>
        </div>
        <div className="profile-main__info">
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>Member since 2021</p>
        </div>
      </div>
      <div className="profile-main__form">
        <div className="profile-main__row">
          <div className="profile-main__field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-main__field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="profile-main__row">
          <div className="profile-main__field">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-main__field">
            <label>Suffix</label>
            <select
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="None">None</option>
              <option value="Jr">Jr</option>
              <option value="Sr">Sr</option>
              <option value="II">II</option>
              <option value="III">III</option>
            </select>
          </div>
        </div>
        <div className="profile-main__row">
          <div className="profile-main__field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-main__field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="profile-main__row">
          <div className="profile-main__field">
            <label>Birthday</label>
            <input
              type="text"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-main__field">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="profile-main__row">
          <div className="profile-main__field">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>
        <div className="profile-main__actions">
          {isEditing ? (
            <>
              <button className="profile-main__button profile-main__button--cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="profile-main__button profile-main__button--save" onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <button className="profile-main__button profile-main__button--edit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
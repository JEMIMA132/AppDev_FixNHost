import React, { useState } from 'react';
import '../../../sass/AdminPages/AccountSettings.scss';

const AccountSettings = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here (API call, etc.)
    alert('Account settings saved!');
  };

  return (
    <div className="account-settings">
      <form className="account-settings__container" onSubmit={handleSave}>
        {/* Account Info */}
        <div className="account-settings__card">
          <div className="account-settings__section-title">Account Information</div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">Full Name</label>
            <input
              className="account-settings__input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">Email</label>
            <input
              className="account-settings__input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">Phone</label>
            <input
              className="account-settings__input"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">Profile Picture</label>
            <input
              className="account-settings__input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <img src={avatarPreview} alt="Avatar Preview" className="account-settings__avatar-preview" />
          </div>
        </div>

        {/* Change Password */}
        <div className="account-settings__card">
          <div className="account-settings__section-title">Change Password</div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">Current Password</label>
            <input
              className="account-settings__input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">New Password</label>
            <input
              className="account-settings__input"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="account-settings__form-group">
            <label className="account-settings__label">Confirm New Password</label>
            <input
              className="account-settings__input"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="account-settings__actions">
          <button className="account-settings__save-btn" type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;






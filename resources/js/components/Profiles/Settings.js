import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Settings = ({ isEditing, setIsEditing }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirmation do not match!");
      return;
    }
    console.log("Password updated:", passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  return (
    <div className="profile-content">
      <h1>Settings</h1>
      <div className="settings-form">
        <div className="settings-form__field">
          <label>Current Password</label>
          <div className="settings-form__password-wrapper">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name="currentPassword"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="settings-form__toggle-password"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="settings-form__field">
          <label>New Password</label>
          <div className="settings-form__password-wrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="settings-form__toggle-password"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="settings-form__field">
          <label>Confirm New Password</label>
          <div className="settings-form__password-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="settings-form__toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="settings-form__actions">
          <button className="settings-form__button settings-form__button--cancel" onClick={handlePasswordCancel}>
            Cancel
          </button>
          <button className="settings-form__button settings-form__button--change" onClick={handlePasswordSubmit}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
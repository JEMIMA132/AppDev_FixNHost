import React, { useState } from 'react';
import '../../../sass/AdminPages/AdminSettings.scss';

const AdminSettings = () => {
  const [siteName, setSiteName] = useState('FixNHost');
  const [themeColor, setThemeColor] = useState('#3182ce');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('/images/logot.svg');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSwitch = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here (API call, etc.)
    alert('Settings saved!');
  };

  return (
    <div className="admin-settings">
      <form className="admin-settings__container" onSubmit={handleSave}>
        {/* General Settings */}
        <div className="admin-settings__card">
          <div className="admin-settings__section-title">General Settings</div>
          <div className="admin-settings__form-group">
            <label className="admin-settings__label">Site Name</label>
            <input
              className="admin-settings__input"
              type="text"
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
            />
          </div>
          <div className="admin-settings__form-group">
            <label className="admin-settings__label">Logo</label>
            <input
              className="admin-settings__input"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            <img src={logoPreview} alt="Logo Preview" className="admin-settings__logo-preview" />
          </div>
          <div className="admin-settings__form-group">
            <label className="admin-settings__label">Theme Color</label>
            <input
              className="admin-settings__input"
              type="color"
              value={themeColor}
              onChange={e => setThemeColor(e.target.value)}
              style={{ width: '60px', height: '40px', padding: 0 }}
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="admin-settings__card">
          <div className="admin-settings__section-title">Notification Preferences</div>
          <div className="admin-settings__switch">
            <div
              className={`switch${notifications.email ? ' on' : ''}`}
              onClick={() => handleSwitch('email')}
              tabIndex={0}
              role="button"
              aria-pressed={notifications.email}
            >
              <div className="knob" />
            </div>
            <span className="switch-label">Email Notifications</span>
          </div>
          <div className="admin-settings__switch">
            <div
              className={`switch${notifications.sms ? ' on' : ''}`}
              onClick={() => handleSwitch('sms')}
              tabIndex={0}
              role="button"
              aria-pressed={notifications.sms}
            >
              <div className="knob" />
            </div>
            <span className="switch-label">SMS Notifications</span>
          </div>
          <div className="admin-settings__switch">
            <div
              className={`switch${notifications.push ? ' on' : ''}`}
              onClick={() => handleSwitch('push')}
              tabIndex={0}
              role="button"
              aria-pressed={notifications.push}
            >
              <div className="knob" />
            </div>
            <span className="switch-label">Push Notifications</span>
          </div>
        </div>

        {/* Security */}
        <div className="admin-settings__card">
          <div className="admin-settings__section-title">Security</div>
          <div className="admin-settings__form-group">
            <label className="admin-settings__label">Current Password</label>
            <input
              className="admin-settings__input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="admin-settings__form-group">
            <label className="admin-settings__label">New Password</label>
            <input
              className="admin-settings__input"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="admin-settings__form-group">
            <label className="admin-settings__label">Confirm New Password</label>
            <input
              className="admin-settings__input"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="admin-settings__actions">
          <button className="admin-settings__save-btn" type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;






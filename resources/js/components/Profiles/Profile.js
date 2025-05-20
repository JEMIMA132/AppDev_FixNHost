import React, { useState, useEffect } from 'react';
import { User, Clock, Settings, CreditCard, LogOut } from 'lucide-react';
import Header from '../Headers/Header';
import ProfileContent from './ProfileContent';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const getProfileImageUrl = (profile_pic) => {
    if (!profile_pic) return null;
    if (profile_pic.startsWith('http')) return profile_pic;
    if (profile_pic.startsWith('/')) return `http://127.0.0.1:8000${profile_pic}`;
    return `http://127.0.0.1:8000/storage/${profile_pic}`;
  };

  useEffect(() => {
    const updateProfile = () => {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      setProfile(user.profile || {});
    };
    updateProfile();
    window.addEventListener('userUpdated', updateProfile);
    return () => window.removeEventListener('userUpdated', updateProfile);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear localStorage, redirect, etc.)
  };

  const initials = profile.first_name && profile.last_name ? `${profile.first_name[0]}${profile.last_name[0]}` : 'NA';

  return (
    <div className="profile">
      <Header />
      <div className="profile__wrapper">
        <div className="profile__layout">
          <div className="profile__tabs">
            <div className="profile__user-section">
              <div className="profile__user-avatar">
                {getProfileImageUrl(profile.profile_pic) ? (
                  <img
                    src={getProfileImageUrl(profile.profile_pic)}
                    alt="User Avatar"
                    className="profile__user-avatar-image"
                  />
                ) : (
                  <div className="profile__user-avatar-placeholder">
                    {initials}
                  </div>
                )}
              </div>
              <div className="profile__user-info">
                <h2 className="profile__user-name">
                  {profile.first_name && profile.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'User'}
                </h2>
              </div>
            </div>
            <button
              className={`profile__tab ${activeTab === 'profile' ? 'profile__tab--active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <User className="profile__tab-icon" />
              Profile
            </button>
            <button
              className={`profile__tab ${activeTab === 'booking-history' ? 'profile__tab--active' : ''}`}
              onClick={() => handleTabChange('booking-history')}
            >
              <Clock className="profile__tab-icon" />
              My Bookings
            </button>
            <button
              className={`profile__tab ${activeTab === 'settings' ? 'profile__tab--active' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <Settings className="profile__tab-icon" />
              Settings
            </button>
            <button
              className="profile__tab"
              onClick={handleLogout}
            >
              <LogOut className="profile__tab-icon" />
              Logout
            </button>
          </div>
          <div className="profile__content-container">
            <ProfileContent
              activeTab={activeTab}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
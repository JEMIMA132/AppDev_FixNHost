import React, { useState, useEffect } from 'react';
import { User, Clock, Settings, CreditCard, LogOut } from 'lucide-react';
import Header from '../Headers/Header';
import ProfileContent from './ProfileContent';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    profilePicture: null, // Renamed from userAvatar
  });

  const fetchUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        firstName: storedUser.firstName || '',
        lastName: storedUser.lastName || '',
        profilePicture: storedUser.profilePicture || null, // Renamed from userAvatar
      });
    }
  };

  useEffect(() => {
    fetchUserData(); // Initial fetch

    // Listen for storage events (triggered when localStorage changes in another tab/window)
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        fetchUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Since the storage event doesn't fire in the same tab, we can also listen for a custom event
  // This is optional but ensures updates in the same tab are caught
  useEffect(() => {
    const handleUserUpdate = () => {
      fetchUserData();
    };

    window.addEventListener('userUpdated', handleUserUpdate);

    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here (e.g., clear localStorage, redirect, etc.)
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile__wrapper">
        <div className="profile__layout">
          <div className="profile__tabs">
            <div className="profile__user-section">
              <div className="profile__user-avatar">
                {user.profilePicture ? ( // Renamed from userAvatar
                  <img
                    src={user.profilePicture}
                    alt="User Avatar"
                    className="profile__user-avatar-image"
                  />
                ) : (
                  <div className="profile__user-avatar-placeholder">
                    {user.firstName && user.lastName
                      ? `${user.firstName[0]}${user.lastName[0]}`
                      : 'NA'}
                  </div>
                )}
              </div>
              <div className="profile__user-info">
                <h2 className="profile__user-name">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : 'John Smith'}
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
              Booking History
            </button>
            <button
              className={`profile__tab ${activeTab === 'settings' ? 'profile__tab--active' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <Settings className="profile__tab-icon" />
              Settings
            </button>
            <button
              className={`profile__tab ${activeTab === 'plan-subscription' ? 'profile__tab--active' : ''}`}
              onClick={() => handleTabChange('plan-subscription')}
            >
              <CreditCard className="profile__tab-icon" />
              Plan and Subscription
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
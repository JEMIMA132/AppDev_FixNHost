import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Clock, Settings, LogOut } from 'lucide-react';

const ProfileSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const profile = user.profile || {};
  const initials = profile.first_name && profile.last_name ? `${profile.first_name[0]}${profile.last_name[0]}` : 'NA';
  const navigate = useNavigate();

  const getProfileImageUrl = (profile_pic) => {
    if (!profile_pic) return null;
    if (profile_pic.startsWith('http')) return profile_pic;
    if (profile_pic.startsWith('/')) return `http://127.0.0.1:8000${profile_pic}`;
    return `http://127.0.0.1:8000/storage/${profile_pic}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__user">
        {getProfileImageUrl(profile.profile_pic) ? (
          <img src={getProfileImageUrl(profile.profile_pic)} alt="Profile" className="profile-sidebar__avatar" />
        ) : (
          <div className="profile-sidebar__avatar">{initials}</div>
        )}
        <h2 className="profile-sidebar__name">{profile.first_name && profile.last_name ? `${profile.first_name} ${profile.last_name}` : 'User'}</h2>
        <p className="profile-sidebar__member">Gender: {profile.gender || 'N/A'}</p>
        <p className="profile-sidebar__member">Suffix: {profile.suffix || 'N/A'}</p>
      </div>
      <nav className="profile-sidebar__nav">
        <Link to="/profile" className="profile-sidebar__link profile-sidebar__link--active">
          <User className="profile-sidebar__icon" />
          Profile
        </Link>
        <Link to="/booking-history" className="profile-sidebar__link">
          <Clock className="profile-sidebar__icon" />
          Booking History
        </Link>
        <Link to="/settings" className="profile-sidebar__link">
          <Settings className="profile-sidebar__icon" />
          Settings
        </Link>
        <button onClick={handleLogout} className="profile-sidebar__link profile-sidebar__link--logout">
          <LogOut className="profile-sidebar__icon" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
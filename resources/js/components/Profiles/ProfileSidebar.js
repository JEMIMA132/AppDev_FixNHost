import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Clock, Settings, LogOut } from 'lucide-react';


const ProfileSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: 'John', lastName: 'Smith' };
  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__user">
        <div className="profile-sidebar__avatar">{initials}</div>
        <h2 className="profile-sidebar__name">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="profile-sidebar__member">Member since 2021</p>
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
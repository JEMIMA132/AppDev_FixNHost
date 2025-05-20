import React, { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, Menu, User, Settings, LogOut, MessageCircle, Mail, AlertTriangle, RotateCcw, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const VHeader = ({ toggleSidebar }) => {
  const [user] = useState({
    name: 'Vendor User',
    profile: {
      first_name: 'John',
      last_name: 'Doe',
      profile_pic: '/images/default-avatar.jpg',
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'order', message: 'New order received', is_read: false, created_at: new Date().toISOString() },
    { id: 2, type: 'chat', message: 'New customer message', is_read: true, created_at: new Date().toISOString() },
  ]);
  const [unreadCount] = useState(1);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleNotificationClick = (notification) => {
    switch (notification.type) {
      case 'order':
        navigate('/vendor-dashboard/orders');
        break;
      case 'chat':
        navigate('/vendor-dashboard/messages');
        break;
      case 'review':
        navigate('/vendor-dashboard/reviews');
        break;
      case 'low_stock':
        navigate('/vendor-dashboard/inventory');
        break;
      default:
        navigate('/vendor-dashboard');
    }
    setIsNotificationsOpen(false);
  };

  const userName = user?.profile?.first_name || user?.profile?.last_name
    ? `${user.profile.first_name || ''} ${user.profile.last_name || ''}`.trim()
    : user?.name || 'Vendor User';

  const getProfileImageUrl = () => {
    return user?.profile?.profile_pic || '/images/default-avatar.jpg';
  };

  return (
    <header className="vendor-header">
      <div className="vendor-header__hamburger" onClick={toggleSidebar}>
        <Menu size={24} />
      </div>

      <div className="vendor-header__actions">
        <div className="vendor-header__notification" onClick={toggleNotifications}>
          <Bell className="vendor-header__icon" size={20} />
          {unreadCount > 0 && (
            <span className="vendor-header__notification-dot">
              {unreadCount <= 9 ? unreadCount : '9+'}
            </span>
          )}
          
          {isNotificationsOpen && (
            <div className="vendor-header__notification-panel" ref={notificationsRef}>
              <div className="vendor-header__notification-header">
                <h3>Notifications</h3>
              </div>
              
              <div className="vendor-header__notification-list">
                {notifications.length === 0 ? (
                  <div className="vendor-header__notification-empty">
                    No notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`vendor-header__notification-item ${!notification.is_read ? 'vendor-header__notification-item--unread' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="vendor-header__notification-image">
                        {notification.type === 'order' && (
                          <ShoppingBag className="vendor-header__notification-type-icon vendor-header__notification-type-icon--order" />
                        )}
                        {notification.type === 'low_stock' && (
                          <AlertTriangle className="vendor-header__notification-type-icon vendor-header__notification-type-icon--warning" />
                        )}
                        {notification.type === 'chat' && (
                          <MessageCircle className="vendor-header__notification-type-icon" />
                        )}
                        {notification.type === 'review' && (
                          <Mail className="vendor-header__notification-type-icon" />
                        )}
                      </div>
                      <div className="vendor-header__notification-content">
                        <p className="vendor-header__notification-message">{notification.message}</p>
                        <p className="vendor-header__notification-time">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="vendor-header__profile" onClick={toggleDropdown}>
          <img
            src={getProfileImageUrl()}
            alt="Profile"
            className="vendor-header__profile-picture"
            onError={(e) => {
              e.target.src = '/images/default-avatar.jpg';
            }}
          />
          <span className="vendor-header__user-name">{userName}</span>
          <ChevronDown
            className={`vendor-header__dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
            size={16}
          />
          {isDropdownOpen && (
            <div className="vendor-header__dropdown-menu">
              <Link to="/vendor-dashboard/settings/profile" className="vendor-header__dropdown-item">
                <User className="vendor-header__dropdown-icon" size={16} />
                Profile
              </Link>
              <Link to="/shop" className="vendor-header__dropdown-item">
                <ShoppingBag className="vendor-header__dropdown-icon" size={16} />
                View Shop
              </Link>
              <Link to="/vendor-dashboard/settings" className="vendor-header__dropdown-item">
                <Settings className="vendor-header__dropdown-icon" size={16} />
                Settings
              </Link>
              <div className="vendor-header__dropdown-separator"></div>
              <button
                className="vendor-header__dropdown-item"
                onClick={() => {
                  navigate('/login');
                }}
              >
                <LogOut className="vendor-header__dropdown-icon" size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default VHeader;

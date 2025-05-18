import React, { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, Menu, User, Settings, LogOut, MessageCircle, Mail, AlertTriangle, RotateCcw, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar }) => {
  const [user] = useState({
    name: 'Admin User',
    profile: {
      first_name: 'John',
      last_name: 'Doe',
      profile_pic: '/images/default-avatar.jpg',
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'return', message: 'New return request received', is_read: false, created_at: new Date().toISOString() },
    { id: 2, type: 'chat', message: 'New chat message', is_read: true, created_at: new Date().toISOString() },
  ]);
  const [unreadCount] = useState(1);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  // Close notifications panel when clicking outside
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
    // Static navigation based on notification type
    switch (notification.type) {
      case 'return':
        navigate('/admin-dashboard/returns');
        break;
      case 'chat':
        navigate('/admin-dashboard/customer-support');
        break;
      case 'order':
        navigate('/admin-dashboard/orders');
        break;
      case 'contact_message':
        navigate('/admin-dashboard/inbox');
        break;
      case 'low_stock':
        navigate('/admin-dashboard/inventory');
        break;
      default:
        navigate('/admin-dashboard');
    }
    setIsNotificationsOpen(false);
  };

  const userName = user?.profile?.first_name || user?.profile?.last_name
    ? `${user.profile.first_name || ''} ${user.profile.last_name || ''}`.trim()
    : user?.name || 'Admin User';

  const getProfileImageUrl = () => {
    return user?.profile?.profile_pic || '/images/default-avatar.jpg';
  };

  return (
    <header className="admin-header">
      <div className="admin-header__hamburger" onClick={toggleSidebar}>
        <Menu size={24} />
      </div>

      <div className="admin-header__actions">
        <div className="admin-header__notification" onClick={toggleNotifications}>
         directory/ <Bell className="admin-header__icon" size={20} />
          {unreadCount > 0 && (
            <span className="admin-header__notification-dot">
              {unreadCount <= 9 ? unreadCount : '9+'}
            </span>
          )}
          
          {isNotificationsOpen && (
            <div className="admin-header__notification-panel" ref={notificationsRef}>
              <div className="admin-header__notification-header">
                <h3>Notifications</h3>
              </div>
              
              <div className="admin-header__notification-list">
                {notifications.length === 0 ? (
                  <div className="admin-header__notification-empty">
                    No notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`admin-header__notification-item ${!notification.is_read ? 'admin-header__notification-item--unread' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="admin-header__notification-image">
                        {notification.type === 'return' && (
                          <RotateCcw className="admin-header__notification-type-icon admin-header__notification-type-icon--return" />
                        )}
                        {notification.type === 'low_stock' && (
                          <AlertTriangle className="admin-header__notification-type-icon admin-header__notification-type-icon--warning" />
                        )}
                        {notification.type === 'chat' && (
                          <MessageCircle className="admin-header__notification-type-icon" />
                        )}
                        {notification.type === 'contact_message' && (
                          <Mail className="admin-header__notification-type-icon" />
                        )}
                      </div>
                      <div className="admin-header__notification-content">
                        <p className="admin-header__notification-message">{notification.message}</p>
                        <p className="admin-header__notification-time">
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

        <div className="admin-header__profile" onClick={toggleDropdown}>
          <img
            src={getProfileImageUrl()}
            alt="Profile"
            className="admin-header__profile-picture"
            onError={(e) => {
              e.target.src = '/images/default-avatar.jpg';
            }}
          />
          <span className="admin-header__user-name">{userName}</span>
          <ChevronDown
            className={`admin-header__dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
            size={16}
          />
          {isDropdownOpen && (
            <div className="admin-header__dropdown-menu">
              <Link to="/admin-dashboard/settings/account" className="admin-header__dropdown-item">
                <User className="admin-header__dropdown-icon" size={16} />
                Profile
              </Link>
              <Link to="/shop" className="admin-header__dropdown-item">
                <ShoppingBag className="admin-header__dropdown-icon" size={16} />
                Go to Shop
              </Link>
              <Link to="/admin-dashboard/settings/admin" className="admin-header__dropdown-item">
                <Settings className="admin-header__dropdown-icon" size={16} />
                Settings
              </Link>
              <div className="admin-header__dropdown-separator"></div>
              <button
                className="admin-header__dropdown-item"
                onClick={() => {
                  navigate('/login');
                }}
              >
                <LogOut className="admin-header__dropdown-icon" size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
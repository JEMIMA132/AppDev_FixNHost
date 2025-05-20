import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Settings, LogOut, Bell, MessageSquare } from 'lucide-react';
import axios from '../../axios';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/api/user');
        setUser(response.data);
        setIsLoggedIn(true);
        // Store user in localStorage for use in other components
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error checking auth status:', error);
        handleLogout();
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      if (isLoggedIn) {
        await axios.post('/logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local storage and state regardless of API call success
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
      setUser(null);
      setIsProfileDropdownOpen(false);
      navigate('/login');
    }
  };

  // Add debug log to inspect the user object
  console.log('Header user:', user);

  // Support both { ...user fields..., profile: {...} } and { user: { ...user fields..., profile: {...} } }
  const actualUser = user && user.user ? user.user : user;

  // Helper to get the correct profile image URL
  const getProfileImageUrl = () => {
    if (!actualUser || !actualUser.profile || !actualUser.profile.profile_pic) {
      return '/images/electrician.svg';
    }
    const profilePicPath = actualUser.profile.profile_pic;
    if (profilePicPath.startsWith('http')) {
      return profilePicPath;
    } else if (profilePicPath.startsWith('/')) {
      return `http://127.0.0.1:8000${profilePicPath}`;
    } else {
      return `http://127.0.0.1:8000/storage/${profilePicPath}`;
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </div>
        <div className="header__logo">
          <img src="/images/logot.svg" alt="HostFix Logo" />
        </div>
      </div>
      <nav className={`header__nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/homepage" onClick={toggleMobileMenu}>Home</Link></li>
          <li><Link to="/services" onClick={toggleMobileMenu}>Services</Link></li>
          <li><Link to="/aboutus" onClick={toggleMobileMenu}>About Us</Link></li>
          <li><Link to="/contactus" onClick={toggleMobileMenu}>Contact Us</Link></li>
          <li className="dropdown">
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              Support
              <ChevronDown className={isDropdownOpen ? 'open' : ''} />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/privacy-policy" onClick={toggleMobileMenu}>Privacy Policy</Link>
                <Link to="/terms-of-services" onClick={toggleMobileMenu}>Terms of Services</Link>
                <Link to="/faqs" onClick={toggleMobileMenu}>FAQs</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="header__auth">
        {isLoggedIn && user ? (
          <div className="header__auth-profile">
            <Link to="/notifications" className="header__icon">
              <Bell />
            </Link>
            <Link to="/messages" className="header__icon">
              <MessageSquare />
            </Link>
            <img
              src={getProfileImageUrl()}
              alt="Profile"
              className="profile-picture"
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #0097b2' }}
            />
            <div className="profile-dropdown">
              <div className="profile-dropdown-toggle" onClick={toggleProfileDropdown}>
                <ChevronDown className={`profile-dropdown-arrow ${isProfileDropdownOpen ? 'open' : ''}`} />
              </div>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <Link to="/profile" className="profile-dropdown-item" onClick={toggleProfileDropdown}>
                    <User className="profile-dropdown-icon" />
                    Profile
                  </Link>
                  <Link to="/settings" className="profile-dropdown-item" onClick={toggleProfileDropdown}>
                    <Settings className="profile-dropdown-icon" />
                    Settings
                  </Link>
                  <div className="profile-dropdown-separator"></div>
                  <button onClick={handleLogout} className="profile-dropdown-item">
                    <LogOut className="profile-dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
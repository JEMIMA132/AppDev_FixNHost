import React, { useState, useEffect } from 'react';
import { Paperclip, CheckCircle } from 'lucide-react';
import axios from '../../axios';

const suffixOptions = ["None", "Jr", "Sr", "II", "III"];
const genderOptions = ["male", "female", "other"];

const ProfileInfo = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    date_of_birth: '',
    gender: '',
    profile_pic: null
  });
  const [editMode, setEditMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem('user');
        let userObj = null;
        if (storedUser) {
          userObj = JSON.parse(storedUser);
        } else {
          const response = await axios.get('/api/user');
          userObj = response.data.user ? response.data.user : response.data;
          localStorage.setItem('user', JSON.stringify(userObj));
        }
        if (userObj && userObj.profile) {
          setProfile({
            first_name: userObj.profile.first_name || '',
            middle_name: userObj.profile.middle_name || '',
            last_name: userObj.profile.last_name || '',
            suffix: userObj.profile.suffix || '',
            date_of_birth: userObj.profile.date_of_birth || '',
            gender: userObj.profile.gender || '',
            profile_pic: userObj.profile.profile_pic || null
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profile_pic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    // Refetch to reset changes
    setLoading(true);
    axios.get('/api/user').then(response => {
      const userObj = response.data.user ? response.data.user : response.data;
      if (userObj && userObj.profile) {
        setProfile({
          first_name: userObj.profile.first_name || '',
          middle_name: userObj.profile.middle_name || '',
          last_name: userObj.profile.last_name || '',
          suffix: userObj.profile.suffix || '',
          date_of_birth: userObj.profile.date_of_birth || '',
          gender: userObj.profile.gender || '',
          profile_pic: userObj.profile.profile_pic || null
        });
      }
      setLoading(false);
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/profile', profile);
      // Update localStorage with new profile data
      const userObj = JSON.parse(localStorage.getItem('user'));
      if (userObj && userObj.profile) {
        userObj.profile = response.data.profile;
        localStorage.setItem('user', JSON.stringify(userObj));
      }
      setEditMode(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      // Optionally show error notification
      alert('Failed to save profile changes.');
    }
  };

  // Helper to get the correct profile image URL
  const getProfileImageUrl = (profile_pic) => {
    if (!profile_pic) return null;
    if (profile_pic.startsWith('http')) return profile_pic;
    if (profile_pic.startsWith('/')) return `http://127.0.0.1:8000${profile_pic}`;
    return `http://127.0.0.1:8000/storage/${profile_pic}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-content">
      <h1>Profile Information</h1>
      <div className="profile-content-picture">
        <div className="profile-content-picture__avatar-holder">
          {profile.profile_pic ? (
            <img src={getProfileImageUrl(profile.profile_pic)} alt="Profile" className="profile-content-picture__image" />
          ) : (
            <div className="profile__user-avatar-placeholder">
              {profile.first_name && profile.last_name ? `${profile.first_name[0]}${profile.last_name[0]}` : 'NA'}
            </div>
          )}
          {editMode && (
            <div className="profile-content-picture__upload-button">
              <label htmlFor="avatar-upload" className="profile-content-picture__upload-label">
                <Paperclip size={16} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="profile-content-picture__input"
              />
            </div>
          )}
        </div>
      </div>
      <form className="profile-content-form" onSubmit={e => { e.preventDefault(); if (editMode) handleSave(); }}>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div className="profile-content-form__field">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>Middle Name</label>
            <input
              type="text"
              name="middle_name"
              value={profile.middle_name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div className="profile-content-form__field">
            <label>Suffix</label>
            <select
              name="suffix"
              value={profile.suffix}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option value="">Select suffix</option>
              {suffixOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="profile-content-form__row">
          <div className="profile-content-form__field">
            <label>Birthday</label>
            <input
              type="date"
              name="date_of_birth"
              value={profile.date_of_birth ? profile.date_of_birth.split('T')[0] : ''}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          <div className="profile-content-form__field">
            <label>Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option value="">Select gender</option>
              {genderOptions.map(opt => (
                <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="profile-content-form__actions">
          {!editMode ? (
            <button type="button" className="profile-content-form__button profile-content-form__button--edit" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <>
              <button type="button" className="profile-content-form__button profile-content-form__button--cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="profile-content-form__button profile-content-form__button--save">
                Save Changes
              </button>
            </>
          )}
        </div>
      </form>
      {showNotification && (
        <div className="profile-content-notification">
          <CheckCircle size={20} className="profile-content-notification__icon" />
          <p>Changes saved successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
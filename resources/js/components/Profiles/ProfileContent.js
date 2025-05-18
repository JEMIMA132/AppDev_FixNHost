import React from 'react';
import ProfileInfo from './ProfileInfo';
import BookingHistory from './BookingHistory';
import Settings from './Settings';
import PlanSubscription from './PlanSubscription';

const ProfileContent = ({ activeTab, isEditing, setIsEditing }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo />; // Removed isEditing and setIsEditing props
      case 'booking-history':
        return <BookingHistory />;
      case 'settings':
        return <Settings isEditing={isEditing} setIsEditing={setIsEditing} />;
      case 'plan-subscription':
        return <PlanSubscription />;
      default:
        return null;
    }
  };

  return renderContent();
};

export default ProfileContent;
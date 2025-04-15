import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BecomeSub from '../Becomes/BecomeSub';


const BecomeMain = ({ activeTab }) => {
  const navigate = useNavigate();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fixSpecialties = [
    { name: 'Carpentry & Structural Repairs', description: 'Expert carpentry and structural repair services for homes and businesses' },
    { name: 'Electrical Services', description: 'Licensed electrical work for safe and efficient power systems' },
    { name: 'Air Conditioning & Ventilation', description: 'Complete HVAC services for optimal indoor comfort and air quality' },
    { name: 'General Handyman Services', description: 'Versatile handyman services for all your home maintenance needs' },
    { name: 'AV Equipment Repair', description: 'Specialized repair services for audio and visual equipment' },
  ];

  const hostSpecialties = [
    { name: 'Event Planning & Coordination', description: 'Comprehensive event planning and coordination services' },
    { name: 'Catering Services', description: 'Professional catering for events of all sizes' },
    { name: 'Venue Setup & Decoration', description: 'Creative venue setup and decoration services' },
    { name: 'Entertainment Services', description: 'Providing entertainment solutions for events' },
    { name: 'Photography & Videography', description: 'Capture your event with professional photography and videography' },
  ];

  useEffect(() => {
    setSelectedSpecialties([]);
  }, [activeTab]);

  const handleSpecialtyChange = (specialtyName) => {
    if (selectedSpecialties.includes(specialtyName)) {
      setSelectedSpecialties(selectedSpecialties.filter((item) => item !== specialtyName));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialtyName]);
    }
  };

  const handleContinue = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubscribe = () => {
    if (activeTab === 'fix') {
      navigate('/fix-vendor');
    } else {
      navigate('/host-vendor');
    }
  };

  return (
    <section className="become-main">
      <h2>Select Your {activeTab === 'fix' ? 'Fix' : 'Host'} Service Specialties</h2>

      <div className="specialties-list">
        {(activeTab === 'fix' ? fixSpecialties : hostSpecialties).map((specialty, index) => (
          <div key={index} className="specialty-item">
            <input
              type="checkbox"
              id={`specialty-${index}`}
              checked={selectedSpecialties.includes(specialty.name)}
              onChange={() => handleSpecialtyChange(specialty.name)}
            />
            <label htmlFor={`specialty-${index}`}>
              <span className="specialty-name">{specialty.name}</span>
              <span className="specialty-description">{specialty.description}</span>
            </label>
          </div>
        ))}
      </div>

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={selectedSpecialties.length === 0} // Disable if no specialties are selected
      >
        Continue as {activeTab === 'fix' ? 'Fix' : 'Host'} Provider ({selectedSpecialties.length} selected)
      </button>

      {showPopup && (
        <BecomeSub onClose={handleClosePopup} onSubscribe={handleSubscribe} />
      )}
    </section>
  );
};

export default BecomeMain;
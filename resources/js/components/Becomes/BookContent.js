// BookContent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaWrench, 
  FaBolt, 
  FaWind, 
  FaFaucet, 
  FaCalendarAlt, 
  FaUtensils, 
  FaCamera, 
  FaMusic, 
  FaPaintBrush, 
  FaLock 
} from 'react-icons/fa';
import { FaBellConcierge } from 'react-icons/fa6';
import BookPop from '../Becomes/BookPop';
import BookChoose from '../Becomes/BookChoose';
import BookSelect from '../Becomes/BookSelect';
import BookSummary from '../Becomes/BookSummary';
import BookConfirmed from '../Becomes/BookConfirmed'; // Import the new BookConfirmed component


const BookContent = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showChoosePopup, setShowChoosePopup] = useState(false);
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [showConfirmedPopup, setShowConfirmedPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const fixServices = [
    { 
      name: 'Plumber', 
      description: 'Fix leaks, unclog drains, install fixtures', 
      icon: <FaFaucet />, 
      route: '/book/plumber' 
    },
    { 
      name: 'Electrician', 
      description: 'Wiring, electrical repairs, installations', 
      icon: <FaBolt />, 
      route: '/book/electrician' 
    },
    { 
      name: 'Carpenter', 
      description: 'Furniture repair, woodworking, installations', 
      icon: <FaWrench />, 
      route: '/book/carpenter' 
    },
    { 
      name: 'HVAC Technician', 
      description: 'Heating, ventilation, air conditioning services', 
      icon: <FaWind />, 
      route: '/book/hvac-technician' 
    },
    { 
      name: 'Painter', 
      description: 'Interior & exterior painting services', 
      icon: <FaPaintBrush />, 
      route: '/book/painter' 
    },
    { 
      name: 'Locksmith', 
      description: 'Lock repair, key duplication, security solutions', 
      icon: <FaLock />, 
      route: '/book/locksmith' 
    },
  ];

  const hostServices = [
    { 
      name: 'Event Planner', 
      description: 'Complete event planning and coordination', 
      icon: <FaCalendarAlt />, 
      route: '/book/event-planner' 
    },
    { 
      name: 'Caterer', 
      description: 'Food preparation and service for events', 
      icon: <FaUtensils />, 
      route: '/book/caterer' 
    },
    { 
      name: 'Photographer', 
      description: 'Professional photography services', 
      icon: <FaCamera />, 
      route: '/book/photographer' 
    },
    { 
      name: 'DJ/Music', 
      description: 'Music and entertainment for events', 
      icon: <FaMusic />, 
      route: '/book/dj-music' 
    },
    { 
      name: 'Decorator', 
      description: 'Event decoration and setup services', 
      icon: <FaPaintBrush />, 
      route: '/book/decorator' 
    },
    { 
      name: 'Security', 
      description: 'Security personnel for events', 
      icon: <FaBellConcierge />, 
      route: '/book/security' 
    },
  ];

  const handleBookClick = (service) => {
    setSelectedService(service);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    setShowChoosePopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setSelectedService(null);
  };

  const handleSelectVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowChoosePopup(false);
    setShowSelectPopup(true);
  };

  const handleSubmitBooking = (formData) => {
    setBookingData(formData);
    setShowSelectPopup(false);
    setShowSummaryPopup(true);
  };

  const handleConfirmBooking = () => {
    setShowSummaryPopup(false);
    setShowConfirmedPopup(true); // Show the BookConfirmed popup after confirming
  };

  const handleBookAnother = () => {
    setShowConfirmedPopup(false);
    setSelectedService(null);
    setSelectedVendor(null);
    setBookingData(null);
    // Optionally navigate back to the booking page
    navigate('/book');
  };

  const handleCloseSummary = () => {
    setShowSummaryPopup(false);
    setSelectedService(null);
    setSelectedVendor(null);
    setBookingData(null);
  };

  const handleCloseSelect = () => {
    setShowSelectPopup(false);
    setSelectedService(null);
    setSelectedVendor(null);
  };

  const handleBack = () => {
    setShowChoosePopup(false);
    setSelectedService(null);
  };

  return (
    <section className="book-content">
      {/* Fix Vendors Section */}
      <div className="book-content__section">
        <h2>Fix Vendors</h2>
        <div className="book-content__grid">
          {fixServices.map((service) => (
            <div key={service.name} className="book-content__card fix-vendor">
              <div className="book-content__icon-wrapper">
                {service.icon}
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button
                onClick={() => handleBookClick(service)}
                className="book-content__button fix-vendor__button"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Host Vendors Section */}
      <div className="book-content__section">
        <h2>Host Vendors</h2>
        <div className="book-content__grid">
          {hostServices.map((service) => (
            <div key={service.name} className="book-content__card host-vendor">
              <div className="book-content__icon-wrapper">
                {service.icon}
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button
                onClick={() => handleBookClick(service)}
                className="book-content__button host-vendor__button"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Show the BookPop popup when a service is selected */}
      {showPopup && selectedService && (
        <BookPop
          serviceName={selectedService.name}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* Show the BookChoose popup after confirming */}
      {showChoosePopup && selectedService && (
        <BookChoose
          serviceName={selectedService.name}
          onSelectVendor={handleSelectVendor}
          onBack={handleBack}
        />
      )}

      {/* Show the BookSelect popup after selecting a vendor */}
      {showSelectPopup && selectedService && selectedVendor && (
        <BookSelect
          vendorName={selectedVendor.name}
          serviceName={selectedService.name}
          onSubmit={handleSubmitBooking}
          onClose={handleCloseSelect}
        />
      )}

      {/* Show the BookSummary popup after submitting the booking */}
      {showSummaryPopup && bookingData && selectedService && selectedVendor && (
        <BookSummary
          bookingData={bookingData}
          vendorData={{
            serviceName: selectedService.name,
            vendorName: selectedVendor.name,
            price: selectedVendor.price,
          }}
          onConfirm={handleConfirmBooking}
          onClose={handleCloseSummary}
        />
      )}

      {/* Show the BookConfirmed popup after confirming the booking */}
      {showConfirmedPopup && (
        <BookConfirmed
          onBookAnother={handleBookAnother}
        />
      )}
    </section>
  );
};

export default BookContent;
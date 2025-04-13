// BookChoose.js
import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import FaStar for the rating


const BookChoose = ({ serviceName, onSelectVendor, onBack }) => {
  // Sample vendor data for each service category (in a real app, this would come from an API or database)
  const vendors = {
    Plumber: [
      { name: 'PipeFix Pros', rating: 4.9, price: '$60/hr', experience: '15 years', availability: 'Available tomorrow' },
      { name: 'LeakStop Plumbers', rating: 4.5, price: '$55/hr', experience: '10 years', availability: 'Booking 3 days out' },
    ],
    Electrician: [
      { name: 'WiredRight Electric', rating: 4.7, price: '$70/hr', experience: '12 years', availability: 'Available next week' },
      { name: 'ShockSafe Solutions', rating: 4.3, price: '$65/hr', experience: '8 years', availability: 'Booking 5 days out' },
    ],
    Carpenter: [
      { name: 'WoodCraft Experts', rating: 4.6, price: '$50/hr', experience: '10 years', availability: 'Available tomorrow' },
      { name: 'BuildEasy Carpentry', rating: 4.4, price: '$55/hr', experience: '7 years', availability: 'Booking 2 days out' },
    ],
    'HVAC Technician': [
      { name: 'CoolBreeze HVAC', rating: 4.8, price: '$80/hr', experience: '14 years', availability: 'Available next week' },
      { name: 'HeatWave Techs', rating: 4.5, price: '$75/hr', experience: '9 years', availability: 'Booking 4 days out' },
    ],
    Painter: [
      { name: 'Fresh Coat Painters', rating: 4.8, price: '$65/hr', experience: '12 years', availability: 'Available next week' },
      { name: 'ColorMasters Painting', rating: 4.6, price: '$70/hr', experience: '8 years', availability: 'Booking 2 weeks out' },
    ],
    Locksmith: [
      { name: 'SecureLock Smiths', rating: 4.7, price: '$50/hr', experience: '10 years', availability: 'Available tomorrow' },
      { name: 'KeySafe Locksmiths', rating: 4.4, price: '$55/hr', experience: '6 years', availability: 'Booking 3 days out' },
    ],
    'Event Planner': [
      { name: 'PerfectPlan Events', rating: 4.9, price: '$100/hr', experience: '15 years', availability: 'Available next week' },
      { name: 'EventJoy Planners', rating: 4.6, price: '$90/hr', experience: '10 years', availability: 'Booking 2 weeks out' },
    ],
    Caterer: [
      { name: 'Tasteful Catering', rating: 4.8, price: '$80/hr', experience: '12 years', availability: 'Available next week' },
      { name: 'FeastMasters', rating: 4.5, price: '$85/hr', experience: '8 years', availability: 'Booking 5 days out' },
    ],
    Photographer: [
      { name: 'SnapPerfect Photography', rating: 4.7, price: '$90/hr', experience: '10 years', availability: 'Available tomorrow' },
      { name: 'FocusFrame Photos', rating: 4.4, price: '$95/hr', experience: '7 years', availability: 'Booking 3 days out' },
    ],
    'DJ/Music': [
      { name: 'BeatDrop DJs', rating: 4.8, price: '$70/hr', experience: '10 years', availability: 'Available next week' },
      { name: 'MelodyMasters', rating: 4.5, price: '$75/hr', experience: '6 years', availability: 'Booking 4 days out' },
    ],
    Decorator: [
      { name: 'Elegant Decor', rating: 4.7, price: '$60/hr', experience: '12 years', availability: 'Available tomorrow' },
      { name: 'StyleSet Decorators', rating: 4.4, price: '$65/hr', experience: '8 years', availability: 'Booking 3 days out' },
    ],
    Security: [
      { name: 'SafeGuard Security', rating: 4.9, price: '$50/hr', experience: '15 years', availability: 'Available next week' },
      { name: 'SecureWatch Team', rating: 4.6, price: '$55/hr', experience: '10 years', availability: 'Booking 2 weeks out' },
    ],
  };

  const vendorList = vendors[serviceName] || [];

  return (
    <div className="book-choose__overlay">
      <div className="book-choose__content">
        <div className="book-choose__header">
          <h3>Select a {serviceName} Service Provider</h3>
          <button className="book-choose__close" onClick={onBack}>✕</button>
        </div>
        <div className="book-choose__vendors">
          {vendorList.map((vendor) => (
            <div key={vendor.name} className="book-choose__vendor-card">
              <h4>{vendor.name}</h4>
              <p className="book-choose__rating">
                <FaStar className="book-choose__star" /> {vendor.rating}
              </p>
              <p>Price: {vendor.price}</p>
              <p>Experience: {vendor.experience}</p>
              <p>Availability: {vendor.availability}</p>
              <button
                className="book-choose__select-button"
                onClick={() => onSelectVendor(vendor)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <button className="book-choose__back-button" onClick={onBack}>
          ← Back to Categories
        </button>
      </div>
    </div>
  );
};

export default BookChoose;
import React, { useState } from 'react';

const bookingsData = [
  {
    id: 1,
    service: 'Birthday Party Hosting',
    vendorName: 'Party Planners Pro',
    vendorType: 'HOST',
    status: 'Confirmed',
    dateTime: 'June 15, 2025 · 2:00 PM - 6:00 PM',
    eventDate: '2025-06-15',
    location: 'Central Park, New York',
    notes: 'Please bring balloons and party hats for 20 guests',
    dateBooked: 'May 10, 2025',
  },
  {
    id: 2,
    service: 'Computer Repair',
    vendorName: 'Tech Repair Masters',
    vendorType: 'FIX',
    status: 'Pending',
    dateTime: 'June 20, 2025 · 10:00 AM - 12:00 PM',
    eventDate: '2025-06-20',
    location: '123 Main St, Apartment 4B',
    notes: "My laptop won't boot up. It's a Dell XPS 15.",
    dateBooked: 'June 1, 2025',
  },
  {
    id: 3,
    service: 'Aircon Cleaning',
    vendorName: 'Cool Breeze Services',
    vendorType: 'FIX',
    status: 'Completed',
    dateTime: 'May 10, 2025 · 1:00 PM - 3:00 PM',
    eventDate: '2025-05-10',
    location: '456 Oak Ave, Springfield',
    notes: 'Please check for leaks and clean thoroughly.',
    dateBooked: 'April 20, 2025',
  },
];

const TABS = [
  { key: 'all', label: 'All Bookings' },
  { key: 'host', label: 'Host Services' },
  { key: 'fix', label: 'Fix Services' },
];

const statusClass = (status) => {
  if (status === 'Confirmed') return 'booking-status-card status-confirmed-card';
  if (status === 'Pending') return 'booking-status-card status-pending-card';
  if (status === 'Cancelled') return 'booking-status-card status-cancelled-card';
  return 'booking-status-card';
};

const vendorTypeClass = (type) => {
  if (type === 'HOST') return 'vendor-type-card vendor-type-host-card';
  if (type === 'FIX') return 'vendor-type-card vendor-type-fix-card';
  return 'vendor-type-card';
};

// Cancel Booking Modal
const CancelBookingModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="vendormodal-overlay">
      <div className="vendormodal-container vendormodal-cancel-small">
        <div className="vendormodal-content vendormodal-cancel-content">
          <h2 className="vendormodal-title vendormodal-cancel-title">Cancel Booking</h2>
          <p className="vendormodal-message vendormodal-cancel-message">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </p>
          <div className="vendormodal-cancel-actions">
            <button className="vendormodal-cancel-btn vendormodal-cancel-btn-secondary" onClick={onClose}>
              No, keep booking
            </button>
            <button className="vendormodal-cancel-btn vendormodal-cancel-btn-danger" onClick={onConfirm}>
              Yes, cancel booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rebook Service Modal
const RebookServiceModal = ({ open, onClose, onConfirm, vendorName }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Generate days for the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  if (!open) return null;
  return (
    <div className="vendormodal-overlay">
      <div className="vendormodal-container vendormodal-rebook-small">
        <div className="vendormodal-content vendormodal-rebook-content">
          <div className="vendormodal-rebook-header">
            <h2 className="vendormodal-title vendormodal-rebook-title">Rebook Service</h2>
            <button className="vendormodal-rebook-close" onClick={onClose}>&times;</button>
          </div>
          <p className="vendormodal-message vendormodal-rebook-message">
            Please select a new date for your booking with {vendorName}.
          </p>
          <div className="vendormodal-rebook-calendar">
            <div className="vendormodal-rebook-calendar-header">
              <button className="vendormodal-rebook-calendar-nav" disabled>{'<'}</button>
              <span className="vendormodal-rebook-calendar-month">
                {today.toLocaleString('default', { month: 'long' })} {year}
              </span>
              <button className="vendormodal-rebook-calendar-nav" disabled>{'>'}</button>
            </div>
            <div className="vendormodal-rebook-calendar-grid">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                <div key={d} className="vendormodal-rebook-calendar-day vendormodal-rebook-calendar-day-label">{d}</div>
              ))}
              {days.map((d, i) => (
                <button
                  key={i}
                  className={`vendormodal-rebook-calendar-day${d && selectedDate === d ? ' selected' : ''}`}
                  disabled={!d}
                  onClick={() => setSelectedDate(d)}
                >
                  {d || ''}
                </button>
              ))}
            </div>
          </div>
          <div className="vendormodal-rebook-actions">
            <button className="vendormodal-rebook-btn vendormodal-rebook-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="vendormodal-rebook-btn vendormodal-rebook-btn-primary"
              onClick={() => onConfirm(selectedDate)}
              disabled={!selectedDate}
            >
              Confirm Rebooking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState(bookingsData);
  const [cancelModal, setCancelModal] = useState({ open: false, bookingId: null });
  const [rebookModal, setRebookModal] = useState({ open: false, bookingId: null });

  const filteredBookings =
    activeTab === 'all'
      ? bookings
      : bookings.filter((b) => b.vendorType.toLowerCase() === activeTab);

  const handleCancelClick = (bookingId) => {
    setCancelModal({ open: true, bookingId });
  };

  const handleCancelConfirm = () => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === cancelModal.bookingId ? { ...b, status: 'Cancelled' } : b
      )
    );
    setCancelModal({ open: false, bookingId: null });
  };

  const handleRebookClick = (bookingId) => {
    setRebookModal({ open: true, bookingId });
  };

  const handleRebookConfirm = (date) => {
    // For demo, just close modal. You can add logic to update bookings if needed.
    setRebookModal({ open: false, bookingId: null });
    // Optionally show a success message
  };

  return (
    <div className="profile-content">
      <div className="bookings-content-card">
        <h1 className="bookings-title-card">My Bookings</h1>
        <div className="bookings-subtitle-card">Manage and view all your booking details</div>
        <div className="bookings-tabs-card">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`bookings-tab-card${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bookings-list-card">
          {filteredBookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-card-header">
                <div className="booking-card-title">{booking.service}</div>
                <div className="booking-card-badges">
                  <span className={vendorTypeClass(booking.vendorType)}>{booking.vendorType}</span>
                  <span className={statusClass(booking.status)}>{booking.status}</span>
                </div>
              </div>
              <div className="booking-card-vendor">with {booking.vendorName}</div>
              <div className="booking-card-details">
                <div className="booking-card-detail-col">
                  <div className="booking-card-label">Date & Time</div>
                  <div className="booking-card-value">{booking.dateTime}</div>
                  <div className="booking-card-label">Date Booked</div>
                  <div className="booking-card-value">{booking.dateBooked}</div>
                </div>
                <div className="booking-card-detail-col">
                  <div className="booking-card-label">Location</div>
                  <div className="booking-card-value">{booking.location}</div>
                  <div className="booking-card-label">Notes/Request</div>
                  <div className="booking-card-value">{booking.notes}</div>
                </div>
              </div>
              {booking.status === 'Pending' && (
                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <button
                    className="vendormodal-button"
                    style={{ background: '#e53935', marginLeft: 'auto' }}
                    onClick={() => handleCancelClick(booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {booking.status === 'Completed' && (
                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <button
                    className="vendormodal-button"
                    style={{ background: '#111827', color: '#fff', marginLeft: 'auto' }}
                    onClick={() => handleRebookClick(booking.id)}
                  >
                    Rebook Service
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <CancelBookingModal
        open={cancelModal.open}
        onClose={() => setCancelModal({ open: false, bookingId: null })}
        onConfirm={handleCancelConfirm}
      />
      <RebookServiceModal
        open={rebookModal.open}
        onClose={() => setRebookModal({ open: false, bookingId: null })}
        onConfirm={handleRebookConfirm}
        vendorName={rebookModal.bookingId ? (bookings.find(b => b.id === rebookModal.bookingId)?.vendorName || '') : ''}
      />
    </div>
  );
};

export default BookingHistory;
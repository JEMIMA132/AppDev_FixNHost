import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Search } from 'lucide-react';
import BookingsModal from './BookingsModal';
import '../../../sass/AdminPages/AdminBookings.scss';

const AdminBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'

  // Sample data - replace with actual API data
  const bookings = [
    {
      id: 'BK001',
      bookingId: 'BK001',
      clientName: 'John Doe',
      vendorName: 'TechFix Pro',
      vendorType: 'Fix Vendor',
      serviceType: 'Computer Repair',
      eventDate: '2024-03-15',
      bookingStatus: 'confirmed',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      dateBooked: '2024-03-10'
    },
    {
      id: 'BK002',
      bookingId: 'BK002',
      clientName: 'Jane Smith',
      vendorName: 'Event Masters',
      vendorType: 'Host Vendor',
      serviceType: 'Wedding Planning',
      eventDate: '2024-04-20',
      bookingStatus: 'pending',
      paymentMethod: 'PayPal',
      paymentStatus: 'pending',
      dateBooked: '2024-03-12'
    },
    // Add more sample data as needed
  ];

  const [bookingsData, setBookingsData] = useState(() => {
    const stored = localStorage.getItem('adminBookingsData');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return bookings;
      }
    }
    return bookings;
  });

  useEffect(() => {
    localStorage.setItem('adminBookingsData', JSON.stringify(bookingsData));
  }, [bookingsData]);

  const handleView = (booking) => {
    setEditingBooking(booking);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookingsData(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleBookingUpdated = (updatedBooking, isEdit) => {
    if (isEdit) {
      setBookingsData(prev => prev.map(b => (b.id === updatedBooking.id ? updatedBooking : b)));
    } else {
      // For add (if needed) – in this example we do not add bookings via modal
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBooking(null);
  };

  const filteredBookings = bookingsData.filter(booking => 
    booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-bookings">
      <div className="admin-bookings__header">
        <h1>Bookings Management</h1>
      </div>

      <div className="admin-bookings__search">
        <div className="search-group">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search bookings by ID, client name, or vendor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-bookings__table-container">
        <table className="admin-bookings__table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Client Name</th>
              <th>Vendor Name</th>
              <th>Vendor Type</th>
              <th>Service Type</th>
              <th>Event/Service Date</th>
              <th>Booking Status</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Date Booked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.bookingId}</td>
                <td>{booking.clientName}</td>
                <td>{booking.vendorName}</td>
                <td>{booking.vendorType}</td>
                <td>{booking.serviceType}</td>
                <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                <td>
                  <span className={`admin-bookings__status admin-bookings__status--${booking.bookingStatus}`}>
                    {booking.bookingStatus}
                  </span>
                </td>
                <td>{booking.paymentMethod}</td>
                <td>
                  <span className={`admin-bookings__payment-status admin-bookings__payment-status--${booking.paymentStatus}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>{new Date(booking.dateBooked).toLocaleDateString()}</td>
                <td>
                  <div className="admin-bookings__actions">
                    <button
                      className="view"
                      onClick={() => handleView(booking)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="edit"
                      onClick={() => handleEdit(booking)}
                      title="Edit Booking"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(booking.id)}
                      title="Delete Booking"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-bookings__pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <BookingsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onBookingUpdated={handleBookingUpdated}
        editMode={modalMode === 'edit'}
        bookingData={editingBooking}
      />
    </div>
  );
};

export default AdminBookings;



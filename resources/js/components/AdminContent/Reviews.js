import React, { useState } from 'react';
import { Eye, Trash2, Search, Star } from 'lucide-react';
import ReviewsModal from './ReviewsModal';
import '../../../sass/AdminPages/Reviews.scss';

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Sample data - replace with actual API data
  const reviews = [
    {
      id: 'RVW001',
      clientName: 'John Doe',
      vendorName: 'TechFix Pro',
      vendorType: 'Fix Vendor',
      serviceBooked: 'Computer Repair',
      rating: 5,
      review: 'Excellent service! The technician was very professional and fixed my computer quickly.',
      dateCreated: '2024-03-15'
    },
    {
      id: 'RVW002',
      clientName: 'Jane Smith',
      vendorName: 'Event Masters',
      vendorType: 'Host Vendor',
      serviceBooked: 'Wedding Planning',
      rating: 4,
      review: 'Great experience overall. The wedding was beautifully organized, though there were some minor delays.',
      dateCreated: '2024-03-12'
    },
    // Add more sample data as needed
  ];

  const handleView = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log('Delete review:', id);
    // Implement delete functionality
  };

  const renderStars = (rating) => {
    return (
      <div className="admin-reviews__rating">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`star ${index < rating ? 'filled' : ''}`}
          />
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => 
    review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-reviews">
      <div className="admin-reviews__header">
        <h1>Reviews Management</h1>
      </div>

      <div className="admin-reviews__search">
        <div className="search-group">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search reviews by ID, client name, or vendor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-reviews__table-container">
        <table className="admin-reviews__table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Vendor Name</th>
              <th>Vendor Type</th>
              <th>Service Booked</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((review) => (
              <tr key={review.id}>
                <td>{review.clientName}</td>
                <td>{review.vendorName}</td>
                <td>{review.vendorType}</td>
                <td>{review.serviceBooked}</td>
                <td>{renderStars(review.rating)}</td>
                <td>
                  <div className="admin-reviews__review-content" title={review.review}>
                    {review.review}
                  </div>
                </td>
                <td>{new Date(review.dateCreated).toLocaleDateString()}</td>
                <td>
                  <div className="admin-reviews__actions">
                    <button
                      className="view"
                      onClick={() => handleView(review)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(review.id)}
                      title="Delete Review"
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
        <div className="admin-reviews__pagination">
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

      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewData={selectedReview}
      />
    </div>
  );
};

export default Reviews;






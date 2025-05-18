import React from 'react';
import { X } from 'lucide-react';

const ReviewsModal = ({ isOpen, onClose, reviewData }) => {
  if (!isOpen || !reviewData) return null;

  return (
    <div className="reviews-modal__overlay">
      <div className="reviews-modal">
        <div className="reviews-modal__header">
          <h2>View Review</h2>
          <button className="reviews-modal__close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="reviews-modal__content">
          <div className="reviews-modal__field-row">
            <div className="reviews-modal__field">
              <label>Client Name</label>
              <input type="text" value={reviewData.clientName} readOnly />
            </div>
            <div className="reviews-modal__field">
              <label>Vendor Name</label>
              <input type="text" value={reviewData.vendorName} readOnly />
            </div>
          </div>
          <div className="reviews-modal__field-row">
            <div className="reviews-modal__field">
              <label>Vendor Type</label>
              <input type="text" value={reviewData.vendorType} readOnly />
            </div>
            <div className="reviews-modal__field">
              <label>Service Booked</label>
              <input type="text" value={reviewData.serviceBooked} readOnly />
            </div>
          </div>
          <div className="reviews-modal__field-row">
            <div className="reviews-modal__field">
              <label>Rating</label>
              <input type="text" value={reviewData.rating} readOnly />
            </div>
            <div className="reviews-modal__field">
              <label>Date Created</label>
              <input type="text" value={new Date(reviewData.dateCreated).toLocaleDateString()} readOnly />
            </div>
          </div>
          <div className="reviews-modal__field-row">
            <div className="reviews-modal__field full-width">
              <label>Review</label>
              <textarea value={reviewData.review} readOnly rows={4} />
            </div>
          </div>
        </div>
        <div className="reviews-modal__actions">
          <button className="reviews-modal__button reviews-modal__button--primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;

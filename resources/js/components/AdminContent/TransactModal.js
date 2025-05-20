import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const TransactModal = ({ isOpen, onClose, onTransactionUpdated, editMode = false, transactionData = null }) => {
  const initialFormData = {
    transactionId: '',
    bookingId: '',
    amount: '',
    currency: 'USD',
    paymentMethod: '',
    paymentStatus: 'pending',
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
    customerName: '',
    vendorName: '',
    receiptNumber: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (transactionData) {
        setFormData({
          ...transactionData,
          customerName: transactionData.customerName || transactionData.clientName || '',
          transactionDate: transactionData.transactionDate || new Date().toISOString().split('T')[0]
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, transactionData]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      onClose();
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const endpoint = editMode ? `/api/transactions/${transactionData.id}` : '/api/transactions';
      const method = editMode ? 'put' : 'post';
      const response = await axios[method](endpoint, formData);
      setSuccessMessage(editMode ? 'Transaction updated successfully!' : 'Transaction added successfully!');
      onTransactionUpdated(response.data, editMode);
      setTimeout(() => { onClose(); }, 1000);
    } catch (err) {
      console.error(`Failed to ${editMode ? 'update' : 'add'} transaction:`, err.response?.data);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({ general: `Failed to ${editMode ? 'update' : 'add'} transaction. Please try again.` });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="transact-modal__overlay">
      <div className="transact-modal">
        <div className="transact-modal__header">
          <h2>{editMode ? (transactionData ? 'Edit Transaction' : 'Add New Transaction') : 'View Transaction'}</h2>
          <button className="transact-modal__close-button" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="transact-modal__form">
          {errors.general && <div className="transact-modal__error">{errors.general}</div>}
          <div className="transact-modal__field-row">
            <div className="transact-modal__field">
              <label htmlFor="transactionId">Transaction ID</label>
              <input type="text" id="transactionId" name="transactionId" value={formData.transactionId} onChange={handleChange} readOnly />
            </div>
            <div className="transact-modal__field">
              <label htmlFor="bookingId">Booking ID</label>
              <input type="text" id="bookingId" name="bookingId" value={formData.bookingId} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.bookingId ? 'is-invalid' : ''} />
              {errors.bookingId && <div className="transact-modal__error">{errors.bookingId[0]}</div>}
            </div>
          </div>
          <div className="transact-modal__field-row">
            <div className="transact-modal__field">
              <label htmlFor="amount">Amount</label>
              <input type="number" step="0.01" id="amount" name="amount" value={formData.amount} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.amount ? 'is-invalid' : ''} />
              {errors.amount && <div className="transact-modal__error">{errors.amount[0]}</div>}
            </div>
            <div className="transact-modal__field">
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency" value={formData.currency} onChange={handleChange} disabled={!editMode} className={errors.currency ? 'is-invalid' : ''}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              {errors.currency && <div className="transact-modal__error">{errors.currency[0]}</div>}
            </div>
          </div>
          <div className="transact-modal__field-row">
            <div className="transact-modal__field">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} disabled={!editMode} className={errors.paymentMethod ? 'is-invalid' : ''}>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
              {errors.paymentMethod && <div className="transact-modal__error">{errors.paymentMethod[0]}</div>}
            </div>
            <div className="transact-modal__field">
              <label htmlFor="paymentStatus">Payment Status</label>
              <select id="paymentStatus" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} disabled={!editMode} className={errors.paymentStatus ? 'is-invalid' : ''}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              {errors.paymentStatus && <div className="transact-modal__error">{errors.paymentStatus[0]}</div>}
            </div>
          </div>
          <div className="transact-modal__field-row">
            <div className="transact-modal__field">
              <label htmlFor="transactionDate">Transaction Date</label>
              <input type="date" id="transactionDate" name="transactionDate" value={formData.transactionDate} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.transactionDate ? 'is-invalid' : ''} />
              {errors.transactionDate && <div className="transact-modal__error">{errors.transactionDate[0]}</div>}
            </div>
            <div className="transact-modal__field">
              <label htmlFor="receiptNumber">Receipt Number</label>
              <input type="text" id="receiptNumber" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.receiptNumber ? 'is-invalid' : ''} />
              {errors.receiptNumber && <div className="transact-modal__error">{errors.receiptNumber[0]}</div>}
            </div>
          </div>
          <div className="transact-modal__field-row">
            <div className="transact-modal__field">
              <label htmlFor="customerName">Customer Name</label>
              <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.customerName ? 'is-invalid' : ''} />
              {errors.customerName && <div className="transact-modal__error">{errors.customerName[0]}</div>}
            </div>
            <div className="transact-modal__field">
              <label htmlFor="vendorName">Vendor Name</label>
              <input type="text" id="vendorName" name="vendorName" value={formData.vendorName} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.vendorName ? 'is-invalid' : ''} />
              {errors.vendorName && <div className="transact-modal__error">{errors.vendorName[0]}</div>}
            </div>
          </div>
          <div className="transact-modal__field-row">
            <div className="transact-modal__field full-width">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} readOnly={!editMode} required={editMode} className={errors.description ? 'is-invalid' : ''} rows="3" />
              {errors.description && <div className="transact-modal__error">{errors.description[0]}</div>}
            </div>
          </div>
          <div className="transact-modal__actions">
            <button type="button" className="transact-modal__button transact-modal__button--secondary" onClick={onClose} disabled={loading}>Cancel</button>
            {editMode ? (
              <button type="submit" className="transact-modal__button transact-modal__button--primary" disabled={loading}>{loading ? 'Updating...' : 'Update Transaction'}</button>
            ) : (
              <button type="submit" className="transact-modal__button transact-modal__button--primary" disabled={loading}>Close</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactModal;


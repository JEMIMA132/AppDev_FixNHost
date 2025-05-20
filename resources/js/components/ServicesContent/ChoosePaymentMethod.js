import React, { useState } from 'react';


const paymentOptions = [
  { key: 'card', label: 'Credit/Debit Card' },
  { key: 'bank', label: 'Bank Transfer' },
  { key: 'cash', label: 'Pay on Cash' },
];

const ChoosePaymentMethod = ({ onBack, onConfirm }) => {
  const [selected, setSelected] = useState('card');

  const handleConfirm = () => {
    if (onConfirm) onConfirm(selected);
  };

  return (
    <div className="choose-payment__overlay">
      <div className="choose-payment__modal">
        <h2 className="choose-payment__title">Choose Payment Method</h2>
        <div className="choose-payment__options">
          {paymentOptions.map((opt) => (
            <div
              key={opt.key}
              className={`choose-payment__option${selected === opt.key ? ' selected' : ''}`}
              onClick={() => setSelected(opt.key)}
            >
              <span className="choose-payment__radio">
                <span className={`choose-payment__dot${selected === opt.key ? ' filled' : ''}`}></span>
              </span>
              <span className="choose-payment__label">{opt.label}</span>
            </div>
          ))}
        </div>
        <div className="choose-payment__actions">
          <button className="choose-payment__back-btn" onClick={onBack}>Back</button>
          <button className="choose-payment__confirm-btn" onClick={handleConfirm}>
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePaymentMethod;

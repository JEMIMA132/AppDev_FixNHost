import React, { useState } from 'react';
import { Wallet, CreditCard } from 'lucide-react';
import '../../../sass/VendorPages/VendorPayment.scss';

const VendorPayment = ({ onCompleteRegistration }) => {
  const [method, setMethod] = useState('wallet');
  return (
    <div className="vendorpayment-card">
      <h2 className="vendorpayment-title">Payment Method</h2>
      <div className="vendorpayment-methods">
        <div
          className={`vendorpayment-method${method === 'card' ? ' selected' : ''}`}
          onClick={() => setMethod('card')}
        >
          <span className="vendorpayment-method__icon">
            <CreditCard color="#0097B2" size={28} strokeWidth={2} />
          </span>
          <div>
            <div className="vendorpayment-method__label">Credit Card</div>
            <div className="vendorpayment-method__desc">Pay securely with your card</div>
          </div>
        </div>
        <div
          className={`vendorpayment-method${method === 'wallet' ? ' selected' : ''}`}
          onClick={() => setMethod('wallet')}
        >
          <span className="vendorpayment-method__icon">
            <Wallet color="#0097B2" size={28} strokeWidth={2} />
          </span>
          <div>
            <div className="vendorpayment-method__label">Digital Wallet</div>
            <div className="vendorpayment-method__desc">Pay with your digital wallet</div>
          </div>
        </div>
      </div>
      {/* Mock input fields for selected method */}
      {method === 'card' && (
        <div className="vendorpayment-mockform">
          <input className="vendorpayment-mockinput" type="text" placeholder="Card Number" />
          <input className="vendorpayment-mockinput" type="text" placeholder="Name on Card" />
          <div className="vendorpayment-mockrow">
            <input className="vendorpayment-mockinput" type="text" placeholder="MM/YY" />
            <input className="vendorpayment-mockinput" type="text" placeholder="CVV" />
          </div>
        </div>
      )}
      {method === 'wallet' && (
        <div className="vendorpayment-mockform">
          <input className="vendorpayment-mockinput" type="text" placeholder="Wallet Name (e.g. GCash)" />
          <input className="vendorpayment-mockinput" type="text" placeholder="Wallet Number" />
        </div>
      )}
      {/* No fields for cash */}
      <div className="vendorpayment-breakdown">
        <div className="vendorpayment-row">
          <span>Registration Fee</span>
          <span className="vendorpayment-bold">$99.00</span>
        </div>
        <div className="vendorpayment-row">
          <span>Platform Fee</span>
          <span className="vendorpayment-bold">$10.00</span>
        </div>
        <div className="vendorpayment-row">
          <span>Tax</span>
          <span className="vendorpayment-bold">$10.90</span>
        </div>
        <hr className="vendorpayment-divider" />
        <div className="vendorpayment-row vendorpayment-total">
          <span>Total</span>
          <span className="vendorpayment-total-amount">$119.90</span>
        </div>
      </div>
      <button className="vendorpayment-submit" type="button" onClick={onCompleteRegistration}>
        Complete Registration
      </button>
      <div className="vendorpayment-terms">
        By completing registration you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default VendorPayment;

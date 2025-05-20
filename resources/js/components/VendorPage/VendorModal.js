import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import '../../../sass/VendorPages/VendorModal.scss';

const VendorModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Simulate loading for 2 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="vendormodal-overlay">
      <div className="vendormodal-container">
        <div className="vendormodal-content">
          {isLoading ? (
            <>
              <div className="vendormodal-loader">
                <Loader2 className="vendormodal-spinner" size={48} />
              </div>
              <h2 className="vendormodal-title">Processing Registration</h2>
              <p className="vendormodal-message">Please wait while we complete your registration...</p>
            </>
          ) : (
            <>
              <div className="vendormodal-success">
                <CheckCircle2 className="vendormodal-icon" size={64} />
              </div>
              <h2 className="vendormodal-title">Registration Successful!</h2>
              <p className="vendormodal-message">
                Thank you for registering as a vendor. Your account is now being set up.
              </p>
              <button className="vendormodal-button" onClick={onClose}>
                Continue to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorModal;




import React, { useRef } from 'react';
import { Image } from 'lucide-react';
import '../../../sass/VendorPages/VendorCForm.scss';

const VendorCForm = () => {
  const credInputRef = useRef(null);
  const portInputRef = useRef(null);

  return (
    <div className="vendorcform-card">
      <h2 className="vendorcform-title">
        <span className="vendorcform-title__icon">
          {/* document icon */}
          <svg width="24" height="24" fill="none" stroke="#0097B2" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
        </span>
        Credentials & Portfolio
      </h2>
      <div className="vendorcform-row">
        <div className="vendorcform-group">
          <label className="vendorcform-label">Professional Credentials</label>
          <span className="vendorcform-desc">Upload certificates, permits or licenses</span>
          <div
            className="vendorcform-upload"
            onClick={() => credInputRef.current.click()}
          >
            <span className="vendorcform-upload__icon">
              <Image color="#0097B2" size={24} strokeWidth={2} />
            </span>
            <span className="vendorcform-upload__text">Choose files or drag and drop</span>
            <input
              type="file"
              multiple
              ref={credInputRef}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="vendorcform-group">
          <label className="vendorcform-label">Portfolio Samples</label>
          <span className="vendorcform-desc">Upload examples of your work</span>
          <div
            className="vendorcform-upload"
            onClick={() => portInputRef.current.click()}
          >
            <span className="vendorcform-upload__icon">
              <Image color="#0097B2" size={24} strokeWidth={2} />
            </span>
            <span className="vendorcform-upload__text">Choose files or drag and drop</span>
            <input
              type="file"
              multiple
              ref={portInputRef}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCForm;


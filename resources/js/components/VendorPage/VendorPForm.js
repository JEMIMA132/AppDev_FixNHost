import React, { useRef, useState } from 'react';
import { Image } from 'lucide-react';


const VendorPForm = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="vendorpform-card">
      <h2 className="vendorpform-title">
        <span className="vendorpform-title__icon">{/* user icon */}
          <svg width="24" height="24" fill="none" stroke="#0097B2" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
        </span>
        Basic Information
      </h2>
      <form className="vendorpform-form">
        <div className="vendorpform-row">
          <div className="vendorpform-group">
            <label className="vendorpform-label">Full Name / Business Name</label>
            <input className="vendorpform-input" type="text" placeholder="Enter your name or business name" />
          </div>
          <div className="vendorpform-group vendorpform-upload-group">
            <label className="vendorpform-label">Profile Picture / Logo</label>
            <span className="vendorpform-desc">Upload a professional photo or logo (JPG, PNG)</span>
            <div
              className="vendorpform-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="vendorpform-upload__preview"
                />
              ) : (
                <>
                  <span className="vendorpform-upload__icon">
                    <Image color="#0097B2" size={40} strokeWidth={2} />
                  </span>
                  <span className="vendorpform-upload__text">Upload</span>
                </>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <button
              type="button"
              className="vendorpform-choosefile"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="vendorpform-choosefile__icon">
                <svg width="18" height="18" fill="none" stroke="#0097B2" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="8" rx="2"/><path d="M18 12v6"/><path d="M21 15h-6"/></svg>
              </span>
              Choose File
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VendorPForm;


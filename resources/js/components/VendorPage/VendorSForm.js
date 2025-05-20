import React from 'react';
import { Image } from 'lucide-react';
import '../../../sass/VendorPages/VendorSForm.scss';

const VendorSForm = () => {
  return (
    <div className="vendorsform-card">
      <h2 className="vendorsform-title">
        <span className="vendorsform-title__icon">
          {/* gift icon */}
          <svg width="24" height="24" fill="none" stroke="#0097B2" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 3a2 2 0 0 1 0 4c-2 0-4-2-4-2s2 2 4 2"/><path d="M8 3a2 2 0 0 0 0 4c2 0 4-2 4-2s-2 2-4 2"/><path d="M12 7v13"/></svg>
        </span>
        Service Details
      </h2>
      <form className="vendorsform-form">
        <div className="vendorsform-group">
          <label className="vendorsform-label">Service Title</label>
          <input className="vendorsform-input" type="text" placeholder="e.g. Professional Wedding Photography" />
          <span className="vendorsform-desc">A concise title for your service offering</span>
        </div>
        <div className="vendorsform-group">
          <label className="vendorsform-label">Service Description / Experience</label>
          <textarea className="vendorsform-textarea" rows={4} placeholder="Describe your service and highlight your experience..." />
        </div>
        <div className="vendorsform-group">
          <label className="vendorsform-label">Pricing Details</label>
          <textarea className="vendorsform-textarea" rows={3} placeholder="Describe your pricing structure, packages, etc." />
        </div>
        <div className="vendorsform-group">
          <label className="vendorsform-label">
            <span className="vendorsform-label__icon">
              <svg width="18" height="18" fill="none" stroke="#0097B2" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/><circle cx="12" cy="11" r="3"/></svg>
            </span>
            Service Area
          </label>
          <input className="vendorsform-input" type="text" placeholder="e.g. San Francisco, CA" />
          <span className="vendorsform-desc">City, municipality, or region where you provide services</span>
        </div>
      </form>
    </div>
  );
};

export default VendorSForm;


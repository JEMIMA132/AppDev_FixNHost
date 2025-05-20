import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Headers/Header'; 
import Footer from '../Footers/Footer'; 
import VendorPForm from './VendorPForm';
import VendorSForm from './VendorSForm';
import VendorCForm from './VendorCForm';
import VendorAForm from './VendorAForm';
import VendorPayment from './VendorPayment';
import VendorModal from './VendorModal';
import '../../../sass/VendorPages/VendorProfile.scss';

const steps = [1, 2, 3];

const VendorProfile = () => {
  const [currentStep, setCurrentStep] = useState(1); // 0-based index
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCompleteRegistration = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(2);
    navigate('/profile');
  };

  return (
    <div className="vendor-profile">
      <Header />
      <div className="vendorprofile-title-section vendorprofile-title-global">
        <h1 className="vendorprofile-title">Vendor Registration</h1>
        <div className="vendorprofile-progressbar minimal">
          {steps.map((step, idx) => (
            <React.Fragment key={step}>
              <div className={`progress-step-minimal${idx < currentStep ? ' completed' : ''}${idx === currentStep ? ' current' : ''}`}> 
                <div className="progress-circle-minimal">
                  {idx < currentStep ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#0097B2"/><path d="M6 10.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : idx === currentStep ? (
                    <span className="progress-dot-outer"><span className="progress-dot-inner"></span></span>
                  ) : (
                    <span className="progress-dot-grey"></span>
                  )}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className={`progress-bar-segment-minimal${idx < currentStep ? ' completed' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <main className="vendor-profile__main vendorprofile-checkout-layout">
        <div className="vendorprofile-checkout-left">
          {currentStep < 2 ? (
            <div className="vendorprofile-formcard">
              <VendorPForm />
              <VendorSForm />
              <VendorCForm />
              <VendorAForm />
            </div>
          ) : null}
        </div>
        <div className="vendorprofile-checkout-right">
          {currentStep < 2 && <VendorPayment onCompleteRegistration={handleCompleteRegistration} />}
        </div>
      </main>
      <VendorModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};

export default VendorProfile;
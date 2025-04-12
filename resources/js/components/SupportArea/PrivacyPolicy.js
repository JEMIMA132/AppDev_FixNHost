import React from 'react';
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';


const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <Header />
      <div className="privacy-policy-container">
        <div className="privacy-policy">
          <h1>Privacy Policy</h1>
          
          <div className="policy-content">
            <div className="policy-intro">
              At FixNHost, Your Privacy Is Important To Us. This Privacy Policy Explains How We Collect, Use, 
              And Protect Your Personal Information When You Use Our Platform.
            </div>

            <section>
              <h2>Information We Collect</h2>
              <p>We Collect The Following Information:</p>
              <ul>
                <li>Personal Details (Name, Email, Phone Number)</li>
                <li>Location Information (For Service Delivery)</li>
                <li>Payment Details (Processed Securely Via Third-Party Gateways)</li>
                <li>Service Usage Data (Browsing History, Reviews)</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <ul>
                <li>To Provide And Improve Our Services</li>
                <li>To Connect Users With Vendors Or Clients</li>
                <li>To Send Updates, Promotions, Or Important Notices</li>
                <li>For Customer Support And Dispute Resolution</li>
                <li>For Legal And Security Purposes</li>
              </ul>
            </section>

            <section>
              <h2>Sharing Your Information</h2>
              <p>We Do Not Sell Your Personal Data. We Only Share Information With:</p>
              <ul>
                <li>Service Providers (Only What Is Necessary For Bookings)</li>
                <li>Payment Processing Partners (To Complete Secure Transactions)</li>
                <li>Authorities If Legally Required</li>
              </ul>
            </section>

            <section>
              <h2>Your Rights</h2>
              <ul>
                <li>You Can Update Or Delete Your Account Anytime</li>
                <li>You May Request A Copy Of Your Data</li>
                <li>You Can Unsubscribe From Marketing Communications</li>
              </ul>
            </section>

            <section>
              <h2>Data Collections</h2>
              <p>We Use Encryption, Secure Servers, And Account Authentication To Protect Your Information.</p>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>We Use Cookies To Enhance Your Experience. You Can Disable Them In Your Browser Settings.</p>
            </section>

            <section>
              <h2>Changes To This Policy</h2>
              <p>We May Update This Policy And Notify You Via Email Or Platform Alerts.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 
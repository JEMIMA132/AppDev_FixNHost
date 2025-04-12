import React from 'react';
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <Header />
      <div className="terms-container">
        <div className="terms-content">
          <h1>Terms of Service</h1>

          <div className="terms-intro">
            Welcome To FixNHost! By Using Our Website Or App, You Agree To The Following Terms:
          </div>

          <section>
            <h2>Account Registration</h2>
            <ul>
              <li>Users Must Provide Accurate And Complete Information</li>
              <li>Users Are Responsible For Keeping Their Account Secure</li>
              <li>Vendors Must Provide Honest Descriptions Of Their Services</li>
            </ul>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <ul>
              <li>Respectful Behavior Toward Other Users Is Required</li>
              <li>No Spam, Scams, Or Misuse Of The Platform</li>
              <li>Report Suspicious Or Harmful Activity To Our Support Team</li>
            </ul>
          </section>

          <section>
            <h2>Bookings & Payments</h2>
            <ul>
              <li>All Bookings Must Be Made Through FixNHost's Platform</li>
              <li>FixNHost Deducts A Service Fee Before Paying Vendors</li>
              <li>Cancellations And Refunds Are Handled Per Our Cancellation Policy</li>
            </ul>
          </section>

          <section>
            <h2>Vendor Guidelines</h2>
            <ul>
              <li>Only Qualified Vendors May List Services</li>
              <li>Vendors Are Responsible For Fulfilling Services Professionally And On Time</li>
              <li>Violation Of Trust (E.G., No-Shows, Fraud) May Result In Account Suspension</li>
            </ul>
          </section>

          <section>
            <h2>Limitations Of Liability</h2>
            <ul>
              <li>FixNHost Is Not Responsible For Damages Resulting From Poor Service Or Vendor/Client Disputes</li>
              <li>We Act As A Platform To Connect Service Providers And Customers</li>
            </ul>
          </section>

          <section>
            <h2>Terminations</h2>
            <p>We Reserve The Right To Suspend Or Terminate Accounts That Violate Our Policies</p>
          </section>

          <section>
            <h2>Changes To Terms</h2>
            <p>Terms May Be Updated. Continued Use Means You Accept The Changes.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService; 
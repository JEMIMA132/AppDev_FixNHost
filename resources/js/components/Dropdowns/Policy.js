// Policy.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../Headers/Header'; // Adjust path as needed
import Footer from '../Footers/Footer'; // Adjust path as needed


const Policy = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleReturnToHome = () => {
    navigate('/homepage'); // Navigate to /homepage on click
  };

  return (
    <>
      <Header />
      <section className="policy">
        <div className="policy__header">
          <h2>Privacy Policy</h2>
          <p className="last-updated">Last Updated: April 13, 2025</p>
        </div>

        <div className="policy__content">
          <h3>Introduction</h3>
          <p>
            At RepairNexus, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h3>Information We Collect</h3>
          <p>
            We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username, or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes payment card details.</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system, and platform.</li>
            <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products, and services.</li>
            <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          </ul>

          <h3>Data Security</h3>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h3>Your Legal Rights</h3>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>

          <h3>Contact Us</h3>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <div className="policy__contact">
            <p><strong>Email:</strong> privacy@repairnexus.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Main Street, Anytown, USA 12345</p>
          </div>
        </div>

        <div className="policy__return">
          <button className="return-button" onClick={handleReturnToHome}>
            Return to Home
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Policy;
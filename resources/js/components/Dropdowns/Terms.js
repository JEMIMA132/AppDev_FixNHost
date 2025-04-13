// Terms.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Headers/Header'; // Adjust path as needed
import Footer from '../Footers/Footer'; // Adjust path as needed


const Terms = () => {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate('/homepage');
  };

  return (
    <>
      <Header />
      <section className="terms">
        <div className="terms__header">
          <h2>Terms of Service</h2>
          <p className="last-updated">Last Updated: April 13, 2025</p>
        </div>

        <div className="terms__content">
          <h3>1. Introduction</h3>
          <p>
            Welcome to RepairNexus. These Terms of Service ("Terms") govern your use of our website, products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Services.
          </p>

          <h3>2. Use of Our Services</h3>
          <p>
            You must follow any policies made available to you within the Services. You may not misuse our Services. For example, you may not:
          </p>
          <ul>
            <li>Engage in any unlawful activity or activity that violates third-party rights;</li>
            <li>Try to access or use the Services in a way not authorized by RepairNexus;</li>
            <li>Engage in any activity that interferes with or disrupts the Services;</li>
            <li>Use any automated means or interface not provided by us to access the Services;</li>
            <li>Attempt to bypass any measure aimed at preventing or restricting access to the Services;</li>
            <li>Impersonate or misrepresent your affiliation with any person or entity.</li>
          </ul>

          <h3>3. User Accounts</h3>
          <p>
            When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Services.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
          </p>

          <h3>4. Service Providers and Vendors</h3>
          <p>
            Service providers and vendors who register on our platform agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information about their services, qualifications, and pricing;</li>
            <li>Maintain high standards of professionalism and quality when providing services;</li>
            <li>Respond promptly to inquiries and bookings;</li>
            <li>Comply with all applicable laws and regulations related to their services;</li>
            <li>Maintain appropriate insurance coverage;</li>
            <li>Not engage in false advertising or misrepresentation of their services.</li>
          </ul>

          <h3>5. Intellectual Property</h3>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of RepairNexus and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of RepairNexus.
          </p>

          <h3>6. Payment Terms</h3>
          <p>
            We use third-party payment processors to process payments made to us. Your payment information is processed securely by these payment processors, and we do not store your payment information.
          </p>
          <p>
            For service bookings, a deposit may be required. Cancellation policies vary by service provider, and details will be provided at the time of booking.
          </p>

          <h3>7. Limitation of Liability</h3>
          <p>
            In no event shall RepairNexus, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>

          <h3>8. Changes to Terms</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h3>9. Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>

          <h3>10. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="terms__contact">
            <p><strong>Email:</strong> legal@repairnexus.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Main Street, Anytown, USA 12345</p>
          </div>
        </div>

        <div className="terms__return">
          <button className="return-button" onClick={handleReturnToHome}>
            Return to Home
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Terms;
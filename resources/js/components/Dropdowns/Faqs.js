// Faqs.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaEnvelope } from 'react-icons/fa'; // Import React Icons
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';

const Faqs = () => {
  const navigate = useNavigate();
  
  const [openSections, setOpenSections] = useState({
    general: [],
    customers: [],
    serviceProviders: [],
  });

  const faqData = {
    general: [
      {
        question: 'What is RepairNexus?',
        answer: 'RepairNexus is a platform that connects customers with reliable service providers for various repair and maintenance needs, ensuring quality and convenience.',
      },
      {
        question: 'How does RepairNexus work?',
        answer: 'Customers can browse services, book a provider, and manage appointments through our platform. Service providers can register, list their services, and connect with customers.',
      },
      {
        question: 'Is using RepairNexus free?',
        answer: 'Creating an account and browsing services on RepairNexus is free for customers. Service providers may have associated fees for listing their services.',
      },
      {
        question: 'How do I create an account?',
        answer: 'Click the "Login/Register" button on the homepage, then select "Register" to create an account with your email, name, and password.',
      },
    ],
    customers: [
      {
        question: 'How do I book a service?',
        answer: 'Browse the services on our platform, select a provider, choose a date and time, and confirm your booking. You’ll receive a confirmation email with the details.',
      },
      {
        question: 'Can I cancel a booking?',
        answer: 'Yes, you can cancel a booking through your account dashboard. Cancellation policies may vary depending on the service provider.',
      },
      {
        question: 'How do I pay for services?',
        answer: 'Payments are processed securely through our platform. You can pay using credit/debit cards or other available payment methods at the time of booking.',
      },
      {
        question: 'What if I’m not satisfied with the service?',
        answer: 'Contact our support team within 48 hours of the service. We’ll investigate and work with the provider to resolve the issue, which may include a refund or re-service.',
      },
    ],
    serviceProviders: [
      {
        question: 'How do I become a vendor on RepairNexus?',
        answer: 'Register as a service provider on our platform, submit your credentials and service details, and get verified by our team to start offering services.',
      },
      {
        question: 'What fees do service providers pay?',
        answer: 'Service providers may pay a listing fee or a commission per booking, depending on the plan they choose. Details are available during registration.',
      },
      {
        question: 'How do I receive payments?',
        answer: 'Payments are transferred to your registered bank account after completing a service, minus any applicable fees. Payouts are typically processed weekly.',
      },
      {
        question: 'How can I improve my visibility on the platform?',
        answer: 'Complete your profile, respond promptly to customer inquiries, maintain high ratings, and consider premium listing options to boost your visibility.',
      },
    ],
  };

  const toggleSection = (category, index) => {
    setOpenSections((prev) => {
      const isOpen = prev[category].includes(index);
      if (isOpen) {
        return { ...prev, [category]: prev[category].filter((i) => i !== index) };
      }
      return { ...prev, [category]: [...prev[category], index] };
    });
  };

  const handleContactUs = () => {
    navigate('/contactus');
  };

  return (
    <>
      <Header />
      <section className="faqs">
        <div className="faqs__header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to the most common questions about RepairNexus services.</p>
        </div>

        <div className="faqs__content">
          <h3>General</h3>
          {faqData.general.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection('general', index)}
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`arrow ${openSections.general.includes(index) ? 'open' : ''}`}
                />
              </div>
              {openSections.general.includes(index) && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}

          <h3>For Customers</h3>
          {faqData.customers.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection('customers', index)}
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`arrow ${openSections.customers.includes(index) ? 'open' : ''}`}
                />
              </div>
              {openSections.customers.includes(index) && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}

          <h3>For Service Providers</h3>
          {faqData.serviceProviders.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection('serviceProviders', index)}
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`arrow ${openSections.serviceProviders.includes(index) ? 'open' : ''}`}
                />
              </div>
              {openSections.serviceProviders.includes(index) && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faqs__contact">
          <h4>Still have questions?</h4>
          <p>Our support team is available to help you with any other questions you might have.</p>
          <button className="contact-button" onClick={handleContactUs}>
            <FaEnvelope className="icon" /> Contact Us
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Faqs;
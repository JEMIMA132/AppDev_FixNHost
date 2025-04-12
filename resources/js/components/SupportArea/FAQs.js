import React, { useState } from 'react';
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What Is FixNHost?",
      answer: "FixNHost Is A Web-Based Platform That Connects Users With Trusted Home Service Providers (Like Electricians, Plumbers, And Carpenters) And Event Vendors (Like Decorators, Caterers, And DJs). We Make Booking Services Fast, Secure, And Convenient."
    },
    {
      question: "How Do I Book A Service?",
      answer: "Simply Sign Up Or Log In To Your Account, Browse The Service Categories, Choose A Provider, And Schedule A Booking. You Can Pay Securely Through Our Platform."
    },
    {
      question: "How Can I Become A Vendor On FixNHost?",
      answer: "You Can Register As A Vendor By Clicking 'Sign Up As A Vendor' On The Homepage. After Submitting Your Details, Our Team Will Review And Verify Your Profile Before Approval."
    },
    {
      question: "Is It Safe To Use FixNHost?",
      answer: "Yes. All Service Providers Go Through A Verification Process, And Payments Are Processed Securely. We Also Have A Customer Support Team For Issue Resolution."
    },
    {
      question: "How Are Service Providers Verified?",
      answer: "Each Vendor Is Required To Submit Identity And Skill-Related Documents. We Manually Review Each Profile To Ensure Credibility And Safety."
    },
    {
      question: "Can I Cancel Or Reschedule A Booking?",
      answer: "Yes. You Can Cancel Or Reschedule Bookings Through Your Dashboard. Just Make Sure To Do It Within The Allowed Time Frame (Based On Our Cancellation Policy)."
    },
    {
      question: "What Is Im Not Satisfied With The Service?",
      answer: "You Can Leave A Review And Contact Our Support Team For Help. If Needed, We Will Mediate Between You And The Service Provider To Resolve The Issue."
    },
    {
      question: "Are There Any Hidden/fees?",
      answer: "No Hidden Fees! The Total Cost Is Displayed Before You Confirm Your Booking. Our Platform Earns Through A Small Commission From Each Transaction."
    },
    {
      question: "Do I Need To Install An App?",
      answer: "No! You Can Access FixNHost Through Your Mobile Or Desktop Browser. A Dedicated Mobile App Is Planned For Future Updates."
    },
    {
      question: "How Do I Contact Support?",
      answer: "You Can Reach Our Support Team Via The Contact Us Page Or Use The Chat Support Available On The Platform During Working Hours."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  const renderFaqItem = (faq, index) => (
    <div 
      key={index} 
      className={`faq-item ${activeIndex === index ? 'active' : ''}`}
      onClick={() => toggleAccordion(index)}
    >
      <div className="faq-question">
        {faq.question}
        <span className="arrow"></span>
      </div>
      <div className="faq-answer">
        {faq.answer}
      </div>
    </div>
  );

  return (
    <div className="faqs-page">
      <Header />
      <div className="faqs-container">
        <div className="container">
          <div className="faqs-content">
            <h1>FREQUENTLY ASKED QUESTIONS (FAQ)</h1>
            
            <div className="faq-list">
              <div className="faq-column">
                {leftColumnFaqs.map((faq, index) => renderFaqItem(faq, index))}
              </div>
              <div className="faq-column">
                {rightColumnFaqs.map((faq, index) => renderFaqItem(faq, index + midPoint))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs; 
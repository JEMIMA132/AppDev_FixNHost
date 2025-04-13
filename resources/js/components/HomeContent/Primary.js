import React from 'react';


const Primary = () => {
  return (
    <section className="primary">
      <h2>Simple Service Process</h2>
      <div className="primary__content">
        <div className="primary__image-container">
          <img src="/images/services.svg" alt="Service Process" className="primary__image" />
        </div>
        <div className="primary__steps">
          <div className="primary__step">
            <h3>1. Browse & Choose a Service</h3>
            <p>Easily explore a range of services—from home repairs to event planning—through our user-friendly platform.</p>
          </div>
          <div className="primary__step">
            <h3>2. Book a Verified Provider</h3>
            <p>Select from verified professionals with ratings and reviews to match your specific needs and schedule.</p>
          </div>
          <div className="primary__step">
            <h3>3. Real-Time Confirmation</h3>
            <p>Receive instant booking confirmation and communicate with your chosen service provider through the platform.</p>
          </div>
          <div className="primary__step">
            <h3>4. Service Completion & Quality Assurance</h3>
            <p>Your provider delivers the service as scheduled. Afterwards, we ensure the job meets quality standards and your expectations.</p>
          </div>
          <div className="primary__step">
            <h3>5. Secure Payment & Feedback</h3>
            <p>Pay securely within the app and leave a review to help others. Your feedback helps us maintain trusted and reliable service.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Primary;
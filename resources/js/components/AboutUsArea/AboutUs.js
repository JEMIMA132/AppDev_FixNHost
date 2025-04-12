import React from 'react';
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';


const AboutUs = () => {
  return (
    <div className="about-page">
      <Header />
      <div className="about-container">
        <div className="container">
          <section className="about-section">
            <div className="about-content">
              <h2>ABOUT US</h2>
              <ul>
                <li>To connect customers with skilled and verified professionals in real time.</li>
                <li>To empower local service providers and event vendors by expanding their digital reach.</li>
                <li>To simplify service booking through a seamless, user-friendly interface.</li>
                <li>To ensure service transparency, quality, and satisfaction with every transaction.</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="/images/about us.svg" alt="About FixNHost" />
            </div>
          </section>

          <section className="mission-section">
            <div className="mission-image">
              <img src="/images/mission.svg" alt="Our Mission" />
            </div>
            <div className="mission-content">
              <h2>MISSION</h2>
              <p>
                Our mission at FixNHost is to connect customers with skilled and verified 
                professionals in real time, ensuring convenience and trust with every service 
                booked. We aim to empower local service providers and event vendors by 
                expanding their digital reach and creating new opportunities for growth. By 
                offering a seamless, user-friendly interface, we simplify the service booking 
                process from start to finish. At the core of our platform is a commitment to 
                transparency, quality, and customer satisfaction in every transaction.
              </p>
            </div>
          </section>

          <section className="vision-section">
            <div className="vision-content">
              <h2>VISION</h2>
              <p>
                To be the Philippines' most trusted online marketplace for home services and 
                event planning, making professional help accessible, reliable, and affordable 
                for every household and business.
              </p>
            </div>
            <div className="vision-image">
              <img src="/images/vision.svg" alt="Our Vision" />
            </div>
          </section>

          <section className="story-section">
            <div className="story-image">
              <img src="/images/ourstory.svg" alt="Our Story" />
            </div>
            <div className="story-content">
              <h2>OUR STORY</h2>
              <p>
                FixNHost began as a student-led project with one goal: to make it easier for people to find 
                trusted home repair and event service providers in one convenient platform. It was inspired 
                by common frustrations — hard-to-reach handymen, scattered listings, and no way to verify 
                service quality.
              </p>
              <p>
                The platform was designed with three core users in mind: clients, service providers, and 
                admins. It features a clean booking system, emergency service options, and dynamic 
                profiles. Vendors can register under "Fix" (electricians, plumbers, etc.) or "Host" (event 
                planners, caterers, etc.), showcase their work, set schedules, and manage payments.
              </p>
              <p>
                Built from the ground up with the local community in mind, FixNHost is more than just a 
                booking app — it's a digital bridge connecting people to dependable help, anytime they need 
                it.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs; 
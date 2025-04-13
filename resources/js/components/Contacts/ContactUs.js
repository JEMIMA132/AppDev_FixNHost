// ContactUs.js
import React from 'react';
import Header from '../Headers/Header'; // Adjust path based on your folder structure
import Footer from '../Footers/Footer'; // Adjust path based on your folder structure
import ContactHero from '../Contacts/ContactHero'; // Import the new ContactHero component
import ContactForm from '../Contacts/ContactForm';

const ContactUs = () => {
    return (
      <div className="contact-us">
        <Header />
        <main>
          <ContactHero />
          <ContactForm />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default ContactUs;
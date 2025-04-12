import React, { useState } from 'react';
import Header from '../Headers/Header';
import Footer from '../Footers/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      try {
        // Simulate random success/failure for demonstration
        if (Math.random() > 0.5) {
          throw new Error('Failed to send message. Please try again.');
        }
        
        // Success case
        setFormData({ name: '', email: '', message: '' });
        setError('');
        alert('Message sent successfully!');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-container">
        <div className="container">
          <div className="contact-content">
            <div className="contact-left">
              <h1>Contact Us</h1>
              <p>
                Let's connect! Whether you need assistance, have a question, or just want to say hi—we're only a message away.
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <img src="/images/loc.svg" alt="Location" className="contact-icon" />
                  <div className="contact-text">
                    <h2 className="info-label">Address</h2>
                    <p>4671 Sugar Camp Road,<br />Owatonna,Minnesota,<br />55060</p>
                  </div>
                </div>

                <div className="contact-item">
                  <img src="/images/call.svg" alt="Phone" className="contact-icon" />
                  <div className="contact-text">
                    <h2 className="info-label">Phone</h2>
                    <p>+639526432123</p>
                  </div>
                </div>

                <div className="contact-item">
                  <img src="/images/email.svg" alt="Email" className="contact-icon" />
                  <div className="contact-text">
                    <h2 className="info-label">Email</h2>
                    <p>fixnhost@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-right">
              <div className="form-box">
                <h2>Send Message</h2>
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Type your Message..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs; 
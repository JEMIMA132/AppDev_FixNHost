import React from 'react';
import { FaSearch, FaCalendarAlt, FaThumbsUp } from 'react-icons/fa'; // Import React icons

const BookAction = () => {
  return (
    <section className="book-action">
      <h2>How It Works</h2>
      <div className="book-action__steps">
        <div className="book-action__step">
          <div className="book-action__icon">
            <FaSearch />
          </div>
          <h3>Choose a Service</h3>
          <p>Browse the list of services and select what you need.</p>
        </div>
        <div className="book-action__step">
          <div className="book-action__icon">
            <FaCalendarAlt />
          </div>
          <h3>Book a Time</h3>
          <p>Select a convenient date and time for your service.</p>
        </div>
        <div className="book-action__step">
          <div className="book-action__icon">
            <FaThumbsUp />
          </div>
          <h3>Enjoy Quality Service</h3>
          <p>Our verified professionals will arrive on time and get the job done.</p>
        </div>
      </div>
    </section>
  );
};

export default BookAction;
import React from 'react';
import Header from '../Headers/Header'; // Adjust path based on your folder structure
import Footer from '../Footers/Footer'; // Adjust path based on your folder structure
import BookHero from '../Becomes/BookHero'; // Correct path
import BookContent from '../Becomes/BookContent'; // Correct path
import BookAction from '../Becomes/BookAction'; // Add new component

const Book = () => {
  return (
    <div className="book">
      <Header />
      <BookHero />
      <BookContent />
      <BookAction /> {/* Added new component */}
      <Footer />
    </div>
  );
};

export default Book;
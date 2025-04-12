import React from 'react';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="hero-section">
                <div className="floral-arch">
                    <div className="arch-content">
                        <div className="booking-buttons">
                            <button className="book-service">
                                <span className="icon">📚</span>
                                Book Service
                            </button>
                            <button className="offer-service">
                                <span className="icon">🎁</span>
                                Offer Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage; 
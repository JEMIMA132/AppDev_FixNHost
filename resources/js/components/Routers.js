import React from 'react';
import ReactDOM from 'react-dom';

// Define the Homepage component
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

// Render it to the #app div
if (document.getElementById('app')) {
    ReactDOM.render(<Homepage />, document.getElementById('app'));
}



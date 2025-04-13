// TheServices.js
import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // For filter icon

const TheServices = ({ searchTerm }) => {
  // State for active tab and filter
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'repair', or 'event'
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', or 'desc'

  // Updated data for Fix Services (Repair Services)
  const fixServices = [
    {
      title: 'Carpentry & Structural Repairs',
      description: 'Expert carpentry and structural repair services for homes and businesses.',
      price: 149,
      image: 'https://southcoastmaintenanceservices.com/wp-content/uploads/2024/04/rpentry-repairs.png',
    },
    {
      title: 'General Handyman Services',
      description: 'Versatile handyman services for a wide range of home repairs and improvements.',
      price: 99,
      image: 'https://media.licdn.com/dms/image/v2/D5612AQGP7Cc-STgMiQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1726768411232?e=2147483647&v=beta&t=8B2Mw9833mnGiiRjkWRWliNhOYE_0hI-rCkapiRa9Vg',
    },
    {
      title: 'Electrical Services',
      description: 'Professional electrical repairs and installations for residential and commercial spaces.',
      price: 159,
      image: 'https://assets.isu.pub/document-structure/230228112806-8d306be29a5278308eb3b11630bd9714/v1/e8165b975742db7bfdb70c1422a71a9e.jpeg',
    },
    {
      title: 'AV Equipment Repair',
      description: 'Specialized repair services for audio-visual equipment and systems.',
      price: 119,
      image: 'https://delta4audiovisual.com/wp-content/uploads/2016/08/7.jpg',
    },
    {
      title: 'Air Conditioning & Ventilation',
      description: 'Installation, repair, and maintenance of air conditioning and ventilation systems.',
      price: 199,
      image: 'https://www.onehourairftworth.com/wp-content/uploads/2018/12/7-Things-to-Remember-When-Choosing-an-Air-Conditioner-Repair-Company-_-Air-Conditioning-Service-in-Fort-Worth-TX.jpg',
    },
    {
      title: 'Plumbing Services',
      description: 'Comprehensive plumbing services for repairs, installations, and maintenance.',
      price: 139,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhcSc0pPe34I2PMKMuvRTOvelfkm-AI_qyw&s',
    },
  ];

  // Updated data for Host Services (Event Services)
  const hostServices = [
    {
      title: 'Wedding Planning',
      description: 'Comprehensive wedding planning services to make your special day perfect.',
      price: 999,
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
    },
    {
      title: 'Corporate Event Hosting',
      description: 'Professional hosting for corporate events, conferences, and seminars.',
      price: 799,
      image: 'https://www.foreverydayphoto.com/wp-content/uploads/2023/08/aron-and-diane-bright-pink-wedding-28.jpeg',
    },
    {
      title: 'Birthday Party Planning',
      description: 'Fun and memorable birthday party planning for all ages.',
      price: 299,
      image: 'https://www.letsroam.com/explorer/wp-content/uploads/sites/10/2022/03/how-to-plan-a-birthday-party.jpg',
    },
    {
      title: 'Catering Services',
      description: 'Delicious catering options for events of all sizes.',
      price: 499,
      image: 'https://t3.ftcdn.net/jpg/01/77/38/30/360_F_177383025_EHdPPhuGlOr6I5NVDULdTQvaiXMaqSLv.jpg',
    },
    {
      title: 'Event Photography',
      description: 'Capture your event with professional photography services.',
      price: 399,
      image: 'https://photonify.com/wp-content/uploads/2019/01/event-photography.jpg',
    },
    {
      title: 'DJ and Entertainment',
      description: 'Lively DJ and entertainment services to keep your guests engaged.',
      price: 599,
      image: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16091/production/_128575209_img_2785.jpg',
    },
  ];

  // Handle search functionality
  const filterServices = (services) => {
    if (!searchTerm) return services;
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle sorting by price
  const sortServices = (services) => {
    if (sortOrder === 'none') return services;
    return [...services].sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  };

  // Filter and sort services based on search term and sort order
  const filteredFixServices = sortServices(filterServices(fixServices));
  const filteredHostServices = sortServices(filterServices(hostServices));

  // Toggle filter (sort by price)
  const toggleFilter = () => {
    if (sortOrder === 'none') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('none');
    }
  };

  return (
    <section className="the-services">
      {/* Category Tabs and Filter */}
      <div className="the-services__header">
        <div className="the-services__tabs">
          <button
            className={`tab ${activeTab === 'repair' || activeTab === 'both' ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === 'repair' ? 'both' : 'repair')}
          >
            Repair Services
          </button>
          <button
            className={`tab ${activeTab === 'event' || activeTab === 'both' ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === 'event' ? 'both' : 'event')}
          >
            Event Services
          </button>
        </div>
        <button className="the-services__filter" onClick={toggleFilter}>
          <FiFilter /> {sortOrder === 'none' ? 'Filter' : sortOrder === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
        </button>
      </div>

      {/* Fix Services Section */}
      {(activeTab === 'repair' || activeTab === 'both') && filteredFixServices.length > 0 && (
        <div className="the-services__category">
          <h3>Fix Services</h3>
          <div className="the-services__grid">
            {filteredFixServices.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.image} alt={service.title} className="service-card__image" />
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <p className="service-card__price">Starting at ${service.price}</p>
                <button className="service-card__button">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Host Services Section */}
      {(activeTab === 'event' || activeTab === 'both') && filteredHostServices.length > 0 && (
        <div className="the-services__category">
          <h3>Host Services</h3>
          <div className="the-services__grid">
            {filteredHostServices.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.image} alt={service.title} className="service-card__image" />
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <p className="service-card__price">Starting at ${service.price}</p>
                <button className="service-card__button">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TheServices;
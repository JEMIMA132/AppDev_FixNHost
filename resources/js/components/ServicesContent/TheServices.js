import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // For filter icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const TheServices = ({ searchTerm }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'repair', or 'event'
  const navigate = useNavigate(); // Initialize useNavigate

  // Updated data for Fix Services (Repair Services)
  const fixServices = [
    {
      id: 'carpentry',
      title: 'Carpentry & Structural Repairs',
      description: 'Expert carpentry and structural repair services for homes and businesses.',
      price: 149,
      image: 'https://southcoastmaintenanceservices.com/wp-content/uploads/2024/04/rpentry-repairs.png',
      offerings: [
        'Structural assessments and repairs',
        'Custom cabinetry and furniture',
        'Door and window installation',
        'Framing and finishing work',
        'Wood rot repair and prevention',
      ],
    },
    {
      id: 'handyman',
      title: 'General Handyman Services',
      description: 'Versatile handyman services for a wide range of home repairs and improvements.',
      price: 99,
      image: 'https://media.licdn.com/dms/image/v2/D5612AQGP7Cc-STgMiQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1726768411232?e=2147483647&v=beta&t=8B2Mw9833mnGiiRjkWRWliNhOYE_0hI-rCkapiRa9Vg',
      offerings: [
        'Minor electrical repairs',
        'Furniture assembly',
        'Wall painting',
        'Basic plumbing fixes',
        'Drywall repair',
      ],
    },
    {
      id: 'electrical',
      title: 'Electrical Services',
      description: 'Professional electrical repairs and installations for residential and commercial spaces.',
      price: 159,
      image: 'https://assets.isu.pub/document-structure/230228112806-8d306be29a5278308eb3b11630bd9714/v1/e8165b975742db7bfdb70c1422a71a9e.jpeg',
      offerings: [
        'Wiring and rewiring',
        'Lighting installation',
        'Circuit breaker repair',
        'Electrical inspections',
        'Outlet and switch installation',
      ],
    },
    {
      id: 'av-repair',
      title: 'AV Equipment Repair',
      description: 'Specialized repair services for audio-visual equipment and systems.',
      price: 119,
      image: 'https://delta4audiovisual.com/wp-content/uploads/2016/08/7.jpg',
      offerings: [
        'TV and speaker repairs',
        'Projector maintenance',
        'Audio system troubleshooting',
        'Home theater setup',
        'AV equipment calibration',
      ],
    },
    {
      id: 'ac-ventilation',
      title: 'Air Conditioning & Ventilation',
      description: 'Installation, repair, and maintenance of air conditioning and ventilation systems.',
      price: 199,
      image: 'https://www.onehourairftworth.com/wp-content/uploads/2018/12/7-Things-to-Remember-When-Choosing-an-Air-Conditioner-Repair-Company-_-Air-Conditioning-Service-in-Fort-Worth-TX.jpg',
      offerings: [
        'AC installation and repair',
        'Ventilation system maintenance',
        'Duct cleaning',
        'Thermostat installation',
        'Refrigerant recharge',
      ],
    },
    {
      id: 'plumbing',
      title: 'Plumbing Services',
      description: 'Comprehensive plumbing services for repairs, installations, and maintenance.',
      price: 139,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhcSc0pPe34I2PMKMuvRTOvelfkm-AI_qyw&s',
      offerings: [
        'Leak detection and repair',
        'Pipe installation',
        'Drain cleaning',
        'Water heater repair',
        'Fixture installation',
      ],
    },
  ];

  // Updated data for Host Services (Event Services)
  const hostServices = [
    {
      id: 'wedding-planning',
      title: 'Wedding Planning',
      description: 'Comprehensive wedding planning services to make your special day perfect.',
      price: 999,
      image: 'https://media.istockphoto.com/id/1340256496/photo/shot-of-a-young-woman-decorating-a-table-with-place-card-holders-in-preparation-for-a-wedding.jpg?s=612x612&w=0&k=20&c=gBQHa3_HywGsZv4MYRfvMpWAsgLLUkQvyMbG-lHBOSo=',
      offerings: [
        'Venue selection',
        'Catering coordination',
        'Decoration planning',
        'Guest management',
        'Timeline scheduling',
      ],
    },
    {
      id: 'corporate-event',
      title: 'Corporate Event Hosting',
      description: 'Professional hosting for corporate events, conferences, and seminars.',
      price: 799,
      image: 'https://www.foreverydayphoto.com/wp-content/uploads/2023/08/aron-and-diane-bright-pink-wedding-28.jpeg',
      offerings: [
        'Event logistics',
        'Speaker coordination',
        'AV setup',
        'Catering services',
        'Event branding',
      ],
    },
    {
      id: 'birthday-planning',
      title: 'Birthday Party Planning',
      description: 'Fun and memorable birthday party planning for all ages.',
      price: 299,
      image: 'https://www.letsroam.com/explorer/wp-content/uploads/sites/10/2022/03/how-to-plan-a-birthday-party.jpg',
      offerings: [
        'Theme selection',
        'Decoration setup',
        'Entertainment booking',
        'Cake coordination',
        'Guest invitations',
      ],
    },
    {
      id: 'catering',
      title: 'Catering Services',
      description: 'Delicious catering options for events of all sizes.',
      price: 499,
      image: 'https://t3.ftcdn.net/jpg/01/77/38/30/360_F_177383025_EHdPPhuGlOr6I5NVDULdTQvaiXMaqSLv.jpg',
      offerings: [
        'Menu planning',
        'Food preparation',
        'Beverage services',
        'Staffing',
        'Setup and cleanup',
      ],
    },
    {
      id: 'event-photography',
      title: 'Event Photography',
      description: 'Capture your event with professional photography services.',
      price: 399,
      image: 'https://photonify.com/wp-content/uploads/2019/01/event-photography.jpg',
      offerings: [
        'Event coverage',
        'Photo editing',
        'Candid shots',
        'Portrait sessions',
        'Digital delivery',
      ],
    },
    {
      id: 'dj-entertainment',
      title: 'DJ and Entertainment',
      description: 'Lively DJ and entertainment services to keep your guests engaged.',
      price: 599,
      image: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16091/production/_128575209_img_2785.jpg',
      offerings: [
        'Music selection',
        'Live DJ performance',
        'Lighting setup',
        'MC services',
        'Interactive games',
      ],
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

  // Filter services based on search term
  const filteredFixServices = filterServices(fixServices);
  const filteredHostServices = filterServices(hostServices);

  // Handle dropdown change
  const handleFilterChange = (event) => {
    setActiveTab(event.target.value);
  };

  // Handle navigation to Choose page
  const handleChooseService = (service, serviceType) => {
    navigate(`/choose/${serviceType}/${service.id}`, { state: { service, serviceType } });
  };

  return (
    <section className="the-services">
      {/* Category Dropdown Filter */}
      <div className="the-services__header">
        <div className="the-services__filter-dropdown">
          <div className="the-services__filter-icon">
            <FiFilter className="filter-icon" />
          </div>
          <select
            value={activeTab}
            onChange={handleFilterChange}
            className="the-services__dropdown"
          >
            <option value="both">All Services</option>
            <option value="repair">Fix Services</option>
            <option value="event">Event Services</option>
          </select>
        </div>
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
                <button
                  className="service-card__button"
                  onClick={() => handleChooseService(service, 'fix')}
                >
                  Choose This Service
                </button>
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
                <button
                  className="service-card__button"
                  onClick={() => handleChooseService(service, 'host')}
                >
                  Choose This Service
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TheServices;
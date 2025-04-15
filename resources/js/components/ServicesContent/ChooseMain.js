import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import ChoosePop from '../ServicesContent/ChoosePop';
import ChooseForm from '../ServicesContent/ChooseForm';
import ChooseSummary from '../ServicesContent/ChooseSummary';
import ChooseConfirmed from '../ServicesContent/ChooseConfirmed';

// Service types mapping to categories
const serviceTypeMapping = {
  'Carpentry & Structural Repairs': [
    'Custom Cabinetry',
    'Deck Building',
    'Structural Repairs',
  ],
  'General Handyman Services': [
    'Minor Repairs',
    'Painting',
    'Furniture Assembly',
  ],
  'Electrical Services': [
    'Wiring Installation',
    'Circuit Breaker Repairs',
    'Lighting Installation',
  ],
  'AV Equipment Repair': [
    'TV Mounting',
    'Home Theater Setup',
    'Speaker Repair',
  ],
  'Air Conditioning & Ventilation': [
    'AC Installation',
    'Duct Cleaning',
    'Regular Maintenance',
  ],
  'Plumbing Services': [
    'Pipe Repair',
    'Drain Cleaning',
    'Fixture Installation',
  ],
  'Wedding Planning': [
    'Venue Coordination',
    'Decor Setup',
    'Guest Management',
  ],
  'Corporate Event Hosting': [
    'Conference Planning',
    'Team Building Events',
    'Venue Setup',
  ],
  'Birthday Party Planning': [
    'Theme Decoration',
    'Entertainment Booking',
    'Party Coordination',
  ],
  'Catering Services': [
    'Menu Planning',
    'Food Preparation',
    'Serving Staff',
  ],
  'Event Photography': [
    'Photo Sessions',
    'Event Coverage',
    'Photo Editing',
  ],
  'DJ and Entertainment': [
    'DJ Services',
    'Live Music',
    'Event Hosting',
  ],
};

const ChooseMain = () => {
  const location = useLocation();
  const { service, serviceType } = location.state || {};

  // Fallback service data
  const defaultService = {
    title: 'Carpentry & Structural Repairs',
    description: 'Find the best professional service providers in your area',
  };

  const selectedService = service || defaultService;
  const backLinkText = serviceType === 'fix' ? 'Fix Services' : serviceType === 'host' ? 'Host Services' : 'Services';

  // State for service type filter
  const [selectedServiceType, setSelectedServiceType] = useState('All Services');
  // State for popup, form, summary, confirmation visibility and selected vendor
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [formData, setFormData] = useState(null);

  // Sample data for Fix Services (vendors) - unchanged
  const fixServiceVendors = [
    {
      name: 'Daniel Thompson',
      location: 'Denver, CO',
      rating: 4.9,
      description: 'Skilled carpenter with expertise in custom woodworking and structural repairs.',
      services: ['Custom Cabinetry', 'Deck Building'],
      category: 'Carpentry & Structural Repairs',
      cost: '$500',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36/40https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Emma Brown',
      location: 'Austin, TX',
      rating: 4.7,
      description: 'Experienced in custom furniture and home renovations.',
      services: ['Custom Cabinetry', 'Structural Repairs'],
      category: 'Carpentry & Structural Repairs',
      cost: '$450',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Liam Carter',
      location: 'Seattle, WA',
      rating: 4.8,
      description: 'Specialist in outdoor structures and carpentry repairs.',
      services: ['Deck Building', 'Structural Repairs'],
      category: 'Carpentry & Structural Repairs',
      cost: '$600',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Sophia Lee',
      location: 'Portland, OR',
      rating: 4.6,
      description: 'Expert in detailed woodworking and structural fixes.',
      services: ['Custom Cabinetry', 'Deck Building'],
      category: 'Carpentry & Structural Repairs',
      cost: '$480',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Noah Clark',
      location: 'Boston, MA',
      rating: 4.9,
      description: 'Renowned for high-quality carpentry and restoration work.',
      services: ['Structural Repairs', 'Custom Cabinetry'],
      category: 'Carpentry & Structural Repairs',
      cost: '$550',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'James Wilson',
      location: 'San Francisco, CA',
      rating: 4.2,
      description: 'General handyman with broad skills in home repair and maintenance.',
      services: ['Minor Repairs', 'Painting'],
      category: 'General Handyman Services',
      cost: '$200',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Evelyn Moore',
      location: 'Denver, CO',
      rating: 4.5,
      description: 'Expert in quick home repair solutions.',
      services: ['Furniture Assembly', 'Minor Repairs'],
      category: 'General Handyman Services',
      cost: '$180',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Mason Taylor',
      location: 'Boston, MA',
      rating: 4.7,
      description: 'Specialist in interior home maintenance.',
      services: ['Painting', 'Furniture Assembly'],
      category: 'General Handyman Services',
      cost: '$220',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Harper Anderson',
      location: 'Seattle, WA',
      rating: 4.6,
      description: 'Experienced in general home improvement tasks.',
      services: ['Minor Repairs', 'Painting'],
      category: 'General Handyman Services',
      cost: '$190',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Logan Parker',
      location: 'Chicago, IL',
      rating: 4.8,
      description: 'Known for reliable repair and maintenance services.',
      services: ['Furniture Assembly', 'Minor Repairs'],
      category: 'General Handyman Services',
      cost: '$210',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Michael Johnson',
      location: 'Seattle, WA',
      rating: 4.8,
      description: 'Licensed electrician with 15+ years of experience.',
      services: ['Wiring Installation', 'Circuit Breaker Repairs'],
      category: 'Electrical Services',
      cost: '$350',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Robert Smith',
      location: 'Portland, OR',
      rating: 4.5,
      description: 'Master electrician specializing in home electrical systems.',
      services: ['Lighting Installation', 'Wiring Installation'],
      category: 'Electrical Services',
      cost: '$300',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Olivia Davis',
      location: 'Chicago, IL',
      rating: 4.7,
      description: 'Expert in smart home electrical solutions.',
      services: ['Circuit Breaker Repairs', 'Lighting Installation'],
      category: 'Electrical Services',
      cost: '$320',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Ethan Harris',
      location: 'San Diego, CA',
      rating: 4.6,
      description: 'Specialist in electrical safety and upgrades.',
      services: ['Wiring Installation', 'Circuit Breaker Repairs'],
      category: 'Electrical Services',
      cost: '$310',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'Ava Martinez',
      location: 'Miami, FL',
      rating: 4.8,
      description: 'Experienced in residential and commercial electrical projects.',
      services: ['Lighting Installation', 'Wiring Installation'],
      category: 'Electrical Services',
      cost: '$330',
      image: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/448543931_1671916580295368_1926051170720236012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEcMUd01GRVUQv0AoZsFPpHobMZvTyqsk-hsxm9PKqyT62bVxo3gQXhTYnVDWMpTWPQs7xVtxD6tt4hFDVnQV2M&_nc_ohc=KZrNPjRLihAQ7kNvwEDnXpq&_nc_oc=Adk8TSITLjD2jDXrmqPvKpjnkpM9d7kIsx5-aYC7OjkOfWwiiB2Qn9NtbhNjJtaqI-o&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=Sp7jyi4F3ifDni9UXqqejA&oh=00_AfGpjjFkpvHkUJl_Dg2fDVtWR-yuQ2Hc0Upkiq8svIVf9A&oe=6803FE36',
    },
    {
      name: 'William Davis',
      location: 'Los Angeles, CA',
      rating: 4.6,
      description: 'Audio-visual specialist with expertise in home theater systems.',
      services: ['TV Mounting', 'Home Theater Setup'],
      category: 'AV Equipment Repair',
      cost: '$250',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Charlotte King',
      location: 'San Francisco, CA',
      rating: 4.8,
      description: 'Expert in custom audio-visual installations.',
      services: ['Home Theater Setup', 'Speaker Repair'],
      category: 'AV Equipment Repair',
      cost: '$270',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Benjamin Scott',
      location: 'New York, NY',
      rating: 4.7,
      description: 'Specialist in home entertainment systems.',
      services: ['TV Mounting', 'Speaker Repair'],
      category: 'AV Equipment Repair',
      cost: '$260',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Amelia Green',
      location: 'Orlando, FL',
      rating: 4.6,
      description: 'Experienced in professional AV setups for homes and businesses.',
      services: ['Home Theater Setup', 'TV Mounting'],
      category: 'AV Equipment Repair',
      cost: '$240',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Henry Young',
      location: 'Phoenix, AZ',
      rating: 4.9,
      description: 'Known for high-quality audio-visual solutions.',
      services: ['Speaker Repair', 'Home Theater Setup'],
      category: 'AV Equipment Repair',
      cost: '$280',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Thomas Garcia',
      location: 'Phoenix, AZ',
      rating: 4.7,
      description: 'HVAC technician specialized in air conditioning repair.',
      services: ['AC Installation', 'Duct Cleaning'],
      category: 'Air Conditioning & Ventilation',
      cost: '$400',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Isabella White',
      location: 'Houston, TX',
      rating: 4.6,
      description: 'Expert in HVAC system installations and repairs.',
      services: ['Regular Maintenance', 'AC Installation'],
      category: 'Air Conditioning & Ventilation',
      cost: '$380',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'James Adams',
      location: 'Atlanta, GA',
      rating: 4.8,
      description: 'Specialist in energy-efficient HVAC solutions.',
      services: ['Duct Cleaning', 'Regular Maintenance'],
      category: 'Air Conditioning & Ventilation',
      cost: '$390',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Mia Turner',
      location: 'Las Vegas, NV',
      rating: 4.7,
      description: 'Experienced in commercial and residential HVAC maintenance.',
      services: ['AC Installation', 'Duct Cleaning'],
      category: 'Air Conditioning & Ventilation',
      cost: '$410',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Lucas Walker',
      location: 'Dallas, TX',
      rating: 4.9,
      description: 'Renowned for quick and reliable HVAC services.',
      services: ['Regular Maintenance', 'AC Installation'],
      category: 'Air Conditioning & Ventilation',
      cost: '$420',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Jacob Hall',
      location: 'Miami, FL',
      rating: 4.7,
      description: 'Licensed plumber with expertise in residential plumbing.',
      services: ['Pipe Repair', 'Drain Cleaning'],
      category: 'Plumbing Services',
      cost: '$230',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Lily Evans',
      location: 'Chicago, IL',
      rating: 4.6,
      description: 'Specialist in plumbing repairs and installations.',
      services: ['Fixture Installation', 'Pipe Repair'],
      category: 'Plumbing Services',
      cost: '$220',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Samuel Wright',
      location: 'Seattle, WA',
      rating: 4.8,
      description: 'Experienced in emergency plumbing services.',
      services: ['Drain Cleaning', 'Pipe Repair'],
      category: 'Plumbing Services',
      cost: '$240',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Chloe Baker',
      location: 'Boston, MA',
      rating: 4.5,
      description: 'Expert in modern plumbing solutions.',
      services: ['Fixture Installation', 'Drain Cleaning'],
      category: 'Plumbing Services',
      cost: '$210',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Daniel Reed',
      location: 'San Diego, CA',
      rating: 4.9,
      description: 'Known for reliable and efficient plumbing work.',
      services: ['Pipe Repair', 'Fixture Installation'],
      category: 'Plumbing Services',
      cost: '$250',
      image: 'https://via.placeholder.com/40',
    },
  ];

  // Sample data for Host Services (company groups) - updated to 5 entries per category
  const hostServiceCompanies = [
    // Wedding Planning (5 entries)
    {
      name: 'Elite Weddings',
      location: 'New York, NY',
      rating: 4.9,
      description: 'Experts in luxury wedding planning.',
      services: ['Venue Coordination', 'Decor Setup'],
      category: 'Wedding Planning',
      cost: '$5000',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Forever Events',
      location: 'Miami, FL',
      rating: 4.8,
      description: 'Memorable weddings with personal touches.',
      services: ['Guest Management', 'Venue Coordination'],
      category: 'Wedding Planning',
      cost: '$4500',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Dream Day Planners',
      location: 'Chicago, IL',
      rating: 4.7,
      description: 'Specializing in bespoke wedding experiences.',
      services: ['Decor Setup', 'Guest Management'],
      category: 'Wedding Planning',
      cost: '$4800',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Vow & Wow',
      location: 'Los Angeles, CA',
      rating: 4.6,
      description: 'Creative solutions for your perfect day.',
      services: ['Venue Coordination', 'Decor Setup'],
      category: 'Wedding Planning',
      cost: '$4700',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Blissful Beginnings',
      location: 'Seattle, WA',
      rating: 4.8,
      description: 'Tailored wedding planning with elegance.',
      services: ['Guest Management', 'Decor Setup'],
      category: 'Wedding Planning',
      cost: '$4600',
      image: 'https://via.placeholder.com/40',
    },
    // Corporate Event Hosting (5 entries)
    {
      name: 'Corporate Connect',
      location: 'Boston, MA',
      rating: 4.8,
      description: 'Professional corporate event experts.',
      services: ['Conference Planning', 'Venue Setup'],
      category: 'Corporate Event Hosting',
      cost: '$3000',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Summit Solutions',
      location: 'Atlanta, GA',
      rating: 4.7,
      description: 'Specialists in team building events.',
      services: ['Team Building Events', 'Conference Planning'],
      category: 'Corporate Event Hosting',
      cost: '$2800',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Peak Events',
      location: 'San Francisco, CA',
      rating: 4.6,
      description: 'Delivering impactful corporate gatherings.',
      services: ['Venue Setup', 'Team Building Events'],
      category: 'Corporate Event Hosting',
      cost: '$3100',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'ExecuPlan',
      location: 'Houston, TX',
      rating: 4.8,
      description: 'Seamless planning for business events.',
      services: ['Conference Planning', 'Venue Setup'],
      category: 'Corporate Event Hosting',
      cost: '$2900',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Visionary Ventures',
      location: 'Denver, CO',
      rating: 4.7,
      description: 'Innovative corporate event solutions.',
      services: ['Team Building Events', 'Conference Planning'],
      category: 'Corporate Event Hosting',
      cost: '$3200',
      image: 'https://via.placeholder.com/40',
    },
    // Birthday Party Planning (5 entries)
    {
      name: 'Party Pros',
      location: 'Orlando, FL',
      rating: 4.7,
      description: 'Fun and memorable birthday celebrations.',
      services: ['Theme Decoration', 'Entertainment Booking'],
      category: 'Birthday Party Planning',
      cost: '$800',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Joyful Events',
      location: 'Phoenix, AZ',
      rating: 4.6,
      description: 'Specialists in kids and adult parties.',
      services: ['Party Coordination', 'Theme Decoration'],
      category: 'Birthday Party Planning',
      cost: '$750',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Celebrate Easy',
      location: 'Dallas, TX',
      rating: 4.8,
      description: 'Hassle-free birthday party planning.',
      services: ['Entertainment Booking', 'Party Coordination'],
      category: 'Birthday Party Planning',
      cost: '$820',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Festive Fun',
      location: 'Las Vegas, NV',
      rating: 4.5,
      description: 'Vibrant and exciting birthday bashes.',
      services: ['Theme Decoration', 'Entertainment Booking'],
      category: 'Birthday Party Planning',
      cost: '$780',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Happy Days Events',
      location: 'Portland, OR',
      rating: 4.7,
      description: 'Customized parties for all ages.',
      services: ['Party Coordination', 'Theme Decoration'],
      category: 'Birthday Party Planning',
      cost: '$790',
      image: 'https://via.placeholder.com/40',
    },
    // Catering Services (5 entries)
    {
      name: 'Gourmet Bites',
      location: 'New York, NY',
      rating: 4.8,
      description: 'Premium catering for all events.',
      services: ['Menu Planning', 'Food Preparation'],
      category: 'Catering Services',
      cost: '$2000',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Tasteful Affairs',
      location: 'Miami, FL',
      rating: 4.7,
      description: 'Delicious menus for any occasion.',
      services: ['Food Preparation', 'Serving Staff'],
      category: 'Catering Services',
      cost: '$1900',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Savor Catering',
      location: 'Chicago, IL',
      rating: 4.6,
      description: 'High-quality catering with flair.',
      services: ['Menu Planning', 'Serving Staff'],
      category: 'Catering Services',
      cost: '$2100',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Culinary Creations',
      location: 'Los Angeles, CA',
      rating: 4.8,
      description: 'Customized dining experiences.',
      services: ['Food Preparation', 'Menu Planning'],
      category: 'Catering Services',
      cost: '$1950',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Feast Masters',
      location: 'Boston, MA',
      rating: 4.7,
      description: 'Exceptional catering for all events.',
      services: ['Serving Staff', 'Menu Planning'],
      category: 'Catering Services',
      cost: '$2050',
      image: 'https://via.placeholder.com/40',
    },
    // Event Photography (5 entries)
    {
      name: 'Snap Moments',
      location: 'Los Angeles, CA',
      rating: 4.7,
      description: 'Capturing the essence of every event.',
      services: ['Photo Sessions', 'Event Coverage'],
      category: 'Event Photography',
      cost: '$1200',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Lens Legends',
      location: 'New York, NY',
      rating: 4.8,
      description: 'Professional photography for all occasions.',
      services: ['Event Coverage', 'Photo Editing'],
      category: 'Event Photography',
      cost: '$1300',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Focus Frames',
      location: 'Miami, FL',
      rating: 4.6,
      description: 'Stunning event photos with creativity.',
      services: ['Photo Sessions', 'Photo Editing'],
      category: 'Event Photography',
      cost: '$1150',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Capture Kings',
      location: 'Seattle, WA',
      rating: 4.7,
      description: 'Memorable moments in every shot.',
      services: ['Event Coverage', 'Photo Sessions'],
      category: 'Event Photography',
      cost: '$1250',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Shutter Stars',
      location: 'Orlando, FL',
      rating: 4.8,
      description: 'High-quality event photography services.',
      services: ['Photo Editing', 'Event Coverage'],
      category: 'Event Photography',
      cost: '$1220',
      image: 'https://via.placeholder.com/40',
    },
    // DJ and Entertainment (5 entries)
    {
      name: 'Beat Masters',
      location: 'Miami, FL',
      rating: 4.8,
      description: 'High-energy DJs for events.',
      services: ['DJ Services', 'Event Hosting'],
      category: 'DJ and Entertainment',
      cost: '$1000',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Rhythm Crew',
      location: 'New York, NY',
      rating: 4.7,
      description: 'Live music and DJ performances.',
      services: ['Live Music', 'DJ Services'],
      category: 'DJ and Entertainment',
      cost: '$1100',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Vibe Tribe',
      location: 'Los Angeles, CA',
      rating: 4.6,
      description: 'Keeping the party alive with great music.',
      services: ['DJ Services', 'Live Music'],
      category: 'DJ and Entertainment',
      cost: '$1050',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Sound Surge',
      location: 'Chicago, IL',
      rating: 4.8,
      description: 'Top-tier entertainment for all events.',
      services: ['Event Hosting', 'DJ Services'],
      category: 'DJ and Entertainment',
      cost: '$1080',
      image: 'https://via.placeholder.com/40',
    },
    {
      name: 'Groove Gurus',
      location: 'Atlanta, GA',
      rating: 4.7,
      description: 'Dynamic DJs and live performances.',
      services: ['Live Music', 'Event Hosting'],
      category: 'DJ and Entertainment',
      cost: '$1020',
      image: 'https://via.placeholder.com/40',
    },
  ];

  // Get service types based on selected category
  const availableServiceTypes = ['All Services', ...(serviceTypeMapping[selectedService.title] || [])];

  // Filter vendors or companies based on service type and category
  const filteredVendors = serviceType === 'fix'
    ? selectedServiceType === 'All Services'
      ? fixServiceVendors.filter(vendor => vendor.category === selectedService.title)
      : fixServiceVendors.filter(vendor => 
          vendor.category === selectedService.title && 
          vendor.services.includes(selectedServiceType)
        )
    : selectedServiceType === 'All Services'
      ? hostServiceCompanies.filter(company => company.category === selectedService.title)
      : hostServiceCompanies.filter(company => 
          company.category === selectedService.title && 
          company.services.includes(selectedServiceType)
        );

  // Handle clicking the "Book Professional" button
  const handleBookClick = (vendor) => {
    setSelectedVendor(vendor);
    setShowPopup(true);
  };

  // Handle popup select (Yes) action
  const handleSelect = () => {
    setShowPopup(false);
    setShowForm(true);
  };

  // Handle popup decline (No) action
  const handleDecline = () => {
    setShowPopup(false);
    setSelectedVendor(null);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    setFormData(formData);
    setShowForm(false);
    setShowSummary(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setSelectedVendor(null);
  };

  // Handle summary confirm
  const handleSummaryConfirm = () => {
    console.log('Planning confirmed:', formData, selectedVendor);
    setShowSummary(false);
    setShowConfirmed(true);
  };

  // Handle summary close
  const handleSummaryClose = () => {
    setShowSummary(false);
    setFormData(null);
    setShowForm(true);
  };

  // Handle confirmation "Choose Another Option" action
  const handleChooseAnother = () => {
    setShowConfirmed(false);
    setSelectedVendor(null);
    setFormData(null);
  };

  return (
    <div className="choosemain">
      <div className="choosemain__header">
        <div className="choosemain__left">
          <a href="/services" className="choosemain__back">
            <FiArrowLeft className="back-icon" /> Back to {backLinkText}
          </a>
          <h1 className="choosemain__title">{selectedService.title}</h1>
          <p className="choosemain__description">{selectedService.description}</p>
        </div>
        <div className="choosemain__right">
          <div className="choosemain__filter">
            <label className="choosemain__filter-label">Service Type</label>
            <select
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              className="choosemain__filter-select"
            >
              {availableServiceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <p className="choosemain__results">Showing {filteredVendors.length} {serviceType === 'fix' ? 'professionals' : 'company groups'}</p>
        </div>
      </div>
      <div className="choosemain__vendor-list">
        {filteredVendors.map((vendor, index) => (
          <div key={index} className="choosemain__vendor-card">
            <div className="choosemain__vendor-content">
              <div className="choosemain__vendor-header">
                <img 
                  src={vendor.image} 
                  alt={`${vendor.name}'s profile`} 
                  className="choosemain__vendor-image"
                />
                <div>
                  <h3 className="choosemain__vendor-name">{vendor.name}</h3>
                  <p className="choosemain__vendor-location">{vendor.location}</p>
                </div>
                <div className="choosemain__vendor-rating">
                  <FiStar className="choosemain__vendor-star" />
                  <span>{vendor.rating}</span>
                </div>
              </div>
              <p className="choosemain__vendor-description">{vendor.description}</p>
              <div className="choosemain__vendor-services">
                <span className="choosemain__vendor-services-label">Available Services:</span>
                {vendor.services.map((service, idx) => (
                  <span key={idx} className="choosemain__vendor-service">
                    {service}{idx < vendor.services.length - 1 ? ',' : ''}{' '}
                  </span>
                ))}
                {vendor.services.length > 2 && <span className="choosemain__vendor-service-more">+{vendor.services.length - 2} more</span>}
              </div>
            </div>
            <button 
              className="choosemain__vendor-book-button" 
              onClick={() => handleBookClick(vendor)}
            >
              Book Professional
            </button>
          </div>
        ))}
      </div>
      {showPopup && selectedVendor && (
        <ChoosePop
          optionName={selectedVendor.name}
          onSelect={handleSelect}
          onDecline={handleDecline}
        />
      )}
      {showForm && selectedVendor && (
        <ChooseForm
          eventName={selectedService.title}
          venueName={selectedVendor.name}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
      {showSummary && selectedVendor && formData && (
        <ChooseSummary
          planningData={formData}
          eventData={{
            eventName: selectedService.title,
            venueName: selectedVendor.name,
            cost: selectedVendor.cost || 'TBD',
          }}
          onConfirm={handleSummaryConfirm}
          onClose={handleSummaryClose}
        />
      )}
      {showConfirmed && (
        <ChooseConfirmed
          onChooseAnother={handleChooseAnother}
        />
      )}
    </div>
  );
};

export default ChooseMain;
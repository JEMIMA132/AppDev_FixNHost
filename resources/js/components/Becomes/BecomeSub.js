import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BecomeSub = ({ onClose, onSubscribe }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Professional'); // Default to Professional as recommended

  const plans = [
    {
      name: 'Basic Plan',
      price: '$19.99/month',
      features: [
        'List up to 3 service types',
        'Basic profile customization',
        'Standard customer support',
      ],
    },
    {
      name: 'Professional Plan',
      price: '$49.99/month',
      recommended: true,
      features: [
        'List unlimited service types',
        'Advanced profile with portfolio',
        'Priority customer support',
        'Featured in search results',
      ],
    },
    {
      name: 'Premium Plan',
      price: '$99.99/month',
      features: [
        'All Professional features',
        'Dedicated account manager',
        'Premium placement in search',
        'Marketing promotion package',
      ],
    },
  ];

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = () => {
    // Close the popup
    onClose();
    // Navigate to vendor registration page
    navigate('/vendor-registration');
  };

  return (
    <div className="become-sub-overlay">
      <div className="become-sub">
        <button className="close-button" onClick={onClose}>×</button>
        <h1>Choose Your Subscription Plan</h1>
        <p>Select the subscription plan that best fits your business needs.</p>

        <div className="plans-container">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${selectedPlan === plan.name ? 'selected' : ''}`}
              onClick={() => handlePlanSelect(plan.name)}
            >
              <div className="plan-header">
                <h2>{plan.name}</h2>
                {plan.recommended && <span className="recommended">Recommended</span>}
              </div>
              <p className="price">{plan.price}</p>
              <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="checkmark">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <div className="radio-container">
                <input
                  type="radio"
                  id={`plan-${index}`}
                  checked={selectedPlan === plan.name}
                  onChange={() => handlePlanSelect(plan.name)}
                />
                <label htmlFor={`plan-${index}`}></label>
              </div>
            </div>
          ))}
        </div>

        <div className="buttons-container">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="subscribe-button" onClick={handleSubscribe}>
            Subscribe & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeSub;
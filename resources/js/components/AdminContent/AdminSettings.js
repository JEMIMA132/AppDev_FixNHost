import React, { useState } from 'react';
import '../../../sass/AdminPages/AdminSettings.scss';

const AdminSettings = () => {
  const [newService, setNewService] = useState({ name: '', image: null, description: '', id: null });
  const [servicesList, setServicesList] = useState(() => {
    const savedServices = localStorage.getItem('servicesList');
    return savedServices ? JSON.parse(savedServices) : [];
  });
  const [newServiceType, setNewServiceType] = useState({ name: '', image: null, description: '', id: null });
  const [serviceTypesList, setServiceTypesList] = useState(() => {
    const savedServiceTypes = localStorage.getItem('serviceTypesList');
    return savedServiceTypes ? JSON.parse(savedServiceTypes) : [];
  });
  const [activeTab, setActiveTab] = useState('services'); // 'services' or 'serviceTypes'

  const handleAddService = () => {
    if (newService.name.trim()) {
      setServicesList([...servicesList, { ...newService, id: Date.now() }]);
      setNewService({ name: '', image: null, description: '', id: null });
    }
  };

  const handleAddServiceType = () => {
    if (newServiceType.name.trim()) {
      setServiceTypesList([...serviceTypesList, { ...newServiceType, id: Date.now() }]);
      setNewServiceType({ name: '', image: null, description: '', id: null });
    }
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceTypeInputChange = (e) => {
    const { name, value } = e.target;
    setNewServiceType(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewServiceType(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here (API call, etc.)
    const settingsData = {
      services: servicesList,
      serviceTypes: serviceTypesList,
    };
    console.log('Saving settings:', settingsData);
    // TODO: Add API call here to send settingsData to the backend
  };

  // Save lists to local storage whenever they change
  React.useEffect(() => {
    localStorage.setItem('servicesList', JSON.stringify(servicesList));
  }, [servicesList]);

  React.useEffect(() => {
    localStorage.setItem('serviceTypesList', JSON.stringify(serviceTypesList));
  }, [serviceTypesList]);

  return (
    <div className="admin-settings">
      <div className="admin-settings__header">
        <h2 className="admin-settings__title">Admin Settings</h2>
        <div className="admin-settings__tabs">
          <button
            className={`admin-settings__tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services Offered
          </button>
          <button
            className={`admin-settings__tab ${activeTab === 'serviceTypes' ? 'active' : ''}`}
            onClick={() => setActiveTab('serviceTypes')}
          >
            Service Types Offered
          </button>
        </div>
      </div>

      <div className="admin-settings__content">
        {activeTab === 'services' && (
          <div className="admin-settings__card">
            <div className="admin-settings__section-title">Services</div>
            <div className="admin-settings__form-group">
              <label className="admin-settings__label">Add New Service</label>
              <input
                className="admin-settings__input"
                type="text"
                name="name"
                value={newService.name}
                onChange={handleServiceInputChange}
                placeholder="e.g., Computer Repair"
              />
              <label className="admin-settings__label">Service Image</label>
              <input
                className="admin-settings__input"
                type="file"
                accept="image/*"
                onChange={handleServiceImageChange}
              />
              {newService.image && (
                <img src={newService.image} alt="Service Preview" className="admin-settings__image-preview" />
              )}
              <label className="admin-settings__label">Service Description</label>
              <textarea
                className="admin-settings__input"
                name="description"
                value={newService.description}
                onChange={handleServiceInputChange}
                placeholder="Enter service description"
                rows="3"
              />
              <button type="button" onClick={handleAddService} className="admin-settings__save-btn" style={{ marginTop: '0.5rem', width: 'fit-content' }}>
                Add Service
              </button>
            </div>
            {servicesList.length > 0 && (
              <div>
                <div className="admin-settings__label">Existing Services:</div>
                <table className="admin-settings__table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesList.map((service, index) => (
                      <tr key={service.id || index}>
                        <td>{service.image && <img src={service.image} alt={service.name} style={{ width: '50px', height: '50px' }} />}</td>
                        <td>{service.name}</td>
                        <td>{service.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'serviceTypes' && (
          <div className="admin-settings__card">
            <div className="admin-settings__section-title">Service Types</div>
            <div className="admin-settings__form-group">
              <label className="admin-settings__label">Add New Service Type</label>
              <input
                className="admin-settings__input"
                type="text"
                name="name"
                value={newServiceType.name}
                onChange={handleServiceTypeInputChange}
                placeholder="e.g., IT Support"
              />
              <label className="admin-settings__label">Service Type Image</label>
              <input
                className="admin-settings__input"
                type="file"
                accept="image/*"
                onChange={handleServiceTypeImageChange}
              />
              {newServiceType.image && (
                <img src={newServiceType.image} alt="Service Type Preview" className="admin-settings__image-preview" />
              )}
              <label className="admin-settings__label">Service Type Description</label>
              <textarea
                className="admin-settings__input"
                name="description"
                value={newServiceType.description}
                onChange={handleServiceTypeInputChange}
                placeholder="Enter service type description"
                rows="3"
              />
              <button type="button" onClick={handleAddServiceType} className="admin-settings__save-btn" style={{ marginTop: '0.5rem', width: 'fit-content' }}>
                Add Service Type
              </button>
            </div>
            {serviceTypesList.length > 0 && (
              <div>
                <div className="admin-settings__label">Existing Service Types:</div>
                <table className="admin-settings__table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceTypesList.map((type, index) => (
                      <tr key={type.id || index}>
                        <td>{type.image && <img src={type.image} alt={type.name} style={{ width: '50px', height: '50px' }} />}</td>
                        <td>{type.name}</td>
                        <td>{type.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* The Save Settings button can be outside the tab content if it saves both */} {/* Or within each tab if saving is tab-specific */}
      {/* For now, keeping it outside to save both lists */}
    </div>
  );
};

export default AdminSettings;

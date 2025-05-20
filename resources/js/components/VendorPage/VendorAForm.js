import React, { useState } from 'react';
import '../../../sass/VendorPages/VendorAForm.scss';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const defaultSlots = [
  ['08:00', '10:00'],
  ['10:00', '12:00'],
  ['12:00', '14:00'],
  ['14:00', '16:00'],
  ['16:00', '18:00'],
  ['18:00', '20:00'],
];

const VendorAForm = () => {
  const [available, setAvailable] = useState(false);
  const [weekly, setWeekly] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        enabled: false,
        slots: [],
        newSlot: { start: '', end: '' },
      };
      return acc;
    }, {})
  );

  const handleToggleDay = (day) => {
    setWeekly((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleSlotInput = (day, field, value) => {
    setWeekly((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        newSlot: { ...prev[day].newSlot, [field]: value },
      },
    }));
  };

  const handleAddSlot = (day) => {
    const { start, end } = weekly[day].newSlot;
    if (start && end) {
      setWeekly((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          slots: [...prev[day].slots, [start, end]],
          newSlot: { start: '', end: '' },
        },
      }));
    }
  };

  return (
    <div className="vendoraform-card">
      <h2 className="vendoraform-title">
        <span className="vendoraform-title__icon">
          <svg width="28" height="28" fill="none" stroke="#34d399" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 9h18"/></svg>
        </span>
        Availability
      </h2>
      <div className="vendoraform-desc" style={{marginBottom: '1.5rem'}}>Set your availability and working hours.</div>
      <div className="vendoraform-weekly">
        <div className="vendoraform-weekly-title">
          <span className="vendoraform-weekly-title__icon">
            <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </span>
          <span className="vendoraform-label" style={{fontSize: '1.15rem'}}>Weekly Schedule</span>
        </div>
        {daysOfWeek.map((day) => (
          <div className="vendoraform-day" key={day}>
            <div className="vendoraform-day-header">
              <span className="vendoraform-day-name">{day}</span>
              <label className="vendoraform-switch">
                <input type="checkbox" checked={weekly[day].enabled} onChange={() => handleToggleDay(day)} />
                <span className="vendoraform-slider"></span>
              </label>
            </div>
            <div className="vendoraform-day-slots-row">
              <span className="vendoraform-day-slots-label">
                <svg width="18" height="18" fill="none" stroke="#a3a3a3" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {day} Time Slots
              </span>
              <div className="vendoraform-day-slots">
                {weekly[day].slots.map(([start, end], idx) => (
                  <span className="vendoraform-slot" key={idx}>{start} - {end}</span>
                ))}
              </div>
            </div>
            <div className="vendoraform-day-addslot-row">
              <input
                type="time"
                className="vendoraform-slot-input"
                value={weekly[day].newSlot.start}
                onChange={e => handleSlotInput(day, 'start', e.target.value)}
                disabled={!weekly[day].enabled}
              />
              <span style={{margin: '0 0.5rem'}}>to</span>
              <input
                type="time"
                className="vendoraform-slot-input"
                value={weekly[day].newSlot.end}
                onChange={e => handleSlotInput(day, 'end', e.target.value)}
                disabled={!weekly[day].enabled}
              />
              <button
                type="button"
                className="vendoraform-addslot-btn"
                onClick={() => handleAddSlot(day)}
                disabled={!(weekly[day].enabled && weekly[day].newSlot.start && weekly[day].newSlot.end)}
              >
                Add
              </button>
            </div>
            <hr className="vendoraform-day-divider" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorAForm;

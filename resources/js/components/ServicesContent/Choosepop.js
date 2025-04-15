import React from 'react';

const ChoosePop = ({ optionName, onSelect, onDecline }) => {
  return (
    <div className="choose-pop__overlay">
      <div className="choose-pop__content">
        <h3>Confirm your selection?</h3>
        <p>You are about to choose the {optionName} option. Would you like to proceed?</p>
        <div className="choose-pop__buttons">
          <button className="choose-pop__button choose-pop__button--decline" onClick={onDecline}>
            No
          </button>
          <button className="choose-pop__button choose-pop__button--select" onClick={onSelect}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePop;
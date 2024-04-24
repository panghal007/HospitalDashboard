import React from 'react';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Signup Successful!</h2>
        <p>Thank you for signing up.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;

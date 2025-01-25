import React from "react";

const AlertModal = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertModal;

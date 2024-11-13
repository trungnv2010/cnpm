import React from 'react';

const Popup = ({ visible, onClose, children }) => {
  if (!visible) return null; 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
       
      </div>
    </div>
  );
};

export default Popup;

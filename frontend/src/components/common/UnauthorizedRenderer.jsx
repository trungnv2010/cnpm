import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function UnauthorizedRenderer() {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/')
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Go to Home
      </button>
    </div>
  );
}

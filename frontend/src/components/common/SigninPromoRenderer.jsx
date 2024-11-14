import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function SigninPromoRenderer() {
    const navigate = useNavigate();

  const handleLogin = () => {
    const redirectUrl = encodeURIComponent(window.location.pathname);
    navigate(`/auth/login?redirect=${redirectUrl}`) 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">You are not logged in</h2>
      <p className="text-gray-600 mb-6">Please log in to access this page.</p>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Go to Login
      </button>
    </div>
  );
}

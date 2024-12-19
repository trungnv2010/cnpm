import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function UnauthorizedRenderer() {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/user')
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h2 className="mb-4 text-2xl font-semibold text-red-600">Truy cập bị từ chối</h2>
      <p className="mb-6 text-gray-600">Bạn không có quyền truy cập trang này</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Về trang chủ
      </button>
    </div>
  );
}

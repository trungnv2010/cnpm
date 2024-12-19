import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function SigninPromoRenderer() {
    const navigate = useNavigate();

  const handleLogin = () => {
    const redirectUrl = encodeURIComponent(window.location.pathname);
    navigate(`/auth/login?redirect=${redirectUrl}`) 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Bạn chưa đăng nhập</h2>
      <p className="mb-6 text-gray-600">Mời đăng nhập để xem trang này.</p>
      <button
        onClick={handleLogin}
        className="px-6 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Đăng nhập
      </button>

      <div className='underline'>Về trang chủ</div>
    </div>
  );
}

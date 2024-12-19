import {Link} from "react-router-dom"
import React from "react";


const NotFound = () => {
  return (
  <>
    <div class="bg-gray-200 flex items-center justify-center h-screen">
      <div class="text-center">
        <h1 class="text-9xl font-extrabold text-purple-700">404</h1>
        <p class="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">Oops! Page not found</p>
        <p class="text-md mt-2 text-gray-600">Trang bạn tìm hiện không có</p>
        <Link to="/user" class="mt-6 inline-block px-6 py-3 text-white font-medium bg-yellow-500 rounded hover:bg-blue-700 transition duration-300 ease-in-out">Trở về trang chủ</Link>
      </div>
    </div>
  </>
  )
};

export default NotFound;

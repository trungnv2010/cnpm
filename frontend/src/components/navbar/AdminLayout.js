import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "@/store";
import { AuthWrapper } from "@/components";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <AuthWrapper requiredRole="admin">
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-purple-800 to-purple-900 text-white shadow-xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-white">Admin Panel</h2>
            <nav className="space-y-3">
              <Link
                to="/admin"
                className="flex items-center px-4 py-3 hover:bg-purple-700 rounded-lg transition-all duration-300 hover:translate-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <h1 className="text-base font-medium">Tổng quan</h1>
              </Link>
              <div className="space-y-1">
                <div
                  className="flex items-center px-4 py-3 hover:bg-purple-700 rounded-lg transition-all duration-300 hover:translate-x-1 cursor-pointer"
                  onClick={() => setIsOpenOrder(!isOpenOrder)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h1 className="text-base font-medium flex-1">Đơn hàng</h1>
                  <svg
                    className={`w-6 h-6 transition-transform duration-200 ${
                      isOpenOrder ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

               
                {isOpenOrder && (
                  <div className="pl-8 space-y-1">
                    <Link
                      to="/admin/orders"
                      className="flex items-center  px-4 py-2 text-sm hover:bg-purple-700 rounded-lg transition-all duration-300"
                    >
                      Tạo đơn và giao hàng
                    </Link>
                    <Link
                      to="/admin/orders/processing"
                      className="flex items-center px-4 py-2 text-sm hover:bg-purple-700 rounded-lg transition-all duration-300"
                    >
                      Danh sách đơn hàng
                    </Link>
                    <Link
                      to="/admin/orders/completed"
                      className="flex items-center px-4 py-2 text-sm hover:bg-purple-700 rounded-lg transition-all duration-300"
                    >
                      Khách trả hàng
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/admin/products"
                className="flex items-center px-4 py-3 hover:bg-purple-700 rounded-lg transition-all duration-300 hover:translate-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h1 className="text-base font-medium">Sản phẩm</h1>
              </Link>
              <Link
                to="/admin/test"
                className="flex items-center px-4 py-3 hover:bg-purple-700 rounded-lg transition-all duration-300 hover:translate-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h1 className="text-base font-medium">Test</h1>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Page Content */}
          <div className="p-8 mt-16 min-h-[calc(100vh-4rem)] bg-white shadow-sm rounded-lg mx-6 my-6">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default AdminLayout;

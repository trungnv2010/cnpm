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
      <div className="flex h-screen bg-gray-200 w-full">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 text-white bg-purple-900">
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold">Admin Panel</h2>
            <nav className="space-y-2">
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 transition-colors rounded-lg hover:bg-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
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
                <h1 className="text-lg font-semibold">Tổng quan</h1>
              </Link>
              <div className="flex items-center px-4 py-2 transition-colors rounded-lg hover:bg-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
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
                <h1 className="text-lg font-semibold">Đơn hàng</h1>
              </div>
              <Link
                to="/admin/products"
                className="flex items-center px-4 py-2 transition-colors rounded-lg hover:bg-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
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
                <h1 className="text-lg font-semibold">Sản phẩm</h1>
              </Link>
              <Link
                to="/admin/voucher"
                className="flex items-center px-4 py-2 transition-colors rounded-lg hover:bg-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
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
                <h1 className="text-lg font-semibold">Khuyến mại</h1>
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 text-white shadow-xl bg-gradient-to-b from-purple-800 to-purple-900">
            <div className="p-6">
              <h2 className="mb-8 text-2xl font-bold text-center text-white">
                Admin Panel
              </h2>
              <nav className="space-y-3">
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg hover:bg-yellow-400 hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
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
                    className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg cursor-pointer hover:bg-yellow-400 hover:translate-x-1"
                    onClick={() => setIsOpenOrder(!isOpenOrder)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-3"
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
                    <h1 className="flex-1 text-base font-medium">Đơn hàng</h1>
                    <svg
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isOpenOrder ? "rotate-180" : ""
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
                        to="/admin/orders/create"
                        className="flex items-center px-4 py-2 text-sm transition-all duration-300 rounded-lg hover:bg-yellow-400"
                      >
                        Tạo đơn và giao hàng
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="flex items-center px-4 py-2 text-sm transition-all duration-300 rounded-lg hover:bg-yellow-400"
                      >
                        Danh sách đơn hàng
                      </Link>
                      <Link
                        to="/admin/orders/completed"
                        className="flex items-center px-4 py-2 text-sm transition-all duration-300 rounded-lg hover:bg-yellow-400"
                      >
                        Khách trả hàng
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/admin/products"
                  className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg hover:bg-yellow-400 hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
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
                  to="/admin/voucher"
                  className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg hover:bg-yellow-400 hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
                    />
                  </svg>
                  <h1 className="text-base font-medium">Khuyến mại</h1>
                </Link>
                <Link
                  to="/admin/reviews"
                  className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg hover:bg-yellow-400 hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
                    />
                  </svg>
                  <h1 className="text-base font-medium">Thống kê đánh giá</h1>
                </Link>

                <Link
                  to="/admin/service"
                  className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg hover:bg-yellow-400 hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
                    />
                  </svg>
                  <h1 className="text-base font-medium">Yêu cầu trợ giúp</h1>
                </Link>

                <Link
                  to="/admin/customer"
                  className="flex items-center px-4 py-3 transition-all duration-300 rounded-lg hover:bg-yellow-400 hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 110 20 10 10 0 010-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
                    />
                  </svg>
                  <h1 className="text-base font-medium">Quản lý người dùng</h1>
                </Link>
                
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64 bg-gray-200 w-full">
            {/* Top Navbar */}

            {/* Page Content */}
            <div className="p-8 mt-16 bg-gray-200 w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default AdminLayout;

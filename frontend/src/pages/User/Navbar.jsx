import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { useUserInfo } from "@/hooks";
import { useCart } from "@/context/CartContext";
import { useDispatch } from "react-redux";
import { userLogout } from "@/store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserInfo();
  const { getTotalQuantity } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("/products/category");
        if (res.code === "200") {
          setCategory(res.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between flex-auto h-10 bg-black">
        <div className="ml-16 text-white">Số dư tài khoản </div>
        <div className="text-white uppercase">
          free shipping các hóa đơn trên 1.000.000 kể từ ngày 28/11/2024
        </div>
        <div className="flex items-center mr-16 space-x-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <span>Hỗ trợ</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-4 text-black bg-white border-b border-black">
        <div className="flex items-center space-x-4">
          <span onClick={()=>navigate("/")} className="text-lg font-bold text-purple-700 mr-4 cursor-pointer">ACORP</span>
          <div className="flex space-x-6 ">
            {category.map((item) => (
              <Link
                to={`/user/shoppage/${item.name}`}
                className="hover:underline text-xl"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-start gap-x-2">
          <div className="flex items-center w-64 px-2 py-1 bg-white border border-black rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.9-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm thứ gì đó"
              className="px-2 outline-none "
            />
          </div>
          {userInfo.name ? (
            <div className="flex items-center justify-start gap-2">
              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {userInfo.name}
                      </p>
                      <p className="text-sm text-gray-500">{userInfo.email}</p>
                    </div>

                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </Link>

                    <Link
                      to="/user/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đơn hàng của tôi
                    </Link>

                    <Link
                      to="/user/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cài đặt
                    </Link>

                    <div className="border-t border-gray-200">
                      <button
                        onClick={() => {
                          dispatch(userLogout());
                        }}
                        className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <span>
                <Link className="flex items-center" to="/user/cart"></Link>
              </span>
            </div>
          ) : (
            <Link to="/auth/login">
              <button className="text-black border border-black hover:bg-black hover:text-white transition-colors p-2 rounded-2xl">
                Đăng nhập
              </button>
            </Link>
          )}
          <div className="flex items-center justify-start gap-2">
            <span>
              <Link to="/user/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
            </span>
            <div>{getTotalQuantity()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

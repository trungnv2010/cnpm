import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "@/store";

const HeaderAdmin = ({ title }) => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleLogout = () => {
    dispatch(userLogout());
  };
  return (
    <div className="bg-white h-16 fixed right-0 left-64 top-0 shadow-sm z-10">
      <div className="flex justify-end items-center h-full px-6">
        <h1 className="text-lg font-semibold flex-1">{title}</h1>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>Admin</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;

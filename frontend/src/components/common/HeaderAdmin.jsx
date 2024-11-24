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
    <div className="fixed top-0 right-0 z-10 h-16 bg-white shadow-sm left-64">
      <div className="flex items-center justify-end h-full gap-2 px-6">
        <h1 className="flex-1 text-lg font-semibold">{title}</h1>
        <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-700">
          <span class="text-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 
            0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 
            9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
          </span>
          <span>Trợ giúp</span>
        </div>


        <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-gray-700">
          <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
          </span>
          <span>Góp ý</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          {/* <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>Admin</span>
          </button> */}
          
          {/**/ }
          <div onClick={()=>setIsProfileOpen(!isProfileOpen)}  className="flex items-center space-x-1 cursor-pointer">
                        <span className="flex items-center justify-center w-8 h-8 text-white bg-pink-500 rounded-full">H</span>
                        <span className="font-semibold">Huyền</span>
                        <span>▼</span>

                        {isProfileOpen && <div  className="absolute z-10 w-48 py-1 mt-40 origin-top-right bg-white rounded-md shadow-lg right-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                            {/* <!-- Active: "bg-gray-100 outline-none", Not Active: "" --> */}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Hồ sơ của bạn</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Cài đặt</a>
                            <button onClick={handleLogout}  href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Đăng xuất</button>
                        </div>}
                    </div>

          {/* {isProfileOpen && (
            <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;

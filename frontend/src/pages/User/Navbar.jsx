import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (<>
    <div className="flex items-center justify-between flex-auto h-10 bg-black">
        <div className="ml-16 text-white">Số dư tài khoản </div>
        <div className="text-white uppercase">free shipping các hóa đơn trên 1.000.000 kể từ ngày 28/11/2024</div>
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
    <div className="flex items-center justify-between px-6 py-4 text-black bg-white">
        <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="text-lg font-bold">ACORP</span>
            <div className="flex space-x-6 ">
                <Link to="/user/ShopPage" className="hover:underline">Thương hiệu</Link>
                <Link to="/user/Product" className="hover:underline">Nam</Link>
                <Link href="#" className="hover:underline">Nữ</Link>
                <Link href="#" className="hover:underline">Luxury</Link>
                <Link href="#" className="hover:underline">Đồng hồ cũ</Link>
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
            <div className="flex items-center justify-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
    </>
  );
};

export default Navbar;

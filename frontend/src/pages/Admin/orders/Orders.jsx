import NavBarAdmin from "../NavbarAdmin"


const Orders=()=>{
    const choice="orders"
    return (<>
        <NavBarAdmin choice={choice}>
            <div className="max-w-[calc(100%-1rem)] grid grid-cols-6 gap-x-6 gap-y-6">
                {/*két quả kinh doanh*/}
                <div className="w-full col-span-4 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold ">Thông tin khách hàng</h2>
                        <div className="relative">
                        </div>
                    </div>
                    <div className="relative w-full mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute mr-2 transform -translate-y-1/2 left-2 top-1/2 size-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên khách hàng, số điện thoại,.."
                            className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="border-t-2 border-gray-400"></div>

                    <div className="flex flex-col items-center justify-center mt-3 text-center text-black">
                        <p>Main content</p>
                    </div>
                </div>

                <div className="w-full col-span-2 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm">
                    
                </div >

                {/*thong tin san pham*/ }
                <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm">
                    <div className="w-full col-span-4 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold ">Thông tin sản phẩm</h2>
                            <div className="relative">
                            </div>
                        </div>
                        <div className="relative w-full mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="absolute mr-2 transform -translate-y-1/2 left-2 top-1/2 size-5"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên , mã,.."
                                className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm">
                    <p>Đóng gói và giao hàng</p>
                </div>

                <div className="justify-end col-span-2 col-start-5">
                    <div className="flex ml-40 space-x-4">
                        {/* Nút Thoát */}
                        <button
                            className="p-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        Thoát
                        </button>

                        {/* Nút Tạo đơn hàng (F1) */}
                        <div className="relative">
                            <button
                            className="flex items-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            Tạo đơn hàng (F1)
                            </button>

                            {/* Dropdown menu */}
                            {/* {showDropdown && (
                            <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                                <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                Tùy chọn 1
                                </a>
                                <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"

                                >
                                Tùy chọn 2
                                </a>
                            </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </NavBarAdmin>
    </>)
}
export default Orders
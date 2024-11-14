import { useState,useRef,useEffect } from "react"


const NavBarAdmin=(props)=>{
    //dùng để tắt bật profile
    const [isProfileOn,setProfile]=useState(false)
    const profileRef=useRef();
    const profileDropDownRef=useRef(); 

    const handleToggleProfile=()=>{
        return setProfile((prev)=>!prev);
    }
    const handleClickOutProfile=(event)=>{
        if (profileDropDownRef.current && 
            !profileDropDownRef.current.contains(event.target) && 
            profileRef.current && 
            !profileRef.current.contains(event.target)) {
            setProfile(false);
          }
    }
    useEffect(()=>{
        document.addEventListener('mousedown',handleClickOutProfile)
        return ()=>document.removeEventListener('mousedown',handleClickOutProfile)
    },[])

    //

    return(<>
        <div class="flex flex-col bg-gray-200 h-screen ">
            {/* <!-- Top Navbar --> */}
            <div class=" fixed w-[calc(100%-14rem)] ml-60  bg-white text-gray-800 shadow p-4 flex items-center justify-between z-10">

                <h1 class="text-xl font-bold ml-4">Tổng quan</h1>


                <div class="flex items-center space-x-6 mr-4 ">

                    <div class="flex items-center space-x-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <span class="text-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 
                        0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 
                        9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </span>
                    <span>Trợ giúp</span>
                    </div>


                    <div class="flex items-center space-x-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <span class="text-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </span>
                    <span>Góp ý</span>
                    </div>


                    <div onClick={handleToggleProfile} ref={profileRef} class="flex items-center space-x-1 cursor-pointer">
                        <span class="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center">H</span>
                        <span class="font-semibold">Huyền</span>
                        <span>▼</span>
                        
                        {isProfileOn&&<div ref={profileDropDownRef} class="absolute right-20 z-10 mt-40 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1
                            ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            {/* <!-- Active: "bg-gray-100 outline-none", Not Active: "" --> */}
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Hồ sơ của bạn</a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Cài đặt</a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Đăng xuất</a>
                        </div>}
                    </div>



                    
                    
                    <div class="relative cursor-pointer">
                    <span class="text-blue-500 text-xl">🔔</span>
                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">19</span>
                    </div>
                </div>
            </div>


            <div class="flex  bg-gray-200">
            {/* <!-- Sidebar --> */}
                <div class="fixed  w-60 bg-purple-900 h-screen p-4 text-white">
                    <h2 class="text-2xl font-bold mb-6">Admin</h2>
                    <nav class="space-y-4">
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" 
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
                            1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 
                            1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </span>
                        <span>Tổng quan</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span><svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 
                            0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 
                            2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 
                            2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 
                            1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.
                            621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>
                        <span>Đơn hàng</span>
                        <span className="pl-14"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 
                            0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 
                            1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.
                            987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                        </span>
                        <span>Vận chuyển</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span>📄</span>
                        <span>Sản phẩm</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 
                            0 0 1 7.5 0ZM4.501 20.118a7.5 
                            7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </span>
                        <span>Khách hàng</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                        </span>
                        <span>Sổ quỹ</span>
                    </a>
                    <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                        </span>
                        <span>Báo cáo</span>
                    </a>
                    </nav>

                    <div class="mt-6 border-t-2 border-yellow-400 pt-4">
                        <h2 className="mb-4 text-xl font-bold">Kênh bán hàng</h2>
                        <nav class="space-y-4">
                            <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                            <span>🏪</span>
                            <span>Bán tại quầy</span>
                            </a>
                            <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                            <span>📱</span>
                            <span>Kênh Social</span>
                            </a>
                            <a href="#" class="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
                            <span>🛒</span>
                            <span>Sàn TMĐT</span>
                            </a>
                        </nav>
                    </div>
                </div>

                <div class="ml-64 mt-7 flex-1 p-8 pt-20 bg-gray-200 ">
                    {props.children}
                </div>
            </div>
        </div>

    </>)
}
export default NavBarAdmin
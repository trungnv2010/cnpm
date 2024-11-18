import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {userLogout} from '@/store'
import { useDispatch } from "react-redux"

const NavBarAdmin = (props) => {
    const dispatch=useDispatch()
    //ref của các Link
    // const refs={
    //     ref1: useRef(),
    //     ref2:useRef()
    // }

    // //dùng để đổi màu khi chọn
    // const handleChangeChoice=(choice)=>{
    //     props.onChangeChoice(choice)
    // }
    const choice = props.choice
    //dùng để tắt bật profile
    const [isProfileOn, setProfile] = useState(false)
    const profileRef = useRef();
    const profileDropDownRef = useRef();

    const handleToggleProfile = () => {
        return setProfile((prev) => !prev);
    }
    const handleClickOutProfile = (event) => {
        if (profileDropDownRef.current &&
            !profileDropDownRef.current.contains(event.target) &&
            profileRef.current &&
            !profileRef.current.contains(event.target)) {
            setProfile(false);
        }
    }

    //đăng xuất
    const handleLogout=()=>{
        dispatch(userLogout())
    }
    

    //
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutProfile)
        return () => document.removeEventListener('mousedown', handleClickOutProfile)
    }, [])

    //
    const [openOrder,setOpenOrder]=useState(false)

    return (<>
        <div className="flex flex-col w-full h-screen max-w-full bg-gray-200 ">
            {/*  Top Navbar  */}
            <div className=" fixed w-[calc(100%-15rem)] ml-60  bg-white text-gray-800 shadow p-4 flex items-center justify-between z-10">

                <h1 className="ml-4 text-xl font-bold">Tổng quan</h1>

                <div className="flex items-center mr-4 space-x-6 ">

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


                    <div onClick={handleToggleProfile} ref={profileRef} className="flex items-center space-x-1 cursor-pointer">
                        <span className="flex items-center justify-center w-8 h-8 text-white bg-pink-500 rounded-full">H</span>
                        <span className="font-semibold">Huyền</span>
                        <span>▼</span>

                        {isProfileOn && <div ref={profileDropDownRef} className="absolute z-10 w-48 py-1 mt-40 origin-top-right bg-white rounded-md shadow-lg right-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                            {/* <!-- Active: "bg-gray-100 outline-none", Not Active: "" --> */}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Hồ sơ của bạn</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Cài đặt</a>
                            <button onClick={handleLogout} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Đăng xuất</button>
                        </div>}
                    </div>




                    <div className="relative cursor-pointer">
                        <span className="text-xl text-blue-500">🔔</span>
                        <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">19</span>
                    </div>
                </div>
            </div>


            <div className="flex bg-gray-200">
                {/* <!-- Sidebar --> */}
                <div className="fixed h-screen p-4 text-white bg-purple-900 w-60 " >
                    <h2 className="mb-6 text-2xl font-bold">Admin</h2>
                    <nav className="space-y-4">

                        <Link to="" className={`flex items-center w-full p-2 space-x-2 rounded hover:bg-yellow-500" ${choice === "dashboard" ? "bg-yellow-500" : ""}`}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 
                                1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 
                                1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            </span>
                            <span>Tổng quan</span>
                        </Link>

                        <Link onClick={()=>setOpenOrder(!openOrder)} className={`flex items-center space-x-2 p-2 rounded hover:bg-blue-700" ${choice === "orders" ? "bg-yellow-500" : ""}`}>
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
                            {openOrder?(<span className=" pl-14"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg></span>)
                            :(<span className="pl-14"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                            </span>)}
                        </Link>
                        
                        {openOrder && (
                                <div className="ml-6">
                                    <a
                                    href="#"
                                    className="block p-2 rounded hover:bg-yellow-500"
                                    >
                                    Tạo đơn và giao hàng
                                    </a>
                                    <a
                                    href="#"
                                    className="block p-2 rounded hover:bg-yellow-500"
                                    >
                                    Danh sách đơn hàng
                                    </a>
                                    <a
                                    href="#"
                                    className="block p-2 rounded hover:bg-yellow-500"
                                    >
                                    Khách trả hàng
                                    </a>
                                </div>
                                )}
                        <Link href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 
                            0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 
                            1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.
                            987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            </span>
                            <span>Vận chuyển</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                            <span>📄</span>
                            <span>Sản phẩm</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 
                            0 0 1 7.5 0ZM4.501 20.118a7.5 
                            7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            </span>
                            <span>Khách hàng</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                            </span>
                            <span>Sổ quỹ</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                            </span>
                            <span>Báo cáo</span>
                        </Link>
                    </nav>

                    <div class="mt-6 border-t-2 border-yellow-400 pt-4">
                        <h2 className="mb-4 text-xl font-bold">Kênh bán hàng</h2>
                        <nav className="space-y-4">
                            <a href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                                <span>🏪</span>
                                <span>Bán tại quầy</span>
                            </a>
                            <a href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                                <span>📱</span>
                                <span>Kênh Social</span>
                            </a>
                            <a href="#" className="flex items-center p-2 space-x-2 rounded hover:bg-blue-700">
                                <span>🛒</span>
                                <span>Sàn TMĐT</span>
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="flex-1 p-8 pt-20 ml-64 bg-gray-200 mt-7 py-auto ">
                    {props.children}
                </div>
            </div>
        </div>

    </>)
}
export default NavBarAdmin
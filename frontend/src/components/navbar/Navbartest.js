import {Link} from "react-router-dom"
import { useState,useRef, useEffect } from "react"
import React from "react"

const Navbartest=()=>{
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

    return(
    <>
    <nav class="bg-purple-900">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

            <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* <!-- Mobile menu button--> */}
                <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                {/* <!--
                    Icon when menu is closed.

                    Menu open: "hidden", Menu closed: "block"
                --> */}
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/* <!--
                    Icon when menu is open.

                    Menu open: "block", Menu closed: "hidden"
                --> */}
                <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
            </div>

            


            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center shrink-0">
                    <Link to="/"><img class="h-8 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU99Oeyk98YZMCVJJWoxHCsTAFnA00i8nzlQ&s" alt=""/></Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link to="/auth/login" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</Link>
                    <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-yellow-500 hover:text-white">Team</Link>
                    <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-yellow-500 hover:text-white">Projects</Link>
                    <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-yellow-500 hover:text-white">Calendar</Link>
                </div>
                </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="relative p-1 bg-yellow-400 rounded-full text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16.5" cy="18.5" r="1.5"/>
                    <circle cx="9.5" cy="18.5" r="1.5"/>
                    <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z"/>
                </svg>
                </button>

                {/* <!-- Profile dropdown --> */}
                <div class="relative ml-3">
                <div>
                    <button type="button" ref={profileRef} onClick={handleToggleProfile}  class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span class="sr-only">Open user menuuuuuu</span>
                    <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5I-LyW9aEufGed1suUqzi6eoGmm0KlsUu1w&s" alt=""/>
                    </button>
                </div>

                {/* <!--
                    Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
                {isProfileOn&&<div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1
                 ring-black ring-opacity-5 focus:outline-none"
                 ref={profileDropDownRef}
                 role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    {/* <!-- Active: "bg-gray-100 outline-none", Not Active: "" --> */}
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div>}
                </div>
            </div>
            </div>
        </div>

            


            {/* Mobile */}
        <div class="sm:hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
            </div>
        </div>
    </nav>

    </>
    )
}
export default Navbartest
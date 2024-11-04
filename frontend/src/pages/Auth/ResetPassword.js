import { useState } from "react";
import {Link} from "react-router-dom";
import React from "react";

import { regexPatterns } from "./validationPartten";

const ResetPassword=()=>{
    const [email,setEmail]=useState('')
    const [errorMessage,setErrorMessage]=useState('')

    

    const validateRegister=(value)=>{
        return regexPatterns.email.test(value)?'':'Email không hợp lệ'
    }

    const handleEmail=(e)=>{
        setEmail(e.target.value)
        const errorMessage=validateRegister(e.target.value)
        setErrorMessage(errorMessage)
    }


    return (
        <>
          <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold  text-gray-700 mb-1">Quên mật khẩu</h2>
              <p className="text-xs text-gray-400 mb-4 ">Vui lòng nhập email của bạn. Chúng tôi sẽ gửi mã OTP vào email của bạn( <span className="text-xs text-black">admin@gmail.com</span>)</p>
              <form action="#" method="POST">
                <div className="mb-4">
                  <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                  <input type="email" id="email"
                  onChange={handleEmail} 
                  name="email"
                   className={`w-full px-4 py-1 mt-1 border border-gray-300 
                   rounded-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Nhập email của bạn" required/>
                </div>
                {errorMessage&&email.length!=0 && (
              <p className=" text-sm text-red-500 mb-1">{errorMessage}</p>
            )}

                <button type="submit" 
                  className={`w-full px-4 py-2 font-semibold text-white rounded-md
                  ${email?'bg-purple-800 hover:bg-purple-900':'bg-gray-300 cursor-not-allowed'} 
                  focus:outline-none  `}>
                  Gửi mã OTP
                </button>
              </form>
            </div>
          </div>
        </>)
}
export default ResetPassword
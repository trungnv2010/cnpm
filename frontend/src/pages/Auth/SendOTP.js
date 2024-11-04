import { useState,useRef, useEffect } from "react";

import React from "react";


const SendOTP=()=>{
    const inputRefs = useRef([]);
    const [OTP,setOTP]=useState([]);

    const handleOTP=(e)=>{
        const newArr=[...OTP]
        newArr.push(e.target.value)
        setOTP(newArr)
    }

  // Hàm xử lý khi người dùng nhập vào ô
    const handleInput = (e, index) => {
        const value = e.target.value;
    
        // Chỉ cho phép nhập số từ 0 đến 9
        if (!/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }
        handleOTP(e)

    // Tự động chuyển sang ô tiếp theo nếu có giá trị
        if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
        }
    };

  // Hàm xử lý khi người dùng nhấn phím (cho phép backspace)
  const handleKeyDown = (e, index) => {
    // Quay lại ô trước nếu nhấn Backspace và ô hiện tại trống

    if (e.key === 'Backspace' && !e.target.value) {
        setOTP((prevItems) => prevItems.slice(0, -1));
        if (index > 0) {
            inputRefs.current[index - 1].focus();
        }
        // Xóa phần tử cuối cùng của mảng OTP
        // setOTP((prevItems) => prevItems.slice(0, -1));
    }
    if(OTP.length>=1&&index==0){setOTP((prevItems) => prevItems.slice(0, -1));}
  };

    return (
        <>
          <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold  text-gray-700 mb-1">Nhập mã OTP</h2>
              <p className="text-xs text-gray-400 mb-4 ">Vui lòng nhập mã OTP được gửi về tài khoản email của bạn.</p>
              <div className="flex justify-center gap-2 mb-4">
                {[0,1,2,3].map((index)=>
                    (<input key={index} type="text" ref={(el)=>(inputRefs.current[index]=el)} 
                     maxLength="1" 
                    onKeyDown={(e)=>handleKeyDown(e,index)}
                    onChange={(e)=>handleInput(e,index)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded focus:outline-none 
                    focus:border-blue-500"/>))}
            </div>

                <button type="submit" 
                  className={`w-full px-4 py-2 font-semibold text-white rounded-md
                  ${OTP.length===4?'bg-purple-800 hover:bg-purple-900':'bg-gray-300 cursor-not-allowed'} 
                  focus:outline-none  `}>
                  Gửi mã OTP
                </button>
                <p>{console.log(OTP)}</p>
            </div>
          </div>
        </>)
}
export default SendOTP
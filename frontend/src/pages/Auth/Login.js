import { useState } from "react";
import {Link} from "react-router-dom";
import React from "react";

import { regexPatterns } from "./validationPartten";

const Login =() =>{
  
  const [formLogin,setFormLogin]=useState(
    {
      email:'',
      password:''
    })

  const [errorMessage,setErrorMessage]=useState(
    {
     email:'',
     password:''
    });

  const validateRegister=(type,value)=>{
      switch(type){
          case 'email':
              return regexPatterns.email.test(value) ? '' : 'Email không hợp lệ';
          default:
              return '';
      }
  }

  const handleChange=(e)=>{
      const{name,value}=e.target;
      setFormLogin({
          ...formLogin,
          [name]:value
      })

      const errorMessage =validateRegister(name,value);
      
      setErrorMessage({
        ...errorMessage,
        [name]: errorMessage
      });

      console.log(formLogin)
  }



  const isSubmitDisabled =formLogin.email.length ===0 ||formLogin.password.length===0;

  return (
  <>
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đăng Nhập</h2>
        <form action="#" method="POST">
          <div className="mb-4">
            <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" onChange={handleChange} id="email" 
            name="email"
             className={`w-full px-4 py-2 mt-1 border border-gray-300 
             rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nhập email của bạn" required/>
            {errorMessage.email && (
              <p className="mt-1 text-sm text-red-500">{errorMessage.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label for="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
            <input type="password" onChange={handleChange} id="password" name="password" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mật khẩu của bạn" required/>
          </div>
          <button type="submit" 
            disabled={isSubmitDisabled}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md
              ${isSubmitDisabled? 'bg-gray-200 cursor-not-allowed':'bg-purple-800 hover:bg-purple-900'}
            focus:outline-none  `}>
            Đăng Nhập
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?
          <Link to="/auth/signup" className="text-blue-500 hover:underline"> Đăng ký</Link>
        </p>
      </div>
    </div>
  </>)
}
export default Login
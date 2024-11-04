import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

import { regexPatterns } from "./validationPartten";


const Signup =() =>{
  
  
    const [formResgister,setFormRegister]=useState(
        {
            name:'',
            phoneNumber:'',
            email:'',
            password:'',
            repeatPassword:''
        }
    )


    const [errors, setErrors] = useState({
        name:'',
        phoneNumber:'',
        email:'',
        password:'',
        repeatPassword:''
      });


    const validateRegister=(type,value)=>{
        switch(type){
            case 'phoneNumber':
                return regexPatterns.phoneNumber.test(value) ? '' : 'Số điện thoại không hợp lệ';
            case 'email':
                return regexPatterns.email.test(value) ? '' : 'Email không hợp lệ';
            case 'name':
                return regexPatterns.name.test(value) ? '' : 'Tên chỉ được chứa chữ cái và khoảng trắng';
            case 'passWord':
                return regexPatterns.password.test(value)?'':'Mật khẩu phải dài tối thiểu 8 kí tự, gồm ít nhất 1 số và 1 kí tự đặc biệt'
            default:
                return '';
        }
    }

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormRegister({
            ...formResgister,
            [name]:value
        })

        const errorMessage = validateRegister(name, value);
        setErrors({
          ...errors,
          [name]: errorMessage
        });

    }

     
    const isSubmitDisabled =formResgister.email.length ===0 || formResgister.password.length===0 ||formResgister.name.length===0 || formResgister.phoneNumber===0||formResgister.repeatPassword.length===0;
  
    return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đăng Ký</h2>
          <form action="#" method="POST">
            <div className="mb-4">
              <label for="name" className="block text-sm font-medium text-gray-600">Họ và tên</label>
              <input type="text" onChange={handleChange} id="name" 
              name="name"
               className={`w-full px-4 py-2 mt-1 border border-gray-300 
               rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Nhập họ và tên của bạn" required/>
                {errors.name &&formResgister.name!=0 && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label for="phoneNumber" className="block text-sm font-medium text-gray-600">Số điện thoại</label>
              <input type="tel" onChange={handleChange} id="phoneNumber" 
              name="phoneNumber"
               className={`w-full px-4 py-2 mt-1 border border-gray-300 
               rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Nhập số điện thoại" required/>
                {errors.phoneNumber &&formResgister.phoneNumber!=0 && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div className="mb-4">
              <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" onChange={handleChange} id="email" 
              name="email"
               className={`w-full px-4 py-2 mt-1 border border-gray-300 
               rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Nhập email của bạn" required/>
              {errors.email &&formResgister.email!=0 && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label for="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
              <input type="password" onChange={handleChange} id="password" name="password" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mật khẩu của bạn" required/>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="mb-6">
              <label for="repeatPassword" className="block text-sm font-medium text-gray-600">Nhập lại mật khẩu</label>
              <input type="password" onChange={handleChange} id="repeatPassword" name="repeatPassword" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập lại mật khẩu của bạn" required/>
            </div>

            <button type="submit" 
              disabled={isSubmitDisabled}
              className={`w-full px-4 py-2 font-semibold text-white rounded-md
                ${isSubmitDisabled? 'bg-gray-200 cursor-not-allowed':'bg-purple-800 hover:bg-purple-900'}
              focus:outline-none  `}>
              Đăng Ký
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Đã có tài khoản?  
            <Link to="/auth/login" className="text-blue-500 hover:underline"> Đăng nhập</Link>
          </p>
        </div>
      </div>
    </>)
  }
  export default Signup
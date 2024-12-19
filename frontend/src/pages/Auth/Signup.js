import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { regexPatterns } from "./validationPartten";
import { useDispatch } from "react-redux";
import { useCheckEmailMutation } from "@/service";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Notification } from "../../components";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [formResgister, setFormRegister] = useState({
    name: '',
    email: '',
    phoneNumber:'',
    password: '',
    repeatPassword: ''
  });

  const [checkEmail, { isSuccess, error }] = useCheckEmailMutation();

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber:'',
    password: '',
    repeatPassword: ''
  });

  const [showNotification, setShowNotification] = useState(false);
  
  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const validateRegister = (type, value) => {
    switch (type) {
      case 'email':
        return regexPatterns.email.test(value) ? '' : 'Email không hợp lệ';
      case 'name':
        return regexPatterns.name.test(value) ? '' : 'Tên chỉ được chứa chữ cái và khoảng trắng'; 
      case 'password':
        return regexPatterns.password.test(value) ? '' : 'Mật khẩu phải dài tối thiểu 8 kí tự, gồm ít nhất 1 số và 1 kí tự đặc biệt';
      case 'repeatPassword':
        return value === formResgister.password ? '' : "Mật khẩu không khớp";
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formResgister,
      [name]: value
    });

    const errorMessage = validateRegister(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  useEffect(() => {
    const checkEmailExits = async () => {
      if (errors.email === "" && formResgister.email !== "") {
        const res = await checkEmail({ email: formResgister.email });
        if (res.data.code !== '200') {
          setErrors({
            ...errors,
            'email': res.data.message
          });
        }
      }
    };
    checkEmailExits();
  }, [formResgister.email]);

  const handleSubmit = () => {
    if (isSuccess) {
      navigate('/auth/SendOTP',
        {
          state:
          {
            email: formResgister.email,
            name: formResgister.name,
            password: formResgister.password,
            phone:formResgister.phoneNumber,
            type: 'signUp'
          }
        });
    } else {
      console.log(error);
    }
  };

  const isStillError = Object.values(errors).some(value => value !== '');
  const isSubmitDisabled = (isStillError || (formResgister.email.length === 0 || formResgister.password.length === 0 || formResgister.name.length === 0 || formResgister.repeatPassword.length === 0));

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Đăng Ký</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Họ và tên</label>
            <input 
              type="text" 
              onChange={handleChange} 
              id="name"
              name="name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập họ và tên của bạn" 
              required 
            />
            {errors.name && formResgister.name !== 0 && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              onChange={handleChange} 
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn" 
              required 
            />
            {errors.email && formResgister.email !== 0 && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Số điện thoại</label>
            <input 
              type="text" 
              onChange={handleChange} 
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số điện thoại" 
              required 
            />
            {errors.phoneNumber && formResgister.phoneNumber !== 0 && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                onChange={handleChange} 
                id="password" 
                name="password" 
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Nhập mật khẩu của bạn" 
                required 
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-600">Nhập lại mật khẩu</label>
            <div className="relative">
              <input 
                type={showRepeatPassword ? "text" : "password"}
                onChange={handleChange} 
                id="repeatPassword" 
                name="repeatPassword" 
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Nhập lại mật khẩu của bạn" 
                required 
              />
              <button
                type="button"
                onClick={toggleRepeatPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 text-gray-600 cursor-pointer"
              >
                {showRepeatPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.repeatPassword && <p className="text-sm text-red-500">{errors.repeatPassword}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md
              ${isSubmitDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-purple-800 hover:bg-purple-900'}
              focus:outline-none`}
          >
            Đăng Ký
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Đã có tài khoản?
            <Link to="/auth/login" className="text-blue-500 hover:underline"> Đăng nhập</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
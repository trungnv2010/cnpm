import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSendOtpApiMutation, useRegisterMutation } from "@/service";
import { Popup } from "@/components";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SendOTP = () => {
  const inputRefs = useRef([]);
  const [OTP, setOTP] = useState([]);
  const [genOTP, setGenOTP] = useState("");
  const location = useLocation();
  const { email, type, name, password, phone } = location.state || {};
  const [message, setMessage] = useState(null);
  const [sendOTP, setSendOTP] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [register] = useRegisterMutation();
  const [sendOtpApi] = useSendOtpApiMutation();

  const handleOTP = (e) => {
    const newArr = [...OTP];
    newArr.push(e.target.value);
    setOTP(newArr);
  };

  //để gen ra 1 otp bất kỳ
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  };

  //Popup
  const closeModal = () => {
    setModalVisible(false);
  };

  // Hàm xử lý khi người dùng nhập vào ô
  const handleInput = (e, index) => {
    const value = e.target.value;

    // Chỉ cho phép nhập số từ 0 đến 9
    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }
    handleOTP(e);

    // Tự động chuyển sang ô tiếp theo nếu có giá trị
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Quay lại ô trước nếu nhấn Backspace và ô hiện tại trống

    if (e.key === "Backspace" && !e.target.value) {
      setOTP((prevItems) => prevItems.slice(0, -1));
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    if (OTP.length >= 1 && index === 0) {
      setOTP((prevItems) => prevItems.slice(0, -1));
    }
  };

  const handleClick = async () => {
    console.log("genOTP", genOTP);
    console.log("OTP", OTP);
    if (genOTP === OTP.join("")) {
      if (type === "signUp") {
        let response = "";
     
        response = await register({ name, email, password, phone  });
        console.log("response", response);
        if (response.data.code === "200") {
          setModalVisible(true);
        }
      }
    }
  };


  useEffect(() => {
    const fetchOtp = async () => {
      const otp = generateOtp();
      setGenOTP(otp);
      setMessage("");
      let response = "";
      if (type === "signUp") {
        response = await sendOtpApi({ email: email, otp: otp });
        setMessage(response.data.message);
      }
    };
    fetchOtp();
  }, [sendOTP]);

  // const loginbutton = () {
  //   navigate('auth/login')
  // }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-1 text-3xl font-semibold text-gray-700">
            Nhập mã OTP
          </h2>
          <p className="mb-4 text-xs text-gray-400 ">
            Vui lòng nhập mã OTP được gửi về tài khoản{" "}
            <span className="font-bold text-black">({email})</span>.
          </p>
          <div className="flex justify-center gap-2 mb-1">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="1"
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleInput(e, index)}
                className="w-12 h-12 text-lg font-semibold text-center border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
          {message && (
            <p className="text-sm font-bold text-green-600">{message}</p>
          )}
          <p className="mb-2 text-sm">
            Chưa nhận được mã?{" "}
            <span
              onClick={() => setSendOTP((prev) => !prev)}
              className=" hover:underline text-cyan-900"
            >
              Gửi lại
            </span>
          </p>

          <button
            type="submit"
            onClick={handleClick}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md
                  ${
                    OTP.length === 6
                      ? "bg-purple-800 hover:bg-purple-900"
                      : "bg-gray-300 cursor-not-allowed"
                  } 
                  focus:outline-none  `}
          >
            Xác nhận
          </button>
        </div>
        <Popup visible={modalVisible} onClose={closeModal}>
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 m-auto text-green-500 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h2 className="text-xl font-bold ">Thông báo</h2>
            <p>
              Bạn đã đăng ký thành công vui lòng đăng nhập để sử dụng hệ thống.
            </p>
          </div>
          <Link to="/auth/login" className="px-4 py-2 font-bold text-white bg-purple-600 rounded-md">
            <button>Đăng nhập</button>
          </Link>
        </Popup>
      </div>
    </>
  );
};
export default SendOTP;

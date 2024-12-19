import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "@/service";
import { regexPatterns } from "./validationPartten";
import { useDispatch } from "react-redux";
import { userLogin } from "@/store";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');
  
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const validateRegister = (type, value) => {
    switch (type) {
      case "email":
        return regexPatterns.email.test(value) ? "" : "Email không hợp lệ";
      default:
        return "";
    }
  };

  const handleClick = () => {
    login({ email: formLogin.email, password: formLogin.password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(userLogin({ access_token: data.access_token, role: data.role, name: data.name, uid: data.uid }));
      if (redirect) {
        navigate(decodeURIComponent(redirect));
      } else {
        navigate("/" + data.role);
      }
    }
  }, [isSuccess, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });

    const message = validateRegister(name, value);
    setErrorMessage({
      ...errorMessage,
      [name]: message,
    });
  };

  const isSubmitDisabled =
    formLogin.email.length === 0 || formLogin.password.length === 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
          Đăng Nhập
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email của bạn"
            required
          />
          {errorMessage.email && formLogin.email && (
            <p className="mt-1 text-sm text-red-500">{errorMessage.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Mật khẩu
          </label>
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
        </div>

        <button
          onClick={handleClick}
          disabled={isSubmitDisabled || isLoading}
          className={`w-full px-4 py-2 font-semibold text-white rounded-md ${
            isSubmitDisabled || isLoading
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-purple-800 hover:bg-purple-900"
          }`}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>

        {isError && (
          <p className="mt-2 text-sm text-center text-red-500">
            {error?.data?.message || "Xảy ra lỗi khi đăng nhập"}
          </p>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
        <p className="mt-4 text-sm text-center text-gray-600">
          Quên mật khẩu?
          <Link
            to="/auth/resetpassword"
            className="text-blue-500 hover:underline"
          >
            Đặt lại mật khẩu
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
// Regex cho các trường khác nhau
export const regexPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,        // Email hợp lệ
    name: /^[A-Za-z\s]+$/,// Tên chỉ chứa chữ cái và khoảng trắng
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,//Password phải chứa ít nhất 1 số từ 0-9,1 kí tự đặc biệt, ít nhất 8 kí tự
  };
  

  
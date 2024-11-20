// Regex cho các trường khác nhau
// export const regexPatterns = {
//     email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,        // Email hợp lệ
//     name: /^[A-Za-z\s]+$/,// Tên chỉ chứa chữ cái và khoảng trắng
//     password: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,//Password phải chứa ít nhất 1 số từ 0-9,1 kí tự đặc biệt, ít nhất 8 kí tự
//   };
  

  export const regexPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email hợp lệ
    name: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêểìíòóôõùúăđĩũơƯưÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ\s]+$/, // Tên chấp nhận chữ cái tiếng Việt và khoảng trắng
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, // Mật khẩu hợp lệ
    phoneNumber:/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/
};


import { set } from 'date-fns';
import React, { useState } from 'react';

const Test = () => {
  // State quản lý giá trị của input
  const [searchTerm, setSearchTerm] = useState('');
  const [listProduct,setListProduct]=useState(false)
  
  // State quản lý danh sách sản phẩm (có thể thay thế bằng API)
  const products = [
    'Áo Thun', 'Quần Jean', 'Giày Thể Thao', 'Mũ Lưỡi Trai', 'Đồng Hồ',
    'Sản phẩm 6', 'Sản phẩm 7', 'Sản phẩm 8'
  ];

  // State quản lý chỉ mục sản phẩm được chọn
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hàm để xử lý thay đổi trong ô input
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickInput=()=>{
    if(searchTerm===''){
        setListProduct(true)
    }
  }

  // Hàm để xử lý khi người dùng chọn sản phẩm
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product); // Cập nhật giá trị ô input
  };

  // Lọc sản phẩm theo từ khoá người dùng nhập
  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Ô input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onClick={handleClickInput}
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full p-2 border"
      />
      {listProduct&&(<ul className="absolute left-0 right-0 mt-1 overflow-y-auto bg-white border shadow-lg max-h-60">
          {filteredProducts.map((product, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectProduct(product)}
            >
              {product}
            </li>
          ))}
        </ul>)}

      {/* Danh sách sản phẩm */}
      {searchTerm && filteredProducts.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 overflow-y-auto bg-white border shadow-lg max-h-60">
          {filteredProducts.map((product, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectProduct(product)}
            >
              {product}
            </li>
          ))}
        </ul>
      )}

      {/* Hiển thị sản phẩm đã chọn */}
      {selectedProduct && <div className="mt-2">Sản phẩm bạn chọn: {selectedProduct}</div>}
    </div>
  );
};

export default Test;
import React, { useState } from 'react';
import { ImagePlus, X } from "lucide-react";

const ProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('discount', formData.discount);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      // const response = await axios.post('/api/products', data);
      console.log('Form data:', data);
      setFormData({ name: '', price: '', discount: '', image: null });
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
   
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => {
            setFormData(prev => ({
                ...prev,
                image: null,
            }));
            setImagePreview(null)
            onClose();
          }}
      />
      
      
      <div className="relative bg-white rounded-lg w-full max-w-3xl mx-4">
        <button 
          onClick={() => {
            setFormData(prev => ({
                ...prev,
                image: null,
            }));
            setImagePreview(null)
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold p-6 border-b">Thêm sản phẩm</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-6">
          {/* Left Column - Image Upload */}
          <div className="relative">
            <div className="w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer rounded-lg">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click để chọn ảnh</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Input fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên sản phẩm"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Nhập giá"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Nhập giảm giá"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mt-6"
            >
              Hoàn tất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
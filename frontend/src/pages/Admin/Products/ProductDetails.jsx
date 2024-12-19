import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeaderAdmin, CustomTable } from "@/components";
import { ImagePlus, X } from "lucide-react";
import axios from "../../../utils/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [chosenCategory, setChosenCategory] = useState("");

  const [formData, setFormData] = useState({});
  const categoryRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/products/category");
      if (response.code === "200") {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${id}`);
      if (response.code === 200) {
        setFormData(response.data);
        setImagePreview(response.data.image_path);

        // Tìm category name từ category_id
        const categoryData = categories.find(
          (category) => category.id === response.data.category_id
        );
        if (categoryData) {
          setChosenCategory(categoryData.name);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchProductDetail();
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category_id: value.id,
    }));
    setChosenCategory(value.name);
    setShowCategories(false);
  };


  const handleClickInput = () => {
    setShowCategories((prev) => !prev);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`/products/update/${id}`, formData);
      if (response.code === 200) {
        setSuccess("Cập nhật sản phẩm thành công!");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xoá sản phẩm này chứ?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(`/products/delete/${id}`);
      if (response.code === 200) {
        setSuccess("Xóa sản phẩm thành công!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image_path: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => navigate("/user/shoppage")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HeaderAdmin title="Chi tiết sản phẩm" />
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{success}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSuccess(null)}
          >
            <X className="fill-current h-6 w-6 text-green-500" />
          </span>
        </div>
      )}
      <div className="w-full">
        <div className="w-full h-screen  py-3 bg-white justify-center items-center">
          <h2 className="text-xl font-semibold p-6 border-b">
            Thông tin chung
          </h2>
          <form className="grid grid-cols-2 gap-6 p-6">
            <div className="relative">
              <div className="w-full aspect-[2/1] flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer rounded-lg">
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
                    <ImagePlus className="mx-auto h-full w-full text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click để chọn ảnh
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="w-full">
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-full">
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  Giá
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Nhập giá"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-full">
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Nhập số lượng"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>
          <div className="w-full px-6" ref={categoryRef}>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Danh mục sản phẩm
            </label>
            <div
              onClick={handleClickInput}
              className="w-full min-h-[40px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {chosenCategory}
            </div>

            {showCategories && (
              <div className="absolute w-full border border-gray-300 rounded mt-2 z-10 bg-white">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryChange(category)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Mô tả sản phẩm
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-4 px-6">
            <button
              onClick={handleUpdate}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mt-6"
            >
              Cập nhật
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-white border text-blue-600 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors mt-6"
            >
              Xoá sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

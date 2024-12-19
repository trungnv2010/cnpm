import React, { useState, useEffect } from "react";
import { HeaderAdmin, CustomTable } from "@/components";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState("all");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/products/getAll?page=${page}&per_page=${perPage}`
      );
      if (response.code === 200) {
        setProducts(
          response.data.items.map((product) => [
            product.id,
            product.name,
            product.quantity,
            parseInt(product.price).toFixed(0),
            new Date(product.created_at).toLocaleDateString("vi-VN"),
          ])
        );
        setTotalPages(response.data.last_page);
        setCurrentPage(response.data.current_page);
      }
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, perPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const title = [
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Số lượng",
    "Giá",
    "Ngày khởi tạo",
  ];

  return (
    <div className=" w-full">
      <HeaderAdmin title="Danh sách sản phẩm" />
      <button
        onClick={() => navigate("/admin/products/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5"
      >
        Thêm sản phẩm
      </button>
      <div className="bg-white w-full pb-3">
        <div className="flex border-b-2 border-gray-200 p-3 gap-10 ">
          <text
            className={`text-sm cursor-pointer  ${
              tabActive === "all" ? "text-blue-500" : " text-gray-500"
            }`}
            onClick={() => setTabActive("all")}
          >
            Tất cả sản phẩm
          </text>
        </div>
        <div className="flex mt-4">
          <div className="relative items-center justify-center ml-3 min-w-[40%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute mr-2 transform -translate-y-1/2 left-2 top-[50%] size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo mã sản phẩm"
              className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="gap-2 mx-3 flex">
            <button className="  px-4 py-2 rounded-md border border-gray-300">
              Ngày tạo
            </button>
            <button className="  px-4 py-2 rounded-md border border-gray-300">
              Trạng thái
            </button>
            <button className="  px-4 py-2 rounded-md border border-gray-300">
              Nhân viên phụ trách
            </button>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <CustomTable title={title} data={products} type="Products" />
        )}
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          <button
            className="border p-1 rounded hover:bg-slate-600 hover:text-white"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>

          <span className="mx-4">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            className="border p-1 rounded hover:bg-slate-600 hover:text-white"
            onClick={() => handlePageChange(currentPage + 1)}
          >
             &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;

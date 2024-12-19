import React, { useState, useEffect } from "react";
import { Package2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { HeaderAdmin } from "@/components";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";

const VoucherList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVouchers(currentPage);
  }, [currentPage]);

  const handleToggleStatus = async (voucherId) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === voucherId
          ? { ...voucher, is_active: voucher.is_active === 1 ? 0 : 1 }
          : voucher
      )
    );
  };

  const handleUpdate = async () => {
    const response = await axios.post("/discounts/update-multiple-status", {
      data: vouchers,
    });
    console.log(response);
    if (response.code === "200") {
      setSuccess("Cập nhật trạng thái thành công");
      window.scrollTo(0, 0);
    }
  };

  console.log(vouchers);

  const fetchVouchers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`/discounts/all?page=${page}`);
      if (response.code === "200") {
        setVouchers(response.data);
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      <HeaderAdmin title="Khuyến mãi" />
      <button
        onClick={() => navigate("/admin/products/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5"
      >
        Thêm mã khuyến mãi
      </button>
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
      <div className="w-full bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Voucher đang hoạt động</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full pl-8 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Voucher list */}
        <div className="space-y-4 overflow-x-auto">
          <table className="w-full">
            <thead className="text-left">
              <tr className="border-b">
                <th className="pb-2 w-16">ID</th>
                <th className="pb-2 w-64">Voucher</th>
                <th className="pb-2 text-center w-48">Ngày hết hạn</th>
                <th className="pb-2 w-24 pl-10">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="border-b">
                  <td className="py-4">{voucher.id}</td>
                  <td className="max-w-xs">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-100 p-2 rounded-full flex-shrink-0">
                        <Package2 className="text-emerald-500" size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {voucher.code}
                        </div>
                        <div className="text-sm text-gray-500">
                          {voucher.amount}
                          {voucher.type === "percentage" ? " %" : " VNĐ"}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {voucher.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    {voucher.expiry_date ? voucher.expiry_date : "-"}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="checkbox"
                        checked={voucher.is_active === 1}
                        onChange={() => handleToggleStatus(voucher.id)}
                        className="w-4 h-4 bg-green-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={20} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded ${
                  currentPage === page
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => handleUpdate()}
            className="bg-blue-500 text-white px-4 py-2 text-lg font-medium hover:bg-blue-600 rounded"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;

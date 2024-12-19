import React, { useState } from "react";
import { Info, Search, X } from "lucide-react";
import { HeaderAdmin } from "@/components";

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample customer data
  const customers = [
    {
      id: "NV0001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      status: true,
    },
    {
      id: "NV0002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      status: true,
    },
    {
      id: "NV0003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      status: false,
    },
    {
      id: "NV0004",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      status: true,
    },
    {
      id: "NV0005",
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      status: false,
    },
  ];

  return (
    <div>
      <HeaderAdmin title="Quản lý khách hàng" />
      <div className="w-full bg-white rounded-lg p-6 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6"></div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-medium">Mã khách hàng</th>
                <th className="text-left py-3 font-medium">Tên khách hàng</th>
                <th className="text-left py-3 font-medium">Email</th>
                <th className="text-left py-3 font-medium">Trạng thái</th>
                <th className="text-left py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="py-4">{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={customer.status}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </td>
                  <td>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Action Button */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <button
              className="p-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              &lt;
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="p-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Thêm khách hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;

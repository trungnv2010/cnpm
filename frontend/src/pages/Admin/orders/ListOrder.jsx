import React, { useState } from "react";
import { HeaderAdmin, CustomTable } from "@/components";
import { useNavigate } from "react-router-dom";

const ListOrder = () => {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState("all");
  const title = ["Mã đơn hàng", "Ngày tạo đơn", "Tên khách hàng", "Trạng thái đơn hàng", "Trạng thái thanh toán", "Khách phải trả"];
  const data = [
    ["1234567890", "Nguyễn Văn A", "2021-01-01", "delivered", "paid", "1000000"],
    ["1234567890", "Nguyễn Văn A", "2021-01-01", "canceled", "unpaid", "1000000"],
    ["1234567890", "Nguyễn Văn A", "2021-01-01", "pending", "unpaid", "1000000"],
    ["1234567890", "Nguyễn Văn A", "2021-01-01", "pending", "unpaid", "1000000"],
    ["1234567890", "Nguyễn Văn A", "2021-01-01", "pending", "unpaid", "1000000"],
  ];
  return (
    <div className=" w-full">
      <HeaderAdmin title="Danh sách đơn hàng" />
      <button
        onClick={() => navigate("/admin/orders/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-5"
      >
        Tạo đơn hàng
      </button>
      <div className="bg-white h-screen w-full">
        <div className="flex border-b-2 border-gray-200 p-3 gap-10 ">
          <text
            className={`text-sm cursor-pointer  ${
              tabActive === "all" ? "text-blue-500" : " text-gray-500"
            }`}
            onClick={() => setTabActive("all")}
          >
            Tất cả đơn hàng
          </text>
          <text
            className={`text-sm cursor-pointer  ${
              tabActive === "trading" ? "text-blue-500" : " text-gray-500"
            }`}
            onClick={() => setTabActive("trading")}
          >
            Đang giao dịch
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
              placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng"
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
        <CustomTable title={title} data={data} type='Orders'/>
      </div>
    </div>
  );
};

export default ListOrder;

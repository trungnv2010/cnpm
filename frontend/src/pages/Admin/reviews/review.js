import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Info } from "lucide-react";
import { HeaderAdmin } from "@/components";

const RatingStatistics = () => {
  const [timeFilter, setTimeFilter] = useState("7 ngày qua");
  const [sortFilter, setSortFilter] = useState("Số sao giảm");

  // Sample pie chart data
  const data = [
    { name: "1 sao", value: 5, color: "#8884d8" },
    { name: "2 sao", value: 10, color: "#82ca9d" },
    { name: "3 sao", value: 20, color: "#ffc658" },
    { name: "4 sao", value: 26, color: "#ff6b6b" },
    { name: "5 sao", value: 38, color: "#82ca9d" },
  ];

  // Sample ratings data
  const ratings = [
    { id: "A0001", customer: "User A", product: "B055501-A4", stars: 5 },
    { id: "A0002", customer: "User A", product: "B055501-A4", stars: 5 },
    { id: "A0003", customer: "User A", product: "B055501-A4", stars: 5 },
    { id: "A0004", customer: "User A", product: "B055501-A4", stars: 5 },
    { id: "A0005", customer: "User A", product: "B055501-A4", stars: 3 },
    { id: "A0006", customer: "User A", product: "B055501-A4", stars: 3 },
    { id: "A0007", customer: "User A", product: "B055501-A4", stars: 2 },
    { id: "A0008", customer: "User A", product: "B055501-A4", stars: 2 },
    { id: "A0009", customer: "User A", product: "B055501-A4", stars: 2 },
    { id: "A00010", customer: "User A", product: "B055501-A4", stars: 2 },
  ];

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < count ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div>
      <HeaderAdmin title="Đánh giá" />
      <div className="p-6 bg-white">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border rounded-md px-3 py-1"
            >
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
              <option>90 ngày qua</option>
            </select>
          </div>

          {/* Pie Chart */}
          <div className="flex justify-center mb-8">
            <PieChart width={400} height={200}>
              <Pie
                data={data}
                cx={200}
                cy={100}
                innerRadius={0}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mb-8">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed ratings section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Chi tiết đánh giá</h3>
            <div className="flex gap-4">
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="border rounded-md px-3 py-1"
              >
                <option>Số sao giảm</option>
                <option>Số sao tăng</option>
              </select>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border rounded-md px-3 py-1"
              >
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>90 ngày qua</option>
              </select>
            </div>
          </div>

          {/* Ratings table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Mã khách hàng</th>
                  <th className="text-left py-2">Khách hàng</th>
                  <th className="text-left py-2">Sản phẩm</th>
                  <th className="text-left py-2">Số sao</th>
                  <th className="text-left py-2"></th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => (
                  <tr key={rating.id} className="border-b">
                    <td className="py-3">{rating.id}</td>
                    <td>{rating.customer}</td>
                    <td>{rating.product}</td>
                    <td className="flex items-center gap-1">
                      {renderStars(rating.stars)}
                    </td>
                    <td>
                      <Info
                        className="text-gray-400 cursor-pointer"
                        size={18}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">
              1
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
              3
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <button className="text-blue-500">XEM TẤT CẢ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingStatistics;

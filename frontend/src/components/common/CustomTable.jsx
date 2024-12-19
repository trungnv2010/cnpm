import React from "react";
import { useNavigate } from "react-router-dom";

const CustomTable = (props) => {
  const { data, title, type } = props;
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    if (type === "Products") {
      navigate(`/admin/products/${id}`);
    }
  };

  return (
    <div className="mt-4 mx-3">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-center">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              {title.map((item, index) => (
                <th className="px-4 py-3 border-b text-center" key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(item[0])} // Gọi handleRowClick khi nhấn vào dòng
                className="cursor-pointer" // Thêm kiểu con trỏ cho dòng
              >
                <td className="px-4 py-2 border-b text-center">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                {item.map((subItem, subIndex) => (
                  <td
                    className={`px-4 py-3 border-b text-center ${
                      subIndex === 0 ? "text-blue-500" : ""
                    } ${
                      type === "Orders"
                        ? subIndex === 3
                          ? subItem === "delivered"
                            ? "text-green-500"
                            : subItem === "canceled"
                            ? "text-red-500"
                            : "text-yellow-500"
                          : subIndex === 4
                          ? subItem === "paid"
                            ? "font-bold"
                            : "text-gray-500"
                          : ""
                        : ""
                    }`}
                    key={subIndex}
                  >
                    {subItem} {subIndex === 4 && type === "Orders" && "₫"}{" "}
                    {subIndex === 3 && type === "Products" && "đ"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;

import React from "react";

const CustomTable = (props) => {
  const { data, title, type } = props;
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
              <tr key={index}>
                <td className="px-4 py-2 border-b text-center">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                {item.map((item, index) => (
                  <td
                    className={`px-4 py-3 border-b text-center ${
                      index === 0 ? "text-blue-500" : ""
                    } ${
                      type === "Orders"
                        ? index === 3 
                          ? item === "delivered" 
                            ? "text-green-500"
                            : item === "canceled" 
                            ? "text-red-500"
                            : "text-yellow-500"
                          : index === 4
                            ? item === "paid"
                              ? "font-bold"
                              : "text-gray-500"
                            : ""
                        : ""
                    }`}
                    key={index}
                  >
                    {item}
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

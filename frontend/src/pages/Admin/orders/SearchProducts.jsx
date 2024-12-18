import { HeaderAdmin } from "@/components";
import {
  useGetSearchProductsQuery,
  useGetDiscountsActiveQuery,
} from "@/service";
import { useState, useEffect, useRef } from "react";
import axios from "@/utils/axios";

const SearchProducts = ({ onStateChange, addressSelected, userId }) => {
  const [searchParam, setSearchParam] = useState("");
  const [listProducts, setListProducts] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalMoneyAfterDiscount, setTotalMoneyAfterDiscount] = useState(0);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const listProductsDropDownRef = useRef();
  const [chosenProduct, setChosenProduct] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParam);
  const [discountSelected, setDiscountSelected] = useState(null);
  const [dataProducts, setDataProducts] = useState([]);
  const {
    data: dataDiscountsActiveRaw,
    isLoading: isLoadingDiscountsActive,
    error: errorDiscountsActive,
  } = useGetDiscountsActiveQuery({ total_amount: totalMoney, user_id: userId });
  const dataDiscountsActive = dataDiscountsActiveRaw?.data;

  const getLastAddressComponent = (address) => {
    if (!address || !address.address) return "";
    const addressParts = address.address.split(",");
    return addressParts[addressParts.length - 1].trim();
  };
  const handleChangeInput = (e) => {
    setSearchParam(e.target.value);
  };

  const handleClickInput = () => {
    if (searchParam === "") {
      setListProducts(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParam]);

  const fetchProducts = async () => {
    const response = await axios.get('/products/search', {
      params: {
        query: searchParam
      }
    });
    if (response.code === 200) {
      setDataProducts(response.data);
    }
  };  

  useEffect(() => {
    if (discountSelected) {
      if (discountSelected.type === "percentage") {
        setTotalMoneyAfterDiscount(
          ((totalMoney + calculateShippingFee(addressSelected)) * (1 - discountSelected.amount / 100)).toFixed(0)
        );
      } else {
        setTotalMoneyAfterDiscount(
          ((totalMoney + calculateShippingFee(addressSelected)) - discountSelected.amount).toFixed(0)
        );
      }
    } else {
      setTotalMoneyAfterDiscount((totalMoney + calculateShippingFee(addressSelected)).toFixed(0));
    }
  }, [discountSelected, totalMoney]);

  const handleClickOutsideSearchUser = (event) => {
    if (
      listProductsDropDownRef.current &&
      !listProductsDropDownRef.current.contains(event.target)
    ) {
      setListProducts(false);
    }
  };

  const handleApplyDiscount = (discount) => {
    setDiscountSelected(discount);
    setTotalMoney(calculateTotal());
    if (discount.type === "percentage") {
      setTotalMoneyAfterDiscount(totalMoney * (1 - discount.amount / 100));
    } else {
      setTotalMoneyAfterDiscount(totalMoney - discount.amount);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchParam);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParam]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchUser);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchUser);
    };
  }, []);

  const handleChooseProduct = (product) => {
    const newProduct = {
      id: product.id,
      image: product.image_path,
      name: product.name,
      quantity: 1,
      price: product.price,
    };
    if (chosenProduct.find((item) => item.id === newProduct.id)) {
      setChosenProduct((prevProducts) =>
        prevProducts.map((item) =>
          item.id === newProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setChosenProduct([...chosenProduct, newProduct]);
    }
    setListProducts(false);
  };
  const handleDeleteChosenProduct = (index) => {
    setChosenProduct((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  };
  const handleChangeQuantity = (id, e) => {
    setChosenProduct((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Number(e.target.value) }
          : product
      )
    );
  };
  const calculateTotal = () => {
    return chosenProduct.reduce((total, product) => {
      return (
        total +
        product.quantity * product.price 
      );
    }, 0);
  };

  console.log('chosenProduct', chosenProduct);

  const calculateShippingFee = (address) => {
    if (totalMoney == 0) return 0;
    if (!address) return 0;

    let baseFee = 30000;

    const province = address.province?.toLowerCase() || "";

    if (province.includes("hà nội") || province.includes("Hà Nội")) {
      return baseFee;
    }

    if (province.includes("hồ chí minh") || province.includes("Hồ Chí Minh")) {
      return baseFee + 10000;
    }
    return baseFee + 50000;
    
  };

  const handleChooseDiscountsList = () => {
    setShowDiscounts(!showDiscounts);
  };

  const handleStateChange = () => {
    onStateChange(totalMoneyAfterDiscount, chosenProduct);
  };


  
  useEffect(() => {
    setTotalMoney(calculateTotal());
  }, [chosenProduct]);
  useEffect(() => {
    handleStateChange();
  }, [totalMoneyAfterDiscount]);



  return (
    <>
      <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold ">Thông tin sản phẩm</h2>
          <div className="relative"></div>
        </div>
        <div className="relative w-full mb-4" ref={listProductsDropDownRef}>
          <div className="relative items-center justify-center">
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
              onClick={handleClickInput}
              onChange={handleChangeInput}
              type="text"
              placeholder="Tìm kiếm theo tên , mã,.."
              className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {listProducts && (
            <ul className="absolute left-0 right-0 z-10 w-full mt-1 overflow-y-auto bg-white border shadow-lg max-h-60">
              {dataProducts?.map((product, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between w-full gap-3 p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleChooseProduct(product)}
                >
                  <span>
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-blue-700 size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg> */}
                    <img className="max-w-16" src={product.image_path} />
                  </span>
                  {product.name}
                  <br />
                  {product.id}
                  <div className="ml-auto text-right">
                    Giá tiền: {product.price}đ
                    <br />
                    <p className="text-gray-400">Tồn kho:{product.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col p-3 mt-3 text-center text-black">
            {Object.keys(chosenProduct).length === 0 && (
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 text-gray-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                  />
                </svg>

                <div className="mt-2 text-gray-300">
                  Chưa có thông tin sản phẩm
                </div>
              </div>
            )}

            {Object.keys(chosenProduct).length > 0 && (
              // <div className="grid grid-rows-1 gap-1">
              //     <div className="flex items-center justify-start font-bold text-left ">
              //     {chosenProduct?.name} -
              //     <span className="p-2 font-thin text-left ">
              //         {chosenProduct?.id}
              //     </span>
              //     <svg
              //         xmlns="http://www.w3.org/2000/svg"
              //         fill="none"
              //         viewBox="0 0 24 24"
              //         strokeWidth={1.5}
              //         stroke="currentColor"
              //         className="w-6 h-6 pt-1"
              //     >
              //         <path
              //         strokeLinecap="round"
              //         strokeLinejoin="round"
              //         d="M6 18 18 6M6 6l12 12"
              //         />
              //     </svg>
              //     </div>
              //     <div className="border-t-2 border-gray-400"></div>

              //     <div className="max-w-md p-1 text-left mr-[50rem]">
              //     <div className="flex items-center justify-between">
              //         <h3 className="items-center text-sm font-semibold uppercase">
              //         địa chỉ giao hàng
              //         </h3>
              //         <a
              //         href="#"
              //         className="text-sm text-blue-500 hover:underline"
              //         >
              //         Thay đổi
              //         </a>
              //     </div>
              //     <div className="text-base text-left ">
              //         {chosenProduct.name} -<span>{chosenProduct.id}</span>
              //     </div>

              //     </div>
              // </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-collapse border-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left border border-gray-200">
                        STT
                      </th>
                      <th className="px-4 py-2 text-left border border-gray-200">
                        Ảnh
                      </th>
                      <th className="px-4 py-2 text-center border border-gray-200">
                        Tên sản phẩm
                      </th>
                      <th className="px-4 py-2 text-center border border-gray-200">
                        Số lượng
                      </th>
                      <th className="px-4 py-2 text-center border border-gray-200">
                        Đơn giá
                      </th>
                      <th className="px-4 py-2 text-center border border-gray-200">
                        Chiết khấu
                      </th>
                      <th className="px-4 py-2 text-center border border-gray-200">
                        Thành tiền
                      </th>
                      <th className="px-4 py-2 border border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {chosenProduct?.map((product, index) => (
                      <tr>
                        <td className="px-4 py-2 border border-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          <img
                            src={product.image}
                            alt="Product"
                            className="object-cover w-12 h-12 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-gray-500">KT9227-M</div>
                        </td>
                        <td className="px-4 py-2 text-center border border-gray-200">
                          <input
                            value={product.quantity}
                            onChange={(e) =>
                              handleChangeQuantity(product.id, e)
                            }
                            type="number"
                            defaultValue={1}
                            className="w-12 text-center border border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 font-bold text-center border border-gray-200">
                          {parseFloat(product.price).toFixed(0)}đ
                        </td>
                        <td className="px-4 py-2 text-center border border-gray-200">
                          0
                        </td>
                        <td className="px-4 py-2 font-bold text-center border border-gray-200">
                          {parseInt(product.price * product.quantity).toFixed(0)}đ
                        </td>
                        <td className="px-4 py-2 text-center border border-gray-200">
                          <button
                            onClick={() => handleDeleteChosenProduct(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                                className="font-bold "
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="relative grid w-full h-full grid-cols-3 ">
          <div className="col-span-1 mt-16">
            <div className="max-w-md p-6 mx-auto mb-4 bg-white border border-black rounded-lg shadow-md border-opacity-35 ">
              <button
                className="mb-4 text-lg font-semibold text-blue-500 hover:text-blue-800"
                onClick={handleChooseDiscountsList}
              >
                Áp dụng chương trình khuyến mãi
              </button>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Tổng tiền</span>
                  <span className="font-bold">
                    {totalMoney.toFixed(0)}
                    đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Phí giao hàng</span>
                  <span className="font-bold">
                    {calculateShippingFee(addressSelected)}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="font-medium">Giảm giá</span>

                  <span className="font-bold">
                    {discountSelected?.amount ? discountSelected.amount : 0}
                    {discountSelected?.type === "percentage" ? "%" : "đ"}
                  </span>
                </div>
                <div className="flex justify-between pt-3 text-gray-700 border-t">
                  <span className="text-lg font-semibold">Tổng phải trả</span>
                  <span className="text-lg font-bold text-green-600">
                    {totalMoneyAfterDiscount}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDiscounts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[500px] bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chọn mã giảm giá</h3>
              <button onClick={handleChooseDiscountsList}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 max-h-[400px] overflow-y-auto">
              {dataDiscountsActive && dataDiscountsActive.length > 0 ? (
                dataDiscountsActive.map((discount) => (
                  <button
                    key={discount.id}
                    className="flex items-center justify-between w-full gap-2 p-3 mb-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{discount.code}</span>
                      <span className="text-sm text-gray-600">
                        Giảm {discount.amount}
                        {discount.type === "percentage" ? "%" : "đ"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Đơn tối thiểu {discount.min_purchase_amount}đ
                      </span>
                    </div>
                    <button
                      className="px-3 py-1 text-sm border border-blue-600 rounded"
                      onClick={() => handleApplyDiscount(discount)}
                      disabled={discountSelected?.id === discount.id}
                    >
                      {discountSelected?.id === discount.id
                        ? "Đã áp dụng"
                        : "Áp dụng"}
                    </button>
                  </button>
                ))
              ) : (
                <button className="flex items-center justify-center w-full gap-2 p-3 mb-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                  Chưa có mã giảm giá nào
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SearchProducts;
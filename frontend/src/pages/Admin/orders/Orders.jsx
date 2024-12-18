import { HeaderAdmin } from "@/components";
import { useGetSearchCustomerQuery, useCreateOrderMutation } from "@/service";
import { useState, useEffect, useRef } from "react";
import SearchProducts from "./SearchProducts";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const choice = "orders";
  const navigate = useNavigate();
  //tìm kiếm khách hàng
  const [searchParam, setSearchParam] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [addressSelected, setAddressSelected] = useState({});
  const listUserDropDownRef = useRef();
  const listProductDropDownRef = useRef();
  const [listUser, setListUser] = useState(false);
  const [chosenUser, setChosenUser] = useState({});
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParam);
  const [debouncedSearchProduct, setDebouncedSearchProduct] =
    useState(searchProduct);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showProvinces, setShowProvinces] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showDistricts, setShowDistricts] = useState(false);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [showWards, setShowWards] = useState(false);
  const [numberHouse, setNumberHouse] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
          );
          const data = await response.json();
          setDistricts(data.districts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Fetch wards when district is selected
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
          );
          const data = await response.json();
          setWards(data.wards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const [newAddress, setNewAddress] = useState({
    address: "",
    is_default: 0,
  });

  const handleChangeInput = (e) => {
    setSearchParam(e.target.value);
  };

  const handleClickOutsideSearchUser = (event) => {
    if (
      listUserDropDownRef.current &&
      !listUserDropDownRef.current.contains(event.target)
    ) {
      setListUser(false);
    } else setListUser(true);
  };

  const handleClickInput = () => {
    if (searchParam === "") {
      setListUser(true);
    }
  };

  // const handleClickInputProduct = () => {
  //   if (searchProduct === "") {
  //     setListProduct(true);
  //   }
  // };

  const handleChooseUser = (customer) => {
    setChosenUser(customer);
    setListUser(false);
    setAddressSelected(
      customer?.shipping_addresses?.find((address) => address.is_default === 1)
    );
  };

  // const handleChooseProduct = (product) => {
  //   setChosenProduct(product);
  //   setListProduct(false);
  // };

  const handleCancelChooseUser = () => {
    setAddressSelected(null)
    setChosenUser({});
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchUser);
    // document.addEventListener("mousedown", handleClickOutsideSearchProduct);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchUser);
      // document.removeEventListener("mousedown", handleClickOutsideSearchProduct);
    };
  }, []);

  const handleSaveNewAddress=()=>{
    const newAddress = numberHouse + ', ' + wards[0].name + ',' + districts[0].name + ',' + provinces[0].name
    setChosenUser({
      ...chosenUser,
      shipping_addresses: [...chosenUser.shipping_addresses, {address: newAddress, is_default: 0}],
    });
    setShowAddNewAddress(false)
    setNumberHouse("")
    
    setDistricts([])
    setWards([])
    setSelectedProvince(null)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setShowProvinces(false)
    setShowDistricts(false)
    setShowWards(false)
  }

  // const handleClickOutsideSearchProduct = (event) => {
  //   if (
  //     listProductDropDownRef.current &&
  //     !listProductDropDownRef.current.contains(event.target)
  //   ) {
  //     setListProduct(false);
  //   } else setListProduct(true);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchParam);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParam]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchProduct(searchProduct);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchProduct]);

  //Lấy data khách hàng
  const { data: dataCustomerRaw } = useGetSearchCustomerQuery({
    query: debouncedSearchTerm,
  });
  const dataCustomer = dataCustomerRaw?.data;

  const handleChangeAddress = () => {
    setShowAddressModal(true);
  };

  const handleCloseModal = () => {
    setShowAddNewAddress(false)
    setShowAddressModal(false);
  };

  const handleSelectAddress = (address) => {
    setAddressSelected(address);
    setShowAddressModal(false);
  };

  const handleShowAddNew = () => {
    setShowAddNewAddress(true);
  };

  const handleCancelAddNew = () => {
    setShowAddNewAddress(false);
    setNewAddress({ address: "", is_default: 0 });
  };

  const handleSubmitNewAddress = () => {
    setChosenUser({
      ...chosenUser,
      shipping_addresses: [...chosenUser.shipping_addresses, newAddress],
    });
    setShowAddNewAddress(false);
    setNewAddress({ address: "", is_default: 0 });
  };

  //Tạo đơn hàng
  const [totalMoney, setTotalMoney] = useState(0);
  const [chosenProducts, setChosenProducts] = useState([]);
  const handleStateFromSearchProduts = (
    totalMoneyState,
    chosenProductsState
  ) => {
    setTotalMoney(totalMoneyState);
    setChosenProducts(chosenProductsState);
  };
  const handleCreateOrder = async () => {
    const order_items = chosenProducts.map((product) => ({
      product_id: product.id,
      price_at_purchase: parseFloat(product.price), // Chuyển giá thành số (nếu cần)
      quantity: product.quantity,
    }));
    let response = "";
    response = await createOrder({
      order: {
        user_id: chosenUser?.id,
        total_amount: totalMoney,
        address: addressSelected.address,
      },
      user_id: chosenUser?.id,
      discount_id: 2,
      order_items: order_items,
    });
    navigate("/admin/orders")
  };
  

  //
  return (
    <>
      <HeaderAdmin title="Đơn hàng" />
      <div className="max-w-[calc(100%-1rem)] grid grid-cols-6 gap-x-6 gap-y-6">
        <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold ">Thông tin khách hàng</h2>
            <div className="relative"></div>
          </div>
          <div className="relative w-full mb-4" ref={listUserDropDownRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute mr-2 transform -translate-y-1/2 left-2 top-1/2 size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              onChange={(e) => handleChangeInput(e)}
              onClick={handleClickInput}
              placeholder="Tìm kiếm theo tên khách hàng, số điện thoại,.."
              className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {listUser && (
              <ul className="absolute left-0 right-0 w-full mt-1 overflow-y-auto bg-white border shadow-lg max-h-60">
                {dataCustomer.map((customer, index) => (
                  <li
                    key={index}
                    className="flex items-center w-full gap-3 p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleChooseUser(customer)}
                  >
                    <span>
                      <svg
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
                      </svg>
                    </span>
                    {customer.name}
                    <br />
                    {customer.phone}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col p-3 mt-3 text-center text-black">
            {Object.keys(chosenUser).length === 0 && (
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
                <div className="mt-2 text-gray-300">
                  Chưa có thông tin khách hàng
                </div>
              </div>
            )}

            {Object.keys(chosenUser).length > 0 && (
              <div className="grid grid-rows-1 gap-1">
                <div className="flex items-center justify-start font-bold text-left ">
                  {chosenUser.name} -
                  <span className="p-2 font-thin text-left ">
                    {chosenUser.phone}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 pt-1"
                    onClick={handleCancelChooseUser}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="border-t-2 border-gray-400"></div>

                <div className="max-w-md p-1 text-left mr-[50rem]">
                  <div className="flex items-center justify-between">
                    <h3 className="items-center text-sm font-semibold uppercase">
                      địa chỉ giao hàng
                    </h3>
                    <a
                      href="#"
                      onClick={handleChangeAddress}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Thay đổi
                    </a>
                  </div>
                  <div className="text-base text-left ">
                    {chosenUser.name} -<span>{chosenUser.phone}</span>
                  </div>

                  <p className="mt-1 text-gray-700">
                    {addressSelected?.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*thong tin san pham*/}
        {/* <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm">
          <div className="w-full col-span-4 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold ">Thông tin sản phẩm</h2>
              <div className="relative"></div>
            </div>
            <div className="relative w-full mb-4" ref={listProductDropDownRef}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute mr-2 transform -translate-y-1/2 left-2 top-1/2 size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên , mã,.."
                onChange={(e) => setSearchProduct(e.target.value)}
                onClick={handleClickInputProduct}
                className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                {listProduct && (
                  <ul className="absolute left-0 right-0 w-full mt-1 overflow-y-auto bg-white border shadow-lg max-h-60">
                    {dataProduct.map((product, index) => (
                      <li key={index} className="flex items-center w-full gap-3 p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleChooseProduct(product)}>
                        <div>
                          <img src={product.image_path} alt={product.name} className="w-20 h-20 rounded" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="mb-2 text-2xl font-semibold">{product.name}</p>
                          <p className="text-gray-500">{product.description}</p>
                        </div>
                        <div >
                          <p className="font-semibold">{product.price}đ</p>
                          <p className="text-gray-500">Tồn: {product.quantity} </p>
                    
                        </div>
                      </li>
                    ))}
                  </ul>
                )}  
            </div>
            <div className="flex items-center justify-between">
              <p className="mb-2 text-2xl font-semibold">{chosenProduct.name}</p>
            </div>
            
          </div>
        </div> */}
        <SearchProducts
          onStateChange={handleStateFromSearchProduts}
          addressSelected={addressSelected}
          userId={chosenUser?.id}
        />

      

        <div className="justify-end col-span-2 col-start-5">
          <div className="flex ml-40 space-x-4">
            {/* Nút Thoát */}
            <button className="p-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Thoát
            </button>

            {/* Nút Tạo đơn hàng (F1) */}
            <div className="relative">
              <button
                onClick={handleCreateOrder}
                className="flex items-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Tạo đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[500px] bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chọn địa chỉ giao hàng</h3>
              <button onClick={handleCloseModal}>
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
              {/* Button to add new address */}
              <button
                onClick={handleShowAddNew}
                className="flex items-center justify-center w-full gap-2 p-3 mb-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Thêm địa chỉ mới
              </button>

              {showAddNewAddress && (
                <div className="p-4 mb-4 border rounded-lg bg-gray-50">
                  <div className="mb-4">
                    <label className="block mb-2 text-lg font-medium">
                      Địa chỉ mới
                    </label>
                    <div className="flex-1">
                      <div className="mb-6">
                        <div className="mb-4">
                          <div
                            className="border border-gray-300 rounded-lg p-3 pr-2 flex justify-between items-center cursor-pointer"
                            onClick={() => setShowProvinces(!showProvinces)}
                          >
                            <span className="text-gray-600">
                              {selectedProvince
                                ? selectedProvince.name
                                : "Chọn tỉnh/thành phố"}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  showProvinces
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </div>

                          {showProvinces && (
                            <div className="border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
                              {provinces.map((province) => (
                                <div
                                  key={province.code}
                                  className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                                  onClick={() => {
                                    setSelectedProvince(province);
                                    setSelectedDistrict(null);
                                    setSelectedWard(null);
                                    setShowProvinces(false);
                                  }}
                                >
                                  {province.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* District Selector */}
                        <div className="mb-4">
                          <div
                            className={`border border-gray-300 rounded-lg p-3 pr-2 flex justify-between items-center ${
                              selectedProvince ? "cursor-pointer" : "opacity-50"
                            }`}
                            onClick={() =>
                              selectedProvince &&
                              setShowDistricts(!showDistricts)
                            }
                          >
                            <span
                              className={
                                !selectedProvince
                                  ? "text-gray-400"
                                  : "text-gray-600"
                              }
                            >
                              {selectedDistrict
                                ? selectedDistrict.name
                                : "Chọn quận/huyện"}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  showDistricts
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </div>

                          {showDistricts && (
                            <div className="border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
                              {districts.map((district) => (
                                <div
                                  key={district.code}
                                  className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                                  onClick={() => {
                                    setSelectedDistrict(district);
                                    setSelectedWard(null);
                                    setShowDistricts(false);
                                  }}
                                >
                                  {district.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Ward Selector */}
                        <div>
                          <div
                            className={`border border-gray-300 rounded-lg p-3 pr-2 flex justify-between items-center ${
                              selectedDistrict ? "cursor-pointer" : "opacity-50"
                            }`}
                            onClick={() =>
                              selectedDistrict && setShowWards(!showWards)
                            }
                          >
                            <span
                              className={
                                !selectedDistrict
                                  ? "text-gray-400"
                                  : "text-gray-600"
                              }
                            >
                              {selectedWard
                                ? selectedWard.name
                                : "Chọn phường/xã"}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  showWards ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </div>

                          {showWards && (
                            <div className="border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
                              {wards.map((ward) => (
                                <div
                                  key={ward.code}
                                  className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                                  onClick={() => {
                                    setSelectedWard(ward);
                                    setShowWards(false);
                                  }}
                                >
                                  {ward.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Số nhà"
                          value={numberHouse}
                          onChange={(e)=>setNumberHouse(e.target.value)}
                          className="mt-4 w-full p-3 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex items-center justify-between  gap-4">
                          <button className="mt-4 p-3 flex-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={handleSaveNewAddress}>
                            Lưu địa chỉ
                          </button>
                          <button onClick={handleCloseModal} className="mt-4 p-3 flex-1 text-black bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Existing addresses list */}
              {chosenUser?.shipping_addresses?.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  Chưa có địa chỉ nào được thêm
                </div>
              ) : (
                chosenUser?.shipping_addresses?.map((address, index) => (
                  <div
                    key={index}
                    className="p-3 mb-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectAddress(address)}
                  >
                    <div className="font-semibold">
                      {chosenUser.name} - {chosenUser.phone}
                    </div>
                    <div className="mt-1 text-gray-600">{address.address}</div>
                    {address.is_default === 1 && (
                      <span className="inline-block px-2 py-1 mt-1 text-xs text-blue-600 bg-blue-100 rounded">
                        Mặc định
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Orders;
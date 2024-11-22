import { HeaderAdmin } from "@/components";
import { useGetSearchCustomerQuery } from "@/service";
import { useState, useEffect, useRef } from "react";

const Orders = () => {
  const choice = "orders";
  //tìm kiếm khách hàng
  const [searchParam, setSearchParam] = useState("");
  const [addressSelected, setAddressSelected] = useState({});
  const listUserDropDownRef = useRef();
  const [listUser, setListUser] = useState(false);
  const [chosenUser, setChosenUser] = useState({});
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParam);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    is_default: 0
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
    }
  };

  const handleClickInput = () => {
    if (searchParam === "") {
      setListUser(true);
    }
  };

  const handleChooseUser = (customer) => {
    setChosenUser(customer);
    setListUser(false);
    setAddressSelected(customer?.shipping_addresses?.find(
      (address) => address.is_default === 1
    ));
  };
  const handleCancelChooseUser = () => {
    setChosenUser({});
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchUser);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchUser);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchParam);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParam]);

  //Lấy data khách hàng
  const { data: dataCustomerRaw } = useGetSearchCustomerQuery({
    query: debouncedSearchTerm,
  });
  const dataCustomer = dataCustomerRaw?.data;

  const handleChangeAddress = () => {
    
    setShowAddressModal(true);
  };

  const handleCloseModal = () => {
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
    setNewAddress({ address: '', is_default: 0 });
  };

  const handleSubmitNewAddress = () => {
    // TODO: Implement API call to save new address
    // After successful save:
    console.log(newAddress);
    setChosenUser({
      ...chosenUser,
      shipping_addresses: [...chosenUser.shipping_addresses, newAddress]
    });
    setShowAddNewAddress(false);
    setNewAddress({ address: '', is_default: 0 });
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
        <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm">
          <div className="w-full col-span-4 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold ">Thông tin sản phẩm</h2>
              <div className="relative"></div>
            </div>
            <div className="relative w-full mb-4">
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
                className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm">
          <p>Đóng gói và giao hàng</p>
        </div>

        <div className="justify-end col-span-2 col-start-5">
          <div className="flex ml-40 space-x-4">
            {/* Nút Thoát */}
            <button className="p-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Thoát
            </button>

            {/* Nút Tạo đơn hàng (F1) */}
            <div className="relative">
              <button className="flex items-center p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Tạo đơn hàng (F1)
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {/* Button to add new address */}
              <button 
                onClick={handleShowAddNew}
                className="w-full p-3 mb-4 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Thêm địa chỉ mới
              </button>

              {showAddNewAddress && (
                <div className="p-4 mb-4 border rounded-lg bg-gray-50">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Địa chỉ mới</label>
                    <textarea
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Nhập địa chỉ..."
                    />
                  </div>
                
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCancelAddNew}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSubmitNewAddress}
                      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Lưu địa chỉ
                    </button>
                  </div>
                </div>
              )}

              {/* Existing addresses list */}
              {chosenUser?.shipping_addresses?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Chưa có địa chỉ nào được thêm
                </div>
              ) : (
                chosenUser?.shipping_addresses?.map((address, index) => (
                  <div 
                    key={index}
                    className="p-3 mb-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectAddress(address)}
                  >
                    <div className="font-semibold">{chosenUser.name} - {chosenUser.phone}</div>
                    <div className="mt-1 text-gray-600">{address.address}</div>
                    {address.is_default === 1 && (
                      <span className="inline-block px-2 py-1 mt-1 text-xs text-blue-600 bg-blue-100 rounded">Mặc định</span>
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

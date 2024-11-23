import { HeaderAdmin } from "@/components";
import { useGetSearchProductsQuery } from "@/service";
import { useState, useEffect, useRef } from "react";
const SearchProducts=()=>{
    const [searchParam, setSearchParam] = useState("");
    const [listProducts, setListProducts] = useState(false);
    const listProductsDropDownRef = useRef();
    const [chosenProduct, setChosenProduct] = useState({});
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParam);

    const handleChangeInput = (e) => {
        setSearchParam(e.target.value);
      };
    
    
      const handleClickInput = () => {
        if (searchParam === "") {
          setListProducts(true);
        }
      };

    const handleClickOutsideSearchUser = (event) => {
        if (
          listProductsDropDownRef.current &&
          !listProductsDropDownRef.current.contains(event.target)
        ) {
          setListProducts(false);
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

    const handleChooseUser = (product) => {
        setChosenProduct(product);
        setListProducts(false);
    };
    
    const { data: dataProductsRaw } = useGetSearchProductsQuery({query:debouncedSearchTerm})

    const dataProducts = dataProductsRaw?.data;
    return(<>
        
          <div className="w-full col-span-6 p-4 mx-auto bg-white border border-gray-200 rounded-md shadow-sm ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold ">Thông tin sản phẩm</h2>
              <div className="relative"></div>
            </div>
            <div className="relative w-full mb-4" ref={listProductsDropDownRef}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute mr-2 transform -translate-y-1/2 left-2 top-[12%] size-5"
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
                {listProducts && (
                <ul className="absolute left-0 right-0 w-full mt-1 overflow-y-auto bg-white border shadow-lg max-h-60">
                {dataProducts?.map((product, index) => (
                  <li
                    key={index}
                    className="flex items-center w-full gap-3 p-2 cursor-pointer hover:bg-gray-200"
                    
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
                    {product.name}
                    <br />
                    {product.id}
                    <div className="ml-auto text-right">Số lượng tồn kho:{product.quantity}</div>
                  </li>
                ))}
                </ul>
                )}

                <div className="flex flex-col p-3 mt-3 text-center text-black">
                    {Object.keys(chosenProduct).length === 0 && (
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-gray-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                        </svg>

                        <div className="mt-2 text-gray-300">
                        Chưa có thông tin sản phẩm
                        </div>
                    </div>
                    )}

                    {Object.keys(chosenProduct).length > 0 && (
                    <div className="grid grid-rows-1 gap-1">
                        <div className="flex items-center justify-start font-bold text-left ">
                        {chosenProduct?.name} -
                        <span className="p-2 font-thin text-left ">
                            {chosenProduct?.id}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 pt-1"
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
                            className="text-sm text-blue-500 hover:underline"
                            >
                            Thay đổi
                            </a>
                        </div>
                        <div className="text-base text-left ">
                            {chosenProduct.name} -<span>{chosenProduct.id}</span>
                        </div>

                        
                        </div>
                    </div>
                    )}

                </div>

                
              
            </div>

            <div className="relative grid w-full h-full grid-cols-3 flex-">
                <div className="max-w-full max-h-full col-span-2">
                    <p>Ghi chú đơn hàng</p>
                    <textarea className="w-1/2 border-2 rounded-md resize-y "></textarea>
                </div>
                
                <div className="col-span-1">
                    <p>Áp dụng chương trình khuyến mãi</p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="grid grid-rows-6">
                            <p>Tổng tiền</p>
                            <p>chiết khấu</p>
                            <p>phí giao hàng</p>
                            <p>mã giảm giá</p>
                            <p>khách phải trả</p>
                            <p>tổng phải trả</p>
                        </div>
                        <div>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                
            </div>
            
          </div>
    </>)
}
export default SearchProducts
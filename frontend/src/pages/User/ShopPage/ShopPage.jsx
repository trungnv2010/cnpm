import Navbar from "../Navbar";
import Card from "../../../components/common/Card";
import UserFooter from "../../../components/common/UserFooter";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { useState, useEffect } from "react";

const ShopPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`/products/category/${category}`);
      setProducts(response.data);
    };
    fetchProducts();
  }, [category]);
  return (
    <>
      <div className="bg-gray-200">
        <Navbar />
        <div className="ml-20 max-w-[30rem] text-left mb-20">
          <h1 className="mt-4 mb-6 text-4xl font-bold">{category}</h1>
        </div>

        <div class="grid grid-cols-8 gap-4">
          <div class="col-span-2 ml-20 flex flex-col">
            <h1 className="mb-6 text-2xl font-bold">Lọc sản phẩm</h1>
            <p className="mb-2 font-bold">Bộ lọc</p>
            <div className="flex flex-col w-full gap-4">
              <div className="">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                />
                <span className="items-center ml-2">Hãng</span>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                />
                <span className="items-center ml-2">Đối tượng</span>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                />
                <span className="items-center ml-2">Giá</span>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
                />
                <span className="items-center ml-2">Chất liệu</span>
              </div>
            </div>
          </div>

          <div class="col-span-6 flex flex-col mr-32 mb-48 border border-gray-500 p-5 pr-14 pb-10">
            <div className="grid self-end grid-cols-3 gap-6 ">
              {products.map((item, index) => {
                return <Card dataProduct={item} />;
              })}
            </div>
          </div>

          <div className="flex flex-1 justify-center gap-8 items-center col-span-8 mb-4">
            <div className="border border-black p-2 px-4 bg-black text-white">1</div>
            <div className="border border-black p-2 px-4">2</div>
            <div className="border border-black p-2 px-4">3</div>
            <div className="border border-black p-2 px-4">...</div>
            <div className="border border-black p-2 px-4">5</div>
          </div>
        </div>
        <UserFooter />
      </div>
    </>
  );
};
export default ShopPage;

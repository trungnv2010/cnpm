import React from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";
import FooterUser from "../../components/common/UserFooter";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

const User = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/products/random").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <>
      <div className="bg-gray-200 ">
        <Navbar />
        <Slider />
        <div className="flex flex-col ">
          <div className="mb-24 text-center">
            <h2 className="text-4xl text-black uppercase">sản phẩm bán chạy</h2>
            <br />
            <p className="text-3xl text-black font-bold mt-10">
              Tổng hợp các sản phẩm bán chạy nhất 24h qua
            </p>
            <br />
            <button className="px-4 py-2 mb-10 text-black uppercase bg-white border-2 border-black">
              Xem thêm sản phẩm
            </button>
            <div className="flex items-center justify-center gap-10">
              {products.slice(0, 3).map((product) => (
                <img className="w-full max-w-[30%]" key={product.id} src={product.image_path} />
              ))}
            </div>
          </div>

          <div className="mb-24 text-center">
            <h2 className="text-4xl text-black uppercase">sản phẩm mới</h2>
            <br />
            <p className="text-xl text-gray-400">
              các mẫu đồng hồ mới được nhập về cửa hàng
            </p>
            <br />
            <button className="px-4 py-2 mb-2 text-black uppercase bg-white border-2 border-black">
              Xem thêm sản phẩm
            </button>
            <div className="flex items-center justify-center gap-10 mt-24">
                {products.slice(3, 6).map((product, index) => (
                    <img className={`w-full max-w-[33.33%] ${index === 1 ? 'mb-28' : ''}`} key={index} src={product.image_path} />
                ))  }
            
            </div>
          </div>

          <div className="mb-24 text-center">
            <h2 className="text-4xl text-black uppercase">mặt hàng ưu đãi</h2>
            <br />
            <p className="text-xl text-gray-400">
              Các sản phẩm đang được ưu đãi giảm giá
            </p>
            <br />
            <button className="px-4 py-2 mb-10 text-black uppercase bg-white border-2 border-black">
              Xem thêm sản phẩm
            </button>
            <div className="flex items-center justify-center gap-10">
             {products.slice(6, 9).map((product) => (
                <img
                  className="w-full max-w-[33.33%]"
                  key={product.id}
                  src={product.image_path}
                />
              ))    }
            </div>
          </div>

          <FooterUser />
        </div>
      </div>
    </>
  );
};

export default User;

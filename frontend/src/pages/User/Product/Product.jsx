import Navbar from "../Navbar";
import UserFooter from "../../../components/common/UserFooter";
import axios from "../../../utils/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <div className="grid grid-cols-2 gap-8 mt-10 mb-64 ml-10">
          <div className="grid grid-cols-2 gap-3 ml-20 bg-gray-100">
            <img
              src={product.image_path}
              alt={product.name}
              className="w-full h-full"
            />
          </div>

          <div className="">
            <div className="text-4xl font-bold">{product.name}</div>
            <div>{product.price}</div>
            <div className="pr-32">{product.description}</div>
            <div className="mb-4">
              <p className="text-gray-500">Size</p>
              <div className="flex gap-2">
                <button className="p-2 px-4 border border-black">S</button>
                <button className="p-2 px-4 border border-black">M</button>
                <button className="p-2 px-4 border border-black">L</button>
              </div>
            </div>
            <div className="flex items-center justify-start flex-1 gap-4">
              <button
                onClick={handleAddToCart}
                className="p-2 px-20 mt-6 text-white bg-black"
              >
                Thêm vào giỏ hàng
              </button>
              <div className="flex flex-col justify-start gap-2">
                <p className="text-gray-500">Số lượng</p>
                <input
                  className=" max-w-10"
                  type="number"
                  defaultValue={1}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <UserFooter />
      </div>
    </>
  );
};
export default Product;

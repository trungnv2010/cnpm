import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Card = (props) => {
  const { dataProduct } = props;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="bg-gray-200 p-1 rounded cursor-pointer">
      <div
        className="flex flex-col gap-2"
      >
        <div onClick={() => navigate(`/user/products/${dataProduct.id}`)}>
          <img src={dataProduct.image_path} />
        </div>
        <div className="p-1">
          <h3 className="flex-1 font-bold">{dataProduct.name}</h3>
          <p className="text-red-500 font-bold">
            {formatPrice(dataProduct.price)} đ
          </p>
          <p className="text-gray-500">Made in Japan</p>
          <div className="flex mt-4 mb-2">
            <button onClick={() => addToCart(dataProduct)} className=" p-2 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              Thêm vào giỏ hàng
            </button>
            <div className="flex-1 text-white">hi</div>
            <button className=" bg-white border border-blue-500 p-2 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
              Yêu thích
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;

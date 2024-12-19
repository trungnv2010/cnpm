import Navbar from "../Navbar";
import UserFooter from "../../../components/common/UserFooter";
import { useCart } from "@/context/CartContext";
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotal 
  } = useCart();

  const handleIncrement = (id) => {
    incrementQuantity(id);
  };
  const handleDecrement = (id) => {
    decrementQuantity(id);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  console.log("cartItems", cartItems);
  return (
    <>
      <div>
        <Navbar />
        <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-100">
          <div className="col-span-1 pl-20">
            <p className="mb-2 text-4xl font-bold">Giỏ hàng</p>

            <div>
              <div className="max-w-2xl mx-auto p-6">
                {!cartItems || cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Không có sản phẩm trong giỏ hàng
                  </p>
                ) : (
                  cartItems?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item?.image_path}
                          alt={item?.name}
                          className="w-24 h-24 object-cover"
                        />
                        <div>
                          <h2 className="text-3xl text-gray-800 font-semibold">
                            {item?.name}
                          </h2>
                          <p className="text-gray-100 flex-1">hi</p>

                          <p className="text-gray-500 font-medium">
                            {formatPrice(item?.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => handleDecrement(item?.id)}
                            className="px-3 py-1"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item?.quantity}
                            className="w-12 text-center justify-center items-center border-x border-gray-300"
                            readOnly
                          />
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="px-3 py-1"
                          >
                            +
                          </button>
                        </div>
                        
                        <button onClick={() => removeFromCart(item?.id)} className="text-gray-600 ml-16">Remove</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pr-64">
            <p className="text-4xl font-bold">Order Summary</p>
            <input
              className="w-full p-2 border border-black"
              placeholder="Enter couponhere"
            ></input>
            <div className="flex items-center justify-between ">
              <p>Tạm tính</p>
              <p>{formatPrice(getTotal())}</p>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-black">
              <p>Shipping</p>
              <p>{getTotal() === 0 ? formatPrice(0) : formatPrice(200000)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tổng</p>
              <p>{formatPrice(getTotal() + (getTotal() === 0 ? 0 : 200000))}</p>
            </div>
            <div>
              <button className="w-full p-2 text-white bg-black">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        <UserFooter />
      </div>
    </>
  );
};
export default Cart;

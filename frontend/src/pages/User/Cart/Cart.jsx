import Navbar from "../Navbar"
import UserFooter from "../../../components/common/UserFooter"
const Cart=()=>{
    return (<>
        <div>
            <Navbar/>
            <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-100">
                <div className="col-span-1 pl-20">
                    <p className="mb-2 text-4xl font-bold">Your Cart</p>
                    <p>Not ready to checkout? Continue to shopping</p>
                    <div>
                    <div class="max-w-2xl mx-auto  p-6 ">  
                        <div class="border-b border-black pb-4 mb-4">
                            <div class="flex items-center mb-4">
                                <img src="product1.jpg" alt="Sản phẩm 1" class="w-24 h-24 object-cover mr-4"/>
                                <div class="flex-grow">
                                    <h2 class="text-xl font-semibold text-gray-800">Sản phẩm 1</h2>
                                    <p class="text-gray-600">Kích cỡ: M</p>
                                    <p class="text-gray-600">Số lượng: 2</p>
                                    <p class="text-gray-800 font-bold">200.000 VNĐ</p>
                                </div>
                                <div className="flex flex-col items-end justify-between gap-2 pt-14">
                                    <p>by vendor name</p>
                                    <p className="underline">Remove</p>
                                </div>
                            </div>
                        </div>

                        <div class="border-b border-black pb-4 mb-4">
                            <div class="flex items-center mb-4">
                                <img src="product2.jpg" alt="Sản phẩm 2" class="w-24 h-24 object-cover mr-4"/>
                                <div class="flex-grow">
                                    <h2 class="text-xl font-semibold text-gray-800">Sản phẩm 2</h2>
                                    <p class="text-gray-600">Kích cỡ: L</p>
                                    <p class="text-gray-600">Số lượng: 1</p>
                                    <p class="text-gray-800 font-bold">300.000 VNĐ</p>
                                </div>
                                <div className="flex flex-col items-end justify-between gap-2 pt-14">
                                    <p>by vendor name</p>
                                    <p className="underline">Remove</p>
                                </div>
                            </div>
                        </div>


                    </div>
                    </div>
                </div>
                    
                <div className="flex flex-col gap-4 pr-64">
                    <p className="text-4xl font-bold">Order Summary</p>
                    <input className="w-full p-2 border border-black" placeholder="Enter couponhere"></input>
                    <div className="flex items-center justify-between ">
                        <p>Subtotal</p>
                        <p>200.000VND</p>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-black">
                        <p>Shipping</p>
                        <p>200.000VND</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Total</p>
                        <p>1.000.000VND</p>
                    </div>
                    <div>
                        <button className="w-full p-2 text-white bg-black">Continue to checkout</button>
                    </div>
                </div>
            </div>
            <UserFooter/>
        </div>
    </>)
}
export default Cart
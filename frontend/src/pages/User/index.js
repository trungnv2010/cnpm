import React from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";
import FooterUser from "../../components/common/UserFooter";

const User = () => {
    return (
        <>
            <div className="bg-gray-200 ">
                <Navbar/>
                <Slider/>
                <div className="flex flex-col ">
                    <div className="mb-24 text-center">
                        <h2 className="text-4xl text-black uppercase">sản phẩm bán chạy</h2>
                        <br/>
                        <p className="text-xl text-gray-400">Tổng hợp các sản phẩm bán chạy nhất 24h qua</p>
                        <br/>
                        <button className="px-4 py-2 mb-10 text-black uppercase bg-white border-2 border-black">Xem thêm sản phẩm</button>
                        <div className="flex items-center justify-center gap-10">
                            <img src="https://placehold.co/400x400"/>
                            <img src="https://placehold.co/400x400"/>
                            <img src="https://placehold.co/400x400"/>
                        </div>
                    </div>


                    <div className="mb-24 text-center">
                        <h2 className="text-4xl text-black uppercase">sản phẩm mới</h2>
                        <br/>
                        <p className="text-xl text-gray-400">các mẫu đồng hồ mới được nhập về cửa hàng</p>
                        <br/>
                        <button className="px-4 py-2 mb-10 text-black uppercase bg-white border-2 border-black">Xem thêm sản phẩm</button>
                        <div className="flex items-center justify-center gap-10 mt-24">
                            <img src="https://placehold.co/400x400"/>
                            <img className="mb-28" src="https://placehold.co/400x400"/>
                            <img src="https://placehold.co/400x400"/>
                        </div>
                    </div>

                    <div className="mb-24 text-center">
                        <h2 className="text-4xl text-black uppercase">mặt hàng ưu đãi</h2>
                        <br/>
                        <p className="text-xl text-gray-400">Các sản phẩm đang được ưu đãi giảm giá</p>
                        <br/>
                        <button className="px-4 py-2 mb-10 text-black uppercase bg-white border-2 border-black">Xem thêm sản phẩm</button>
                        <div className="flex items-center justify-center gap-10">
                            <img src="https://placehold.co/400x400"/>
                            <img src="https://placehold.co/400x400"/>
                            <img src="https://placehold.co/400x400"/>
                        </div>
                    </div>

                    <FooterUser/>

                    
                </div>
            </div>
        </>
    )
}

export default User
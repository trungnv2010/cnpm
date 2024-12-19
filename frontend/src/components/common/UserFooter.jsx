const FooterUser=()=>{
    return(<>

        <div className="mx-16 border-b-2 border-black mb-14"></div> 

        <div className="grid grid-cols-4 gap-4 mb-20">
            <div className="flex flex-col ml-12 col-span-2">
                <div className="text-2xl font-bold text-purple-700">ACORP</div>
                <div className="text-xl font-bold">Đăng ký để nhận thông tin sớm nhất</div>
              
                <div className="w-1/2 mt-2"><input className="w-full p-2 bg-gray-200 border border-black " placeholder="Enter your email"/></div>
            </div>
            
            <div className="col-span-1 ">
                <div className="mb-2 font-bold">Công ty của chúng tôi</div>
                <div>Về chúng tôi</div>
                <div>Nghề nghiệp</div>
                <div>Liên hệ</div>
                <div>Địa điểm cửa hàng</div>
            </div>
            
            <div className="col-span-1">
                <div className="mb-2 font-bold">Chính sách</div>
                <div>Chính sách vận chuyển</div>
                <div>Chính sách hoàn tiền</div>
                <div>Chính sách bảo mật</div>
                <div>Điều khoản dịch vụ</div>
            </div>
            
           
        </div>
        
        <div className="flex items-center justify-center w-full h-10 text-xl text-white uppercase bg-black">
            Link Web
        </div>
    </>)
}
export default FooterUser
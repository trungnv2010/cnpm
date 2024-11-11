import React from "react"

const Notification =()=>{

    const onClose=()=>{
        console.log('hi')
    }
    return(<>
        <div className="fixed top-0 z-50 w-full py-4 text-center text-white bg-green-500">
            <p>Mã OTP đã được nhập thành công!</p>
            <button 
                onClick={onClose} 
                className="px-4 py-2 ml-4 text-green-500 bg-white border-none rounded cursor-pointer"
            >
                Đã hiểu
            </button>
        </div>
    </>
    )
}
export default Notification
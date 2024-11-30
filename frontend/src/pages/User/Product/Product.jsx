import Navbar from "../Navbar"
import UserFooter from "../../../components/common/UserFooter"
const Product =()=>{
    return(<>
    <div className="bg-gray-100">
        <Navbar/>
        <div className="grid grid-cols-2 gap-8 mt-10 mb-64 ml-10">
            <div className="grid grid-cols-2 gap-3 ml-20 bg-gray-100">
                <div className="flex items-center justify-center h-64 bg-gray-300"><img className="w-full h-full " /></div>
                <div className="flex items-center justify-center h-64 bg-gray-300"><img className="w-full h-full" /></div>
                <div className="flex items-center justify-center h-64 bg-gray-300"><img className="w-full h-full" /></div>
                <div className="flex items-center justify-center h-64 bg-gray-300"><img className="w-full h-full" /></div>
            </div>

            


            <div className="">
                <div className="text-4xl font-bold">Tittle</div>
                <div>/price</div>
                <div>Details</div>
                <div className="mb-4">
                    Size
                    <div className="flex gap-2">
                        <button className="p-2 px-4 border border-black">S</button>
                        <button className="p-2 px-4 border border-black">M</button>
                        <button className="p-2 px-4 border border-black">L</button>
                    </div>
                </div>
                <div className="flex items-center justify-start flex-1 gap-4">
                    <button className="p-2 px-20 mt-6 text-white bg-black">Add to cart
                        </button>
                    <div className="flex flex-col justify-start gap-2">
                        <p className="text-gray-500">Số lượng</p>
                        <input className=" max-w-10" type="number" defaultValue={1}></input></div>
                </div>
            </div>
        </div>
        <UserFooter/>
    </div>
    </>)
}
export default Product
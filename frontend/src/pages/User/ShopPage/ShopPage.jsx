import Navbar from "../Navbar"
import Card from "../../../components/common/Card"
const ShopPage=()=>{
    return (<>
        <div className="bg-gray-100 ">
            <Navbar/>
            <div className="ml-20 max-w-[30rem] text-left mb-20">
                <h1 className="mt-4 mb-6 text-4xl font-bold">Shop</h1>
                <p>Chào em chào em chào em chào em chào em chào em chào emChào em chào em chào em chào em chào em chào em chào emChào em chào em chào em chào em chào em chào em chào em</p>
            </div>

            <div class="grid grid-cols-8 gap-4">
                <div class="col-span-2 ml-20 flex flex-col">
                    <h1 className="mb-6 text-2xl font-bold">Lọc sản phẩm</h1>
                    <p className="mb-2 font-bold">Categories</p>
                    <div className="flex flex-col w-full gap-4">
                        <div className="">
                            <input type="checkbox" id="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"/>
                            <span className="items-center ml-2">cha</span>
                        </div>
                        
                        <div>
                            <input type="checkbox" id="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"/>
                            <span className="items-center ml-2">cha</span>
                        </div>
                        
                        <div>
                            <input type="checkbox" id="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"/>
                            <span className="items-center ml-2">cha</span>
                        </div>
                            
                        <div>
                            <input type="checkbox" id="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-md form-checkbox focus:ring-2 focus:ring-blue-500 hover:border-blue-500"/>
                            <span className="items-center ml-2">cha</span>   
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-span-6 flex flex-col mr-32">
                    <div className="self-end mb-8">
                        <button className="p-2 border-2 border-black">Click vào đây</button>
                    </div>

                    <div className="grid self-end grid-cols-3 gap-6">
                        <Card name="Product" price={90}></Card>
                        <Card name="Product" price={90}></Card>
                        <Card name="Product" price={90}></Card>
                        <Card name="Product" price={90}></Card>
                        <Card name="Product" price={90}></Card>
                        <Card name="Product" price={90}></Card>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default ShopPage
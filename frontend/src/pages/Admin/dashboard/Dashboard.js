import BarChart from "./BarChart"
const Dashboard=()=>{
    return(<>
        {/* <div className="p-3 mb-5 bg-white rounded-md">
            <div className="font-bold uppercase">
                <p>kết quả kinh doanh trong ngày</p>
            </div>

            <div>
                
            </div>
        </div> */}
        <div>

            
            {/*first*/}
            <div class=" mx-auto mb-5 p-4 border border-gray-200 rounded-md shadow-sm bg-white">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold uppercase ">kết quả kinh doanh</h2>
                    <div class="relative">
                        <select class="block appearance-none w-full bg-white border border-gray-300  py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
                            <option>Tất cả chi nhánh</option>
                            <option>Chi nhánh 1</option>
                            <option>Chi nhánh 2</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-gray-400"></div>


                <div class="flex flex-col items-center mt-3 justify-center text-center text-black">
                    <p>Main content</p>
                </div>
            </div>
        
            {/* second*/}
            <div class=" mx-auto p-4 border border-gray-200 rounded-md shadow-sm bg-white">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold uppercase">doanh thu bán hàng</h2>
                    <div class="relative">
                        <select class="block appearance-none w-full bg-white border border-gray-300  py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
                            <option>7 ngày qua</option>
                            <option>1 tháng qua</option>
                            <option>1 năm qua</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-gray-400"></div>


                <div class="flex flex-col items-center mt-3 justify-center text-center text-black">
                    <BarChart/>
                </div>
            </div>

            
        </div>
        
    </>)
}
export default Dashboard
const FooterUser=()=>{
    return(<>

        <div className="mx-16 border-b-2 border-black mb-14"></div> 

        <div className="grid grid-cols-6 gap-4 mb-20">
            <div className="flex flex-col items-center justify-between col-span-2">
                <div className="text-2xl font-bold">Signup for our newsletter</div>
                <div>Be the first to know about out vouchers,...</div>
                <div className="w-1/2 mt-2"><input className="w-full p-2 bg-gray-200 border border-black " placeholder="Enter your email"/></div>
            </div>
            
            <div className="col-span-1 ">
                <div className="mb-2 font-bold">Lorem</div>
                <div>Lorem</div>
                <div>Lorem</div>
                <div>Lorem</div>
            </div>
            
            <div className="col-span-1">
                <div className="mb-2 font-bold">Lorem</div>
                <div>Lorem</div>
                <div>Lorem</div>
                <div>Lorem</div>
            </div>
            
            <div className="col-span-1">
                <div className="mb-2 font-bold">Lorem</div>
                <div>Lorem</div>
                <div>Lorem</div>
                <div>Lorem</div>
            </div>
        </div>
        
        <div className="flex items-center justify-center w-full h-10 text-xl text-white uppercase bg-black">
            Link Web
        </div>
    </>)
}
export default FooterUser
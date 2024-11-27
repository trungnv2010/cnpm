import React from "react";

const Slider = () => {
  return (<>
     <div className="relative  bg-gray-200 h-[500px]">
        <img className="absolute mx-auto" src="https://placehold.co/1600x500"/>
       <div className="absolute left-0 transform -translate-y-1/2 top-1/2">
         <button className="px-2 py-1 text-white bg-black">&lt;</button>
       </div>
       
       <div className="absolute right-0 transform -translate-y-1/2 top-1/2">
         <button className="px-2 py-1 text-white bg-black">&gt;</button>
       </div>
     </div>
    
    </>
  );
};

export default Slider;

import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import HomePageAdmin from "./HomePageAdmin";

const Admin = () => {
    const accessToken = useSelector((state) => state.user.accessToken);
    console.log('access token', accessToken)
    
    return (
        <>
            {/* <NavbarAdmin accessToken={accessToken}/>
            Admin {accessToken} */}
            <div className="bg-gray-200">
                <HomePageAdmin/>
            </div>
        </>
    )
}

export default Admin
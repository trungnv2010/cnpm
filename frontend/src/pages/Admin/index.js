import React from "react";
import { useSelector, useDispatch } from 'react-redux';

const Admin = () => {
    const accessToken = useSelector((state) => state.user.accessToken);
    console.log('access token', accessToken)
    return (
        <>
        Admin {accessToken}
        </>
    )
}

export default Admin
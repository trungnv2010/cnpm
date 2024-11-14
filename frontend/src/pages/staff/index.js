import React from "react";
import { useUserInfo } from "@/hooks";

const Staff = () => {
    const { userInfo } = useUserInfo();
    console.log(userInfo)
    return (
        <>
        staff
        </>
    )
}

export default Staff
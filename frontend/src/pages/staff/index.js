import React from "react";
import { useUserInfo } from "@/hooks";
import { AuthWrapper } from "@/components";


const Staff = () => {
    const { userInfo } = useUserInfo();
    console.log(userInfo)
    return (
        <>
        <AuthWrapper requiredRole="staff">
        staff
        </AuthWrapper>
        
        </>
    )
}

export default Staff
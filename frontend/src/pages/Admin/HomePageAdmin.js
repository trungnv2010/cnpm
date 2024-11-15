import NavBarAdmin from "./NavbarAdmin"
import {Dashboard} from "./dashboard"
import { useEffect, useState } from "react"

const HomePageAdmin=()=>{
    // const [choice,setChoice]=useState('')
    // const updateChoice=(newChoice)=>{
    //     setChoice(newChoice)
    // }

    // useEffect(()=>{
    //     console.log(choice.current)
    // },[choice])


    return(<>
        <Dashboard/>
        {/* <NavBarAdmin onChangeChoice={updateChoice}>
            <Dashboard/>
        </NavBarAdmin> */}
    </>
    )
}
export default HomePageAdmin
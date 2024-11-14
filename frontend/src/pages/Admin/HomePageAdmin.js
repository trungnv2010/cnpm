import NavBarAdmin from "./NavbarAdmin"
import {Dashboard} from "./dashboard"
import { useState } from "react"

const HomePageAdmin=()=>{
    const [choice,setChoice]=useState('')


    return(<>
        <NavBarAdmin>
            <Dashboard/>
        </NavBarAdmin>
    </>
    )
}
export default HomePageAdmin
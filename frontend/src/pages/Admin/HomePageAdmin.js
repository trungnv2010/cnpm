import NavBarAdmin from "./NavbarAdmin"
import {Dashboard} from "./dashboard"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Orders } from "./orders"
import Test from "./Test"

const HomePageAdmin=()=>{
    // const [choice,setChoice]=useState('')
    // const updateChoice=(newChoice)=>{
    //     setChoice(newChoice)
    // }

    // useEffect(()=>{
    //     console.log(choice.current)
    // },[choice])


    return(<>
        <Orders/>
        {/* <Test/> */}
    </>
    )
}
export default HomePageAdmin
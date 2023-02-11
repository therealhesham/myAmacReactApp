import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Logout(){
    const [logouter,setLogouter]=useState("")
    const navigate = useNavigate()
useEffect(()=>
{
    
    axios.get("https://amaccompany.onrender.com/logout").then((e)=>setLogouter(e.data) )


}
)
return(


    <>{logouter=="token deleted" ? localStorage.clear() & navigate("/login"):""}</>
)


}

export default Logout;
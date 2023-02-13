import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function Logout(){
    const [logouter,setLogouter]=useState("")
    const navigate = useNavigate()
    const ref = useRef()
function Logout(){
    
 

}
    useEffect(()=>
{
    if(!localStorage.getItem("token")){

        navigate("/login")
    }    
    axios.get("https://amaccompany.onrender.com/logout",{withCredentials:true}).then((e)=> 
    e.data =="token deleted" ? localStorage.removeItem("token")
    & window.location.reload():""
    
    )
    // ref.current = ref.current+1;

}
)
return(


    <></>
)


}

export default Logout;
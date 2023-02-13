import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function Logout(){
    const [logouter,setLogouter]=useState("")
    const navigate = useNavigate()
    const ref = useRef()
function Logout(){
    
 localStorage.clear()
 window.location.reload()

}
    useEffect(()=>
{
    if(ref.current == 0)
    axios.get("https://amaccompany.onrender.com/logout",{withCredentials:true}).then((e)=> 
    e.data =="token deleted" ? Logout():""
    
    )
    ref.current = ref.current+1;

}
)
return(


    <>{logouter=="token deleted" ? Logout() & navigate("/login"):""}</>
)


}

export default Logout;
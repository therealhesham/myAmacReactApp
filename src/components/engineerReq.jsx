import { Button, FormControl, InputLabel, MenuItem, Select, Stack ,TextField, useMediaQuery} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import io  from "socket.io-client";
import jwtDecode from "jwt-decode";
import { Form, useNavigate } from "react-router-dom";

export default function Chat (){
const [token,setToken]=useState()

const [ users,setUsers] = useState([])

const [firstName,setFirstName]=useState("")
const [receiver,setReceivers]= useState("")
const [id,setID]=useState(null)
const [message,setMessage]=useState();
const [socket,setSocket] = useState()
const [title,setTitle] = useState("")
const navigate = useNavigate()
const ref = useRef(0)
const matches = useMediaQuery('(max-width:600px)')
useEffect(()=>{
   
{!localStorage.getItem("token") ?
    
navigate("/login") :
 axios.get("https://amaccompany.onrender.com/userlists", {withCredentials:true,
  headers: {
    'Content-Type': 'application/json'
  }
}).then((e)=> {
  
  
  setUsers(e.data)
const tokens = localStorage.getItem("token")
const  decoder = jwtDecode(tokens)
setToken(decoder)
})}
},[])


//   alert(socket.id)



function clear (){
setFirstName("")
  setMessage("")
  setTitle("")
  
  }    
const mmessage = ()=>{
    axios.post("https://amaccompany.onrender.com/send",{sender:token.firstName,firstName:firstName,id:id,message:message,
      title:title},{withCredentials:true}).then(e=> e.data ? clear() : "")

      

    }
    
 
return(<>{users == "error from token Getter"? navigate("/login") :
<div>
<form  >
    
{matches ?<Stack gap={3} maxwidth="90%" style={{padding:"12px"}} >

<TextField
       
       
          id="outlined-required"
          label="العنوان"
      
      value={title}

      onChange={e=>setTitle(e.target.value) }
        />
 <TextField
          id="outlined-multiline-static"
          label="طلبات "
          multiline
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          rows={4}
          
        />       

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">ارسال الى</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"

value={firstName}
label="الموقع"
onChange={(e)=>setFirstName(e.target.value)}
>
{/* <MenuItem value="الكل" >الكل</MenuItem> */}
{users?users.map((e)=><MenuItem value={e.username} key={e._id}>{e.username}</MenuItem>): ""}



</Select>
</FormControl>
<Button onClick={mmessage} disabled={message?false:true}>submit</Button>


</Stack>:<Stack gap={3} fullWidth style={{padding:"12px" }} >

<TextField
       
       
          id="outlined-required"
          label="title"
      name="title"    
      value={title}

      onChange={e=>setTitle(e.target.value) }
        />
 <TextField
          id="outlined-multiline-static"
          label="طلبات "
          multiline
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          rows={4}
          
        />       

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">ارسال الى</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"

value={firstName}
label="الموقع"
onChange={(e)=>setFirstName(e.target.value)}
>
{/* <MenuItem value="الكل" >الكل</MenuItem> */}
{users?users.map((e)=><MenuItem value={e.firstName} key={e._id}>{e.firstName}</MenuItem>): ""}



</Select>
</FormControl>
<Button onClick={mmessage} disabled={message?false:true}>submit</Button>

</Stack>}
</form>
</div>


}</>)




}
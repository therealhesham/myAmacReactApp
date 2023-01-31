import * as React from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import socketClient  from "socket.io-client";
import { useEffect } from 'react';

export default function ColorBadge() {
    const [ users,setUsers] = useState([])
const [firstName,setFirstName]=useState("")
const [receiver,setReceivers]= useState("")
const [id,setID]=useState(null)
const [message,setMessage]=useState("");
const [token,setToken]=useState("")
useEffect(()=>
{if(!localStorage.getItem("token")){

  console.log("invalid")
}
  else{

    const token = localStorage.getItem("token")
const decoder = jwtDecode(token)
setToken(decoder)

const SERVER = "http://localhost:3000";
      
const socket = socketClient(SERVER);

//   alert(socket.id)
// socket.emit("sss","hello from client")
// socket.on("connects",(e)=>console.log(e))
console.log(socket)
socket.on("connection",(e)=>{setID(socket.id)
setFirstName(token.firstName)
})
//   if (ref.current == 0){
socket.emit("channel-join",id, {id,firstName}
)
socket.on("connects",(e)=>console.log(e))
  

}


}

)

  return (
    <Stack spacing={2} direction="row">
      <Badge badgeContent={4} color="secondary">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="success">
        <MailIcon color="action" />
      </Badge>
    </Stack>
  );
}
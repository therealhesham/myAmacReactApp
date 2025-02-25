import { Alert, Button, Stack, TextField } from "@mui/material"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { unstable_HistoryRouter, useNavigate } from "react-router-dom"
// import Cookies from 'react-cookie';






function Login(){
  
  function Refreshpage(){

    window.location.reload()
  }
  const navigate=useNavigate()
useEffect(()=>{
try {
  const decode = localStorage.getItem("token")
const decoder = jwtDecode(decode)  
navigate("/profile")
} catch (error) {
  console.log(error)
}  
  
})


const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]= useState(null)





// useEffect(()=>{
    
// const checker = localStorage.getItem("token")
// // alert(checker)
// if(!checker) return ;
// const decoder = jwtDecode(checker)
// const emailGetter = localStorage.getItem("email")
// {decoder.email && decoder.email == emailGetter ? navigate("/") : localStorage.setItem("error","data error")}
   
// }


// )
const Poster   = ()=>{
   fetch(process.env.REACT_APP_API_URL+'/login', {
  
   method: 'POST',
  headers: {
 'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email":email,
    "password":password

  }),
  Cache: 'default'
  
 ,
 credentials:"include"
})



  // axios({
  //   method: "post",
  //   url: process.env.REACT_APP_API_URL+'/login',
  //   data: {email,password}
  //   // ,withCredentials:true,
  // }
  // ,{withCredentials:true}
  // )

  .then
(e=>  {return e.json()} ).then(e=> e == "dataNotFound" ? setError("error") : 
localStorage.setItem("token",e) & window.location.reload() 


)
if(localStorage.getItem("token")){
// Refreshpage()
console.log("getter")
}
else(console.log("waiting"))

}
// 
return(
<div>
<form>
<Stack gap={3} style={{marginLeft:"25px",marginTop:"25px", width:"295px" }}   orientation="column">
    
<TextField
    //    helperText={errorID == "firstName" ? "اعد ادخال الاسم" :""}
    //       error={errorID == "firstName"? true:false}
          id="outlined-required"
          label="Email"
      name="email"    
      value={email}

      onChange={e=>setEmail(e.target.value) }
        />

        <TextField
    //    helperText={errorID == "firstName" ? "اعد ادخال الاسم" :""}
    //       error={errorID == "firstName"? true:false}
          id="outlined-required"
          label="Password"
      name="password"    
      value={password}
type="password"
      onChange={e=>setPassword(e.target.value) }
          />
{error ?<Alert  color="error">"user not found"</Alert> : ""}

<Button   onClick={Poster}variant="contained" size="medium">Submit</Button>

</Stack>
</form>
</div>


)


}

export default Login;
import { Alert, Button, Stack, TextField } from "@mui/material"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"







function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]= useState(null)


const navigate=useNavigate()


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
   fetch('https://amaccompany.onrender.com/login', {
  
   method: 'POST',
  headers: {
 'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email:email,
    password:password

  }),
  Cache: 'default'
  
 ,
 credentials:"include"
})



  // axios({
  //   method: "post",
  //   url: 'https://amaccompany.onrender.com/login',
  //   data: {email,password}
  //   // ,withCredentials:true,
  // }
  // ,{withCredentials:true}
  // )

  .then
(e=>  {return e.json()} ).then(e=>console.log(e))


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
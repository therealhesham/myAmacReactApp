import { Button, Stack, TextField } from "@mui/material"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"







function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]= useState("")


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
const Poster   =()=>{
axios.post("https://amaccompany.onrender.com/login",{email,password}).then
(e=>e.data.data == "dataNotFound" ? setError("user not reistered"):localStorage.setItem("token",e.data) & navigate("/profile") 
)

}



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
{error ? "user not found" :""}

<Button   onClick={Poster}variant="contained" size="medium">Submit</Button>

</Stack>
</form>
</div>


)


}

export default Login;
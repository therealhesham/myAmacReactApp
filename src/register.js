import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField'
import  Joi, { options }  from "joi-browser";
import Box from '@mui/material/Box';
import { Alert, Button, Input, Stack, useMediaQuery } from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import {Cloudinary} from "@cloudinary/url-gen";
import jwtDecode from "jwt-decode";

export default function Register(){
  const [username,setUserName]=useState("")
const [firstName , setFirstname]=useState("")
const [secondName , setsecondname]=useState("")
const [password , setpassword]=useState("")
const [reoeatpassword,setRepeatpassword]=useState("")
const [position , setposition]=useState("")
const [email,setEmail]=useState("")
const [ID,setID]=useState("")
const [selectedFile,setFile]= useState()
const [error,setError]= useState("")
let [errorID,setSpecificError]=useState("")
const navigate = useNavigate();
const match = useMediaQuery("(max-width: 450px)")
const matchDesktop = useMediaQuery("(min-width: 451px)")
const [url,setUrl]=useState("");
const [checkJWt,setCheck]=useState()


useEffect(()=>{
  
const localGetter = localStorage.getItem("token")
if(!localGetter) return console.log("not localGetter");
const jwtDecoder = jwtDecode(localGetter) 

if(jwtDecoder.username) setCheck(jwtDecoder);




})


const Poster=()=>{
  
const fd = new FormData()
  // const form = new FormData()
  // console.log(document.getElementById("input-file"))
  // const selectedFile = document.getElementById("input-file").files[0];
  fd.append("image",selectedFile)
// form.append("image",selectedFile)
// console.log(fd)
axios.post("https://amaccompany.onrender.com/file",fd).then(e=>setUrl(e.data))

axios.post("https://amaccompany.onrender.com/register",{username:username,
  firstName:firstName,
    secondName:secondName,
    position:position,
    email:email,
    username:username,
    password:password,
    repeatpassword:reoeatpassword,
    nationalID:ID,
url:url
    }).then(e=>e.data.error ? setError(e.data.error[0].message) & setSpecificError(e.data.error[0].path[0]): localStorage.setItem("token",e.data) 
  
    // & navigate("/")     
    )
    // console.log(error)
    // console.log(errorID)
    
}


return(
<>
 { !checkJWt ?<div>

  {match ?
  <form >
   <Stack gap={1} style={{marginLeft:"25px",marginTop:"25px", width:"295px" }}  >
  
  <TextField
         helperText={errorID == "username" ? "الاسم مستخدم من قبل" :""}
            error={errorID === "username"? true:false}
            id="outlined-required"
            label="اسم المستخدم"
         
        value={username}
  
        onChange={e=>setUserName(e.target.value) }
          />
          
  <TextField
         helperText={errorID == "firstName" ? "اعد ادخال الاسم" :""}
            error={errorID == "firstName"? true:false}
            id="outlined-required"
            label="First Name"
         
        value={firstName}
  
        onChange={e=>setFirstname(e.target.value) }
          />
          
  <TextField
   helperText={errorID == "secondName" ? "اعد ادخال الاسم" :""}
             error={ errorID == "secondName"? true:false}
            id="outlined-required"
            label="Second Name"
            name="secondName"    
            value={secondName}
            onChange={e=> setsecondname(e.target.value)}
          />
  
          
             <TextField
             helperText={errorID == "nationalID" ? "الرقم القومي غير مناسب" :""}
               error={ errorID ==  "nationalID"? true:false}
               id="outlined-required"
               label="National ID"
               name="nationalID"    
               type="number"
               
               value={ID}
               onChange={e=> setID(e.target.value)}
               
             />
          <TextField
               error={ error ==  "email"? true:false}
               helperText={error == "email" ? errorID :""}
               id="outlined-required"
               label="Email"
               name="email"    
               type="email"
               value={email}
               onChange={e=>setEmail(e.target.value)}
             />
          <TextField
               error={ errorID ==  "password"? true:false}
            id="outlined-required"
            label="Password"
            name="password"    
            type="password"
            value={password}
            onChange={e=>setpassword(e.target.value) }
          />
           <TextField
               error={ errorID ==  "repeatpassword"? true:false}
               id="outlined-required"
               label="Repeat Password"
               name="repeatpassword"    
               type="password"
               value={reoeatpassword}
               onChange={ e=>setRepeatpassword(e.target.value)}
             />
             <input type="file" onChange={e=>setFile(e.target.files[0])}/>
             <TextField
               error={ errorID ==  "position"? true:false}
               id="outlined-required"
               label="position"
               name="position"    
               type="text"
               value={position}
               onChange={e=>setposition(e.target.value)}
             />
    {error?         <Alert severity={error ? "error" :"success"}>{errorID}</Alert>:""}
             <Button   onClick={Poster} variant="contained" size="medium">Submit</Button>
             {/* <Input onClick={Poster} type="submit" value="submit" variant="contained" size="medium" /> */}
  
             </Stack>
  </form >
  :""}
  {matchDesktop? <form >
   <Stack gap={1} style={{margin:"90px", marginRight:"0px", width:"600px" }}  >
  
  <TextField
         helperText={errorID == "username" ? "الاسم مستخدم من قبل" :""}
            error={errorID === "username"? true:false}
            id="outlined-required"
            label="اسم المستخدم"
         
        value={username}
  
        onChange={e=>setUserName(e.target.value) }
          />
          
  <TextField
         helperText={errorID == "firstName" ? "اعد ادخال الاسم" :""}
            error={errorID == "firstName"? true:false}
            id="outlined-required"
            label="First Name"
         
        value={firstName}
  
        onChange={e=>setFirstname(e.target.value) }
          />
          
  <TextField
   helperText={errorID == "secondName" ? "اعد ادخال الاسم" :""}
             error={ errorID == "secondName"? true:false}
            id="outlined-required"
            label="Second Name"
            name="secondName"    
            value={secondName}
            onChange={e=> setsecondname(e.target.value)}
          />
  
          
             <TextField
             helperText={errorID == "nationalID" ? "الرقم القومي غير مناسب" :""}
               error={ errorID ==  "nationalID"? true:false}
               id="outlined-required"
               label="National ID"
               name="nationalID"    
               type="number"
               
               value={ID}
               onChange={e=> setID(e.target.value)}
               
             />
          <TextField
               error={ error ==  "email"? true:false}
               helperText={error == "email" ? errorID :""}
               id="outlined-required"
               label="Email"
               name="email"    
               type="email"
               value={email}
               onChange={e=>setEmail(e.target.value)}
             />
          <TextField
               error={ errorID ==  "password"? true:false}
            id="outlined-required"
            label="Password"
            name="password"    
            type="password"
            value={password}
            onChange={e=>setpassword(e.target.value) }
          />
           <TextField
               error={ errorID ==  "repeatpassword"? true:false}
               id="outlined-required"
               label="Repeat Password"
               name="repeatpassword"    
               type="password"
               value={reoeatpassword}
               onChange={ e=>setRepeatpassword(e.target.value)}
             />
             <input type="file" onChange={e=>setFile(e.target.files[0])}/>
             <TextField
               error={ errorID ==  "position"? true:false}
               id="outlined-required"
               label="position"
               name="position"    
               type="text"
               value={position}
               onChange={e=>setposition(e.target.value)}
             />
    {error?         <Alert severity={error ? "error" :"success"}>{errorID}</Alert>:""}
             <Button   onClick={Poster} variant="contained" size="medium">Submit</Button>
             {/* <Input onClick={Poster} type="submit" value="submit" variant="contained" size="medium" /> */}
  
             </Stack>
  </form >:""}
  </div>
  
   : navigate("/")}
</>

)}
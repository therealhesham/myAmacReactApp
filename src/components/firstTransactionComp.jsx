import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Cloudinary} from "@cloudinary/url-gen";

import axios from "axios";
import jwtDecode from "jwt-decode";
import SecondTransaction from "./secondTransactionComp";
import { useRef } from "react";
import { useEffect } from "react";
import { FileUpload } from "@mui/icons-material";


export default function FirstTransaction({fromList,data,storenames,source,places,client,unit,pader,styler
}){

// React.useEffect

    const [transactionType,setTransactionType]=useState("")
const[from,setFrom]=useState("")
const refFocus =useRef()
const[to,setTo]=useState("")
const[type,setType]=useState("")
const[date,setDate]=useState("")
const [quantity,setQuantity]=useState("")
const [destination ,setDestination ] =useState("")
const [item,setItem]=useState("")
const [notExist,setExistense]=useState("")
const [store,setStore]=useState(destination)
const [done,setDone]=useState("")
const [alert,setAlert] = useState("")
const [receipt,setReceipt]=useState("")
const [specificitems,setToGetSpecificITems]=useState([])
const [specificUnite,setSpecificUnite]=useState()
const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("")

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append(
      "upload_preset",
      "z8q1vykv"
    );
    formData.append("cloud_name","duo8svqci");
    formData.append("folder", "samples");

   await axios.post(
      `https://api.cloudinary.com/v1_1/duo8svqci/image/upload`,
      formData
    )
     .then((response) => {
       console.log(response);
       setCloudinaryImage(response.data.secure_url);
     })
     .catch((error) => {
       console.log(error);
     });  
  };





const ClearError=()=>{
    setDone(null)
    setExistense("خطأ في تسجيل البيانات .. تأكد من وجود المهام في جرد المخزن  ")


}
const Clear =()=>{
    setExistense(null)
    setDone("تم تسجيل البيانات بنجاح") 
setFrom("")

setExistense("")

setQuantity("")





}
const postHandler =async (e)=>{
    e.preventDefault()
    const find = localStorage.getItem("token")
    const details = jwtDecode(find)
    
    if (!from ||  !type || !quantity || !destination || !item || !receipt ) return setExistense("رجاء ملىء البيانات")
    await axios.post("https://amaccompany.onrender.com/transactionexport",
    {source:from,destination:destination,unit:type,quantity:quantity,items:item,file:cloudinaryImage,receiptno:receipt,user:details.username,date:date},{withCredentials:true}).
    then(e=>{
        e.data == "error" ? ClearError() : Clear()})
    
    }
    const uniteGetter=(s)=>{
        setItem(s)
        const returner = data.filter(e=>e.items === s)
        setType(returner[0].type)
        
        }
        const itemsOfSpecificStore=(s)=>{
            setDestination(s)
        const specificITem= data.filter(e=>e.store === s)
        
        setToGetSpecificITems(specificITem)
        

    }        
    const getSpecificData =async(e)   =>{
    // alert(destination)

    await axios.post("https://amaccompany.onrender.com/specificdata",{store:destination},{withCredentials:true}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
 }
return(

<form style={{width:styler }}>


<Stack   gap="12px">
    
<TextField id="outlined-basic" label="رقم الاذن" variant="outlined" 
name="quantity" value={receipt} onChange={e=>setReceipt(e.target.value)}/>
 <FormControl><input type="file" 
            placeholder="صورة الاذن" onChange ={(event) => {setUploadFile(event.target.files[0])
                handleUpload(event)
                
                ;}} 
              /> <FileUpload/> </FormControl>
<TextField id="outlined-basic" label="التاريخ" variant="outlined"  type="date"
name="date" value={date} onChange={e=>setDate(e.target.value)}/>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">المورد / المصنع</InputLabel>
<Select
name="source"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={from}
label="المورد"
onChange={(e)=>setFrom(e.target.value)}
>


{source.map(e=> <MenuItem value={e.name} key={e._id}>{e.name}</MenuItem>)  }




</Select>
</FormControl>

<FormControl fullWidth >
<InputLabel id="demo-simple-select-label" >الجهة</InputLabel>
<Select name="destination"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={destination}
label="الجهة"


autoFocus
onChange={(e)=>

    itemsOfSpecificStore(e.target.value)
 
}

>

{

  storenames.map(e=><MenuItem value={e.name} disabled={false}  key={e._id} >{e.name}</MenuItem>)



}



</Select>
</FormControl>





<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => uniteGetter(value)}
        
        options={specificitems.map((option) => option.items)}
        renderInput={(params) => <TextField {...params}  label="المهام" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />


{type
?



<Typography alignItems="center" justifyContent="center" >{type}</Typography>





:

<span>unit isn't detected</span>

}

<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={quantity} onChange={e=>setQuantity(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={postHandler} >تسجيل بيانات</Button> 

{/* <button style={{backgroundColor:"blue",color:"white"}} onClick={postHandler}>تسجيل بيانات</button> */}

{ notExist ? <Alert severity="error" >
    {notExist}</Alert>:null}
    { done ?    <Alert severity="success">{done}</Alert>:null}

 

</Stack>


</form>

)    
}


import axios from "axios"
import { useState } from "react"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";


import jwtDecode from "jwt-decode";





export default function Fourth({fromList,data,unit,styler,contractorNames}){
    const [specificitems,setToGetSpecificITems]=useState([])
    const [contractor,setContractor] = useState("")
    const [destination,setDestination] = useState("")
    const [items,setItems] = useState("")
    const [quantity,setQuantity]=useState("")
    const [specificUnite,setSpecificUnite]=useState()
    const [type,setType]=useState("")
    const [receiptno,setReceiptno]=useState("")
    const [notExist,setExistense]=useState("")
const [done,setDone]=useState("")
const [date,setDate]=useState("")
const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("")
  const [ statePreviewImage,setStatePreview]=useState(false)
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

const getSpecificData =(e)   =>{
    // alert(destination)
e.preventDefault()
    axios.post(process.env.REACT_APP_API_URL+"/specificdata",{store:destination},{withCredentials:true}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
 }
const PostHandler=async ()=>{
    if (!contractor ||  !destination || !quantity || !type || !items ) return setExistense("رجاء ملىء البيانات")
await axios.post(process.env.REACT_APP_API_URL+"/refund",
{receiptno:receiptno,contractor:contractor,destination:destination,items:items,date:date,file:cloudinaryImage,
    quantity:quantity,type:type},{withCredentials:true}).then(e=>{
        e.data == "error" ? setExistense("خطأ في التسجيل ... المهام غير متاحة بالمخزن") : setDone("تم تسجيل البيانات بنجاح")})


}
return(


<form >


<Stack gap="12px">
<TextField id="outlined-basic" label="رقم الاذن" variant="outlined" 
name="quantity" value={receiptno} onChange={e=>setReceiptno(e.target.value)}/>

<FormControl><input type="file"  
            placeholder="صورة الاذن" onChange ={(event) => {setUploadFile(event.target.files[0])
                handleUpload(event)
                
                ;}} 
              /> {cloudinaryImage? <Typography onClick={()=>setStatePreview(true)} style={{color:"green"}}>   تم رفع الملف ... لمراجعة الصورة اضغط هنا </Typography>:<Typography>في حالة وجود اذن صرف  رجاء اختيار صورة الاذن</Typography> } </FormControl>
              {statePreviewImage?<div ><img style={{height:"300px",width:"600",zIndex:1,position:"absolute",top:1}} src={cloudinaryImage} onClick={()=>setStatePreview(false)}/></div>:""}
<TextField id="outlined-basic" label="التاريخ" variant="outlined" type='date'
name="quantity" value={date} onChange={e=>setDate(e.target.value)}/>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label"> المقاول</InputLabel>
<Select
name="contractor"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={contractor}
label="المقاول"
onChange={(e)=>setContractor(e.target.value)}
>

    {contractorNames.map(e=><MenuItem value={e.name}>{e.name}</MenuItem>)}





</Select>
</FormControl>

<FormControl fullWidth >
<InputLabel id="demo-simple-select-label" >الجهة</InputLabel>
<Select name="destination"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={destination}
label="الجهة"

onFocusCapture={getSpecificData}
autoFocus
onChange={(e)=>

setDestination(e.target.value)
 
}

>

{

  fromList.map(e=><MenuItem value={e} disabled={false}   >{e}</MenuItem>)



}



</Select>
</FormControl>











<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">المهام</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"

value={items}

label="المهام"
onChange={(e)=>setItems(e.target.value) }
>

{!specificitems?"waiting":specificitems.map(e=><MenuItem value={e.items} onClickCapture={()=>setSpecificUnite(e.type)} >{e.items}</MenuItem>)}



</Select>
</FormControl>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">الوحدة</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
name="unit"
value={type}
label="الوحدة"
onChange={(e)=>setType(e.target.value)}
>


    <MenuItem value={specificUnite} >{specificUnite}</MenuItem>



</Select>
</FormControl>

<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={quantity} onChange={e=>setQuantity(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={PostHandler} >تسجيل بيانات</Button> 



{ notExist ? <Alert severity="error" >
    {notExist}</Alert>:null}
    { done ?    <Alert severity="success">{done}</Alert>:null}

 

</Stack>


</form>





)


}

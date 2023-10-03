import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Autocomplete, Button, Stack, TextField, useMediaQuery,Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";





export default function Thirdtransaction ({fromList,data,unit,styler}){

const [from , setFrom]= useState("")
const [to,setTo]=useState("")
const [items,setItems]=useState("")
const [toList ,setToList] = useState([])
const [type,setType]=useState("")
const [quantity,setQuantity]= useState("")
const [notExist,setExistense]=useState(null)
const [specificitems,setToGetSpecificITems]=useState([])
const [receipt,setReceipt]=useState("")
const [specificUnite,setSpecificUnite]=useState()
const [done,setDone]=useState(null)
const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("")
  const [ statePreviewImage,setStatePreview]=useState(false)

const[date,setDate]=useState("")
const postHandler = (e)=>{

    
e.preventDefault()
    const find = localStorage.getItem("token")
    const details = jwtDecode(find)
if (!from ||  !to || !quantity || !type || !items || !receipt ) return setExistense("رجاء ملىء البيانات")
if (from === to ) return setExistense("من فضلك غير احد المخزنين")
axios.post("https://amaccompany.onrender.com/thirdtransaction",{date:date,file:cloudinaryImage,user:details.username,receiptno:receipt,from:from,to:to,items:items,unit:type,quantity:quantity},{withCredentials:true}).then(e=>
    e.data == "error" ? ClearError("المحول اليه او قد يكون الكمية في المخزن المحول منه اقل من المطلوب ") : Clear())

}
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

function ClearError(e){
    setDone(null)
    setExistense(e)


}
const uniteGetter=(s)=>{
    setItems(s)
    const returner = data.filter(e=>e.items === s)
    setType(returner[0].type)
    
    } 

const getSpecificData =async(e)   =>{
    // alert(destination)
// ss
   await axios.post("https://amaccompany.onrender.com/specificdata",{store:from},{withCredentials:true}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
   
 }
 const Clear =()=>{
    setDone("تم تسجيل البيانات بنجاح") 
    setFrom("")
    setReceipt("")
    setTo("")
    setType("")
    setQuantity("")
    setItems("")
    setToList("")
    
 }
    
return (

<div>
<Stack gap="12px">
<TextField id="outlined-basic" label="رقم الاذن" variant="outlined" 
name="quantity" value={receipt} onChange={e=>setReceipt(e.target.value)}/>
<FormControl><input type="file"  
            placeholder="صورة الاذن" onChange ={(event) => {setUploadFile(event.target.files[0])
                handleUpload(event)
                
                ;}} 
              /> {cloudinaryImage? <Typography onClick={()=>setStatePreview(true)} style={{color:"green"}}>   تم رفع الملف ... لمراجعة الصورة اضغط هنا </Typography>:<Typography>في حالة وجود اذن صرف  رجاء اختيار صورة الاذن</Typography> } </FormControl>
              {statePreviewImage?<div ><img style={{height:"300px",width:"600",zIndex:1,position:"absolute",top:1}} src={cloudinaryImage} onClick={()=>setStatePreview(false)}/></div>:""}
<TextField id="outlined-basic" label="التاريخ" variant="outlined" type='date'
name="quantity" value={date} onChange={e=>setDate(e.target.value)}/>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">من مخزن</InputLabel>
<Select
name="from"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={from}
label="من مخزن"
onFocusCapture={getSpecificData}
onChange={(e)=>setFrom(e.target.value)}
>


{fromList.map(e=> <MenuItem value={e} key={[fromList[e]]}>{e}</MenuItem>)  }




</Select>
</FormControl>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">الى مخزن</InputLabel>
<Select
name="to"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={to}
label="الى مخزن"
onChange={(e)=>setTo(e.target.value)}
>


{fromList.map(e=> <MenuItem value={e} key={toList[e]}>{e}</MenuItem>)  }




</Select>
</FormControl>

<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => uniteGetter(value)}
          
        options={specificitems.map((option) => option.items)}
        renderInput={(params) => <TextField {...params}  label="المهام" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />

<Typography alignItems="center" justifyContent="center" >{type}</Typography>
<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={quantity} onChange={e=>setQuantity(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={postHandler} >تسجيل بيانات</Button> 

{ notExist ? <Alert severity="error" >
    {notExist}</Alert>:null}
    { done ?    <Alert severity="success">{done}</Alert>:null}

 


</Stack>





</div>



)




}
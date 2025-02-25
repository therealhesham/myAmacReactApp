// import { Stack } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Stack, TextField ,Autocomplete,Typography} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";







export default function SecondTransaction({fromList,source,contractorNames,client,data,unit , places,styler}){
const [from,setFrom]=useState("")
const [typeOfImporter,setTypeOfImporter]=useState("")
const [type,setType]=useState("")
const [quantity,setQuantity]=useState("")
const [receipt,setReceipt]=useState("");
const [items,setItems]=useState("");
const [contractor,setContractor]=useState("")

const [typeOfContracting,settypeOfContracting]=useState("");
const [lOcation,setlOcation]=useState("");
const [specificitems,setToGetSpecificITems]=useState([]);
const [notExist,setExistense]=useState(null);
const [specificUnite,setSpecificUnite]=useState();
const [done,setDone]=useState(null);
const [search,setSearcher]=useState("");
const[date,setDate]=useState("")
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




// useEffect(()=>{

//     if(ex)& Clear()


// })
const postHandler =async (e)=>{
    e.preventDefault()
    const find = localStorage.getItem("token")
    const details = jwtDecode(find)
    if (!from ||  !type || !typeOfImporter || !lOcation  ||!quantity || !items|| !receipt  ) return setExistense("رجاء ملىء البيانات")
    
    await axios.post(process.env.REACT_APP_API_URL+"/secondtransaction",{store:from,typeOfImporter:typeOfImporter,file:cloudinaryImage,
        contractor:contractor,typeOfContracting:typeOfContracting,unit:type,date:date,items:items,location:lOcation,quantity:quantity,receiptno:receipt,user:details.username},{withCredentials:true}).then(e=>
           e.data == "error" ? ClearError():
             Clear() 
            )
            
    }


    const ClearError=()=>{
        setDone(null)
        setExistense("خطأ في تسجيل البيانات .. تأكد من وجود المهام في جرد المخزن  ")
    
    
    }
    
    const Clear =()=>{
        setExistense(null)
        setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTypeOfImporter("")
setCloudinaryImage("")
setStatePreview(false)
setQuantity("")

setContractor(null)
settypeOfContracting("")



    }


 const uniteGetter=(s)=>{
    setItems(s)
    const returner = data.filter(e=>e.items === s)
    setType(returner[0].type)
    
    } 

const itemsOfSpecificStore=(s)=>{
    setFrom(s)
const specificITems= data.filter(e=>e.store === s)

setToGetSpecificITems(specificITems)

}

    return( 
    <div>
    <form  style={{width:styler }}>
<Stack   gap="12px">
<TextField id="outlined-basic" label="رقم الاذن" variant="outlined" 
name="quantity" value={receipt} onChange={e=>setReceipt(e.target.value)}/>

<FormControl><input type="file"  
            placeholder="صورة الاذن" onChange ={(event) => {setUploadFile(event.target.files[0])
                handleUpload(event)
                
                ;}} 
              /> {cloudinaryImage? <Typography onClick={()=>setStatePreview(true)} style={{color:"green"}}>   تم رفع الملف ... لمراجعة الصورة اضغط هنا </Typography>:<Typography>في حالة وجود اذن صرف  رجاء اختيار صورة الاذن</Typography> } </FormControl>
              {statePreviewImage?<div ><img style={{height:"300px",width:"600",zIndex:1,position:"absolute",top:1}} src={cloudinaryImage} onClick={()=>setStatePreview(false)}/></div>:""}
<TextField id="outlined-basic" label="التاريخ" variant="outlined" type='date'
name="date" value={date} onChange={e=>setDate(e.target.value)}/>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">المخزن</InputLabel>
<Select
name="store"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={from}

label="المخزن"
onChange={(e)=>itemsOfSpecificStore(e.target.value)}
>


{fromList.map(e=> <MenuItem value={e} key={fromList[e]}>{e}</MenuItem>)  }




</Select>
</FormControl>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label"  >نوع التنفيذ</InputLabel>
<Select
name="typeOfImporter"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={typeOfImporter}
label="ذاتي / مقاول"
onChange={(e)=>setTypeOfImporter(e.target.value)}
>


<MenuItem  value="تنفيذ ذاتي">تنفيذ ذاتي</MenuItem><MenuItem   value="تنفيذ مقاول">تنفيذ مقاول</MenuItem>




</Select>
</FormControl>
{  typeOfImporter == "تنفيذ مقاول" ?<FormControl fullWidth>
<InputLabel id="demo-simple-select-label"  >المقاول</InputLabel>
<Select
name="contractor"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={contractor}
label="المقاول"
onChange={(e)=>setContractor(e.target.value)}
>
    {contractorNames.map(e=>
<MenuItem  value={e.name}>{e.name}</MenuItem>)}

</Select>
</FormControl>
: null }
{  typeOfImporter == "تنفيذ مقاول" ?<FormControl fullWidth>
<InputLabel id="demo-simple-select-label"  >نوع العملية</InputLabel>
<Select 
name="typeOfContracting"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={typeOfContracting}
label="المقاول"
onChange={(e)=>settypeOfContracting(e.target.value)}
>


<MenuItem  value="تشغيل">تشغيل</MenuItem>
<MenuItem  value="خصم">خصم</MenuItem>




</Select>
</FormControl>
: null }
{specificitems?<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => uniteGetter(value)}
          
        options={specificitems.map((option) => option.items)}
        renderInput={(params) => <TextField {...params}  label="المهام" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />:"waiting"}
  
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">الموقع</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
name="location"
value={lOcation}
label="الموقع"
onChange={(e)=>setlOcation(e.target.value)}
>

    {places.map(e=>
<MenuItem  value={e.name}>{e.name}</MenuItem>)}
</Select>
</FormControl>
{type
?



<Typography alignItems="center"  justifyContent="center" >{type}</Typography>





:

<span>unit isn't detected</span>

}

<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={quantity} onChange={e=>setQuantity(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={postHandler} >تسجيل بيانات</Button> 
{ notExist ? <Alert severity="error" >
    {notExist}</Alert> :null}
    { done ?    <Alert severity="success">{done}</Alert> :null}

 

</Stack>
</form>




</div>

)







}

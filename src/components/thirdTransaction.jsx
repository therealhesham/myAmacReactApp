import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Stack, TextField, useMediaQuery } from "@mui/material";
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
const postHandler = (e)=>{
e.preventDefault();
e.preventDefault()
    const find = localStorage.getItem("token")
    const details = jwtDecode(find)
if (!from ||  !to || !quantity || !type || !items || !receipt ) return setExistense("رجاء ملىء البيانات")
if (from === to ) return setExistense("من فضلك غير احد المخزنين")
axios.post("https://amaccompany.onrender.com/thirdtransaction",{user:details.username,receiptno:receipt,from:from,to:to,items:items,type:type,quantity:quantity},{withCredentials:true}).then(e=>
    e.data == "error" ? setExistense("  خطأ في التسجيل ... المهام غير متاحة بالمخزن المحول اليه او قد يكون الكمية في المخزن المحول منه اقل من المطلوب ") : Clear())

}
const getSpecificData =(e)   =>{
    // alert(destination)
// ss
    axios.post("https://amaccompany.onrender.com/specificdata",{store:from},{withCredentials:true}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
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

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">المهام</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
name="items"
value={items}
label="المهام"
onChange={(e)=>setItems(e.target.value)}
>

{specificitems.map(e=><MenuItem value={e.items} onClickCapture={()=>setSpecificUnite(e.type)}>{e.items }</MenuItem>)}



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


    
<MenuItem value={specificUnite} key="1" >{specificUnite}</MenuItem>



</Select>
</FormControl>

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
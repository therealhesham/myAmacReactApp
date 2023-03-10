import axios from "axios"
import { useState } from "react"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Stack, TextField } from "@mui/material";
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';


import jwtDecode from "jwt-decode";





export default function Fourth({fromList,data,unit}){
    const [specificitems,setToGetSpecificITems]=useState([])
    const [contractor,setContractor] = useState("")
    const [destination,setDestination] = useState("")
    const [items,setItems] = useState("")
    const [receipt,setReceipt] = useState("")
    const [quantity,setQuantity]=useState("")
    const [type,setType]=useState("")
    const [notExist,setExistense]=useState("")
const [done,setDone]=useState("")
const getSpecificData =(e)   =>{
    // alert(destination)
e.preventDefault()
    axios.post("/specificdata",{store:destination}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
 }

 const Clear =()=>{
    setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTypeOfImporter("")
setType("")
setQuantity("")
setItems("")
settypeOfContracting("")



}
const PostHandler= ()=>{
    if (!contractor ||  !destination || !quantity || !type || !items || !receipt ) return setExistense("رجاء ملىء البيانات")
axios.post("/refund",{contractor:contractor,destination:destination,itens:items,
    quantity:quantity,type:type,receiptno:receipt}).thenthen(e=>{
        e.data == "error" ? setExistense("خطأ في التسجيل ... المهام غير متاحة بالمخزن") : Clear()})


}
return(


<form >


<Stack maxWidth="800px" minWidth="250px" style={{padding:"60px"}} gap="12px">
<TextField id="outlined-basic" label="رقم الاذن" variant="outlined" 
name="quantity" value={receipt} onChange={e=>setReceipt(e.target.value)}/>
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


<MenuItem value="اسماء المقاولين">اسماء المقاولين</MenuItem>




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

{!specificitems?"waiting":specificitems.map(e=><MenuItem value={e}  >{e.items}</MenuItem>)}



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


    
{unit.map(e=><MenuItem value={e} key={unit.indexOf(e)}>{e}</MenuItem>)}



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
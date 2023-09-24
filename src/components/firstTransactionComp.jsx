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

import axios from "axios";
import jwtDecode from "jwt-decode";
import SecondTransaction from "./secondTransactionComp";
import { useRef } from "react";
import { useEffect } from "react";


export default function FirstTransaction({fromList,data,source,places,client,unit,pader,styler
}){

// React.useEffect

    const [transactionType,setTransactionType]=useState("")
const[from,setFrom]=useState("")
const refFocus =useRef()
const[to,setTo]=useState("")
const[type,setType]=useState("")

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


const myTimeout = setTimeout(function (){setAlert(<Alert severity={notExist?"error":""}>{notExist}</Alert>)}, 5000)


const ClearError=()=>{
    setDone(null)
    setExistense("خطأ في تسجيل البيانات .. المهام غير متاحة بالمخزن او قد تكون اخترت وحدة غير مناسبة لقائمة الجرد..من فضلك الرجوع لقائمة الجرد من هنا ")


}
const Clear =()=>{
    setExistense(null)
    setDone("تم تسجيل البيانات بنجاح") 
setFrom("")

setExistense("")
setType("")
setQuantity("")





}
const postHandler =async (e)=>{
    e.preventDefault()
    const find = localStorage.getItem("token")
    const details = jwtDecode(find)
    
    if (!from ||  !type || !quantity || !destination || !item || !receipt ) return setExistense("رجاء ملىء البيانات")
    await axios.post("https://amaccompany.onrender.com/transactionexport",
    {source:from,destination:destination,unit:type,quantity:quantity,items:item,receiptno:receipt,user:details.uername},{withCredentials:true}).
    then(e=>{
        e.data == "error" ? ClearError() : Clear()})
    
    }
    const uniteGetter=(s)=>{
        setItem(s)
        const returner = data.filter(e=>e.items === s)
        setType(returner[0].type)
        
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





<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => uniteGetter(value)}
        //   onClickCapture={(e)=>setSpecificUnite(e.type)}
        options={data.map((option) => option.items)}
        renderInput={(params) => <TextField {...params}  label="المهام" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />


{/* <TextField id="outlined-basic" label="رقم المهام" variant="outlined" 
name="quantity" value={itemsno} onChange={e=>setQuantity(e.target.value)}/> */}
{type
?



<Typography >{type}</Typography>





:

<span>unit isn't detected</span>
//  <div>
// <FormControl fullWidth>
// <InputLabel id="demo-simple-select-label">المهام</InputLabel>
// <Select
// labelId="demo-simple-select-label"
// id="demo-simple-select"

// value={item}

// label="المهام"
// onChange={(e)=>setItem(e.target.value) }
// >

// {!specificitems?"waiting":specificitems.map(e=><MenuItem value={e.items} onClickCapture={()=>setSpecificUnite(e.type)}>{e.items}</MenuItem>)}


// </Select>
// </FormControl>

// <FormControl fullWidth>
// <InputLabel id="demo-simple-select-label">الوحدة</InputLabel>
// <Select
// labelId="demo-simple-select-label"
// id="demo-simple-select"
// name="unit"
// value={type}
// label="الوحدة"
// onChange={(e)=>setType(e.target.value)}
// >


    
// <MenuItem value={specificUnite} key="1" >{specificUnite}</MenuItem>



// </Select>
// </FormControl>

// </div> 
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


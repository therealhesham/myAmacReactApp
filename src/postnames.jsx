import * as React from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Stack, TextField ,Autocomplete} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";




function Names(){


const [label,setLabel]=useState("")
const [ contractorName,setContractorName]=useState("")
const [place,setPlace]=useState("")
const [store,setStore]=useState("")

function contractorHandler(){


    axios.post("https://amaccompany.onrender.com/namesofcontractors",{name:contractorName},{withCredentials:true}).then((e)=>{e.data?alert("تم اضافة بيانات"):"حطأ في التسجيل"}).catch(e=>console.log(e))

}

function placeHandler(){


    axios.post("https://amaccompany.onrender.com/listofplaces",{name:place},{withCredentials:true}).then((e)=>{e.data?alert("تم اضافة بيانات"):"حطأ في التسجيل"}).catch(e=>console.log(e))

}

function storeHandler(){


    axios.post("https://amaccompany.onrender.com/namesofstores",{name:store},{withCredentials:true}).then((e)=>{e.data?alert("تم اضافة بيانات"):"حطأ في التسجيل"}).catch(e=>console.log(e))

}


return(
<div>
    <form  style={{width:"400px" }}>
<Stack   gap="12px">

<TextField id="outlined-basic" label="مقاول" variant="outlined" 
name="quantity" value={contractorName} onChange={e=>setContractorName(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={contractorHandler} >اضافة مقاول</Button> 


<TextField id="outlined-basic" label="قرية" variant="outlined" 
name="quantity" value={place} onChange={e=>setPlace(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={placeHandler} >اضافة قرية</Button> 


<TextField id="outlined-basic" label="مخزن" variant="outlined" 
name="quantity" value={store} onChange={e=>setStore(e.target.value)}/>
<Button variant="contained" size="medium"  onClick={storeHandler} >اضافة مخزن</Button> 

</Stack>
</form>




</div>






)




}

export default names;

import { Alert, Button, Stack, TextField } from "@mui/material";
import axios from "axios";

import {useEffect, useState} from "react";






function PostNewDataToMainWarehouse(){

const [items,setItems] = useState("")
const [store,setStore]=useState("مخزن بني مزار الرئيسي")
const [type,setType]=useState("")
const [Quantity,setQuantity]=useState("")
const [error,setError]= useState("")
const [success,setSuccess]= useState()
const clear=()=>{
    setItems("")
    setStore("مخزن بني مزار الرئيسي")
    setType("")
    setQuantity("")
    setError(null)
    setSuccess("تم تسجيل البيانات بنجاح")
    }
    
const PostHandler = (e)=>{
    e.preventDefault()
    
axios.post("https://amaccompany.onrender.com/postnewdatatostore",{items:items,store:store,type:type,quantity:Quantity},{withCredentials:true}).
then(e=>e.data == "success" ? clear() :setError("يرجى مراعاة ادخال البيانات الصحيحة"))

}
const conditionalAlert=()=>{
if (!error) {
    return null
} else if(error == "يرجى مراعات ادخال البيانات الصحيحة"){
    <Alert severity="error">خطأ في ادخال البيانات</Alert>
}
else{
<Alert severity="sunccess">{error}</Alert>

}

}
return(

<div> 
    <form >
    <Stack maxWidth="800px" minWidth="250px" style={{padding:"60px"}} gap="12px">

<TextField id="outlined-basic" label="المخزن" variant="outlined"
 type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/>
<TextField id="outlined-basic" label="المهام" variant="outlined" 
name="items" value={items} onChange={(e)=>setItems(e.target.value)}/>
<TextField id="outlined-basic" label="الوحدة" variant="outlined"
 name="type" value={type} onChange={(e)=> setType(e.target.value)}/>
<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={Quantity} onChange={e=>setQuantity(e.target.value)}/>
<Button variant="contained" size="medium" onClick={PostHandler}>تسجيل بيانات</Button>

{error ? <Alert severity="error">خطأ في ادخال البيانات</Alert>:null}
{success ? <Alert severity="success">تم تسجيل البيانات بنجاح</Alert>:null}

</Stack></form>
</div>









)









}


export default PostNewDataToMainWarehouse;

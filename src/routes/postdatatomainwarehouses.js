import { Alert, Autocomplete, Button, Stack, TextField } from "@mui/material";
import axios from "axios";

import {useEffect, useState} from "react";






function PostNewDataToMainWarehouse(){

const [items,setItems] = useState("")
const [store,setStore]=useState("")
const [type,setType]=useState("")
const [Quantity,setQuantity]=useState("")
const [error,setError]= useState("")
const [success,setSuccess]= useState()
const [stores,setStores]=useState([])
const clear=()=>{
    setItems("")
    setStore("مخزن بني مزار الرئيسي")
    setType("")
    setQuantity("")
    setError(null)
    setSuccess("تم تسجيل البيانات بنجاح")
    }


async function dataGetter(){
    await axios.get("https://amaccompany.onrender.com/listofstores",{withCredentials:true}).then((e) => 
    
     setStores(e.data)
     )



}
useEffect(()=>{
    
  dataGetter();
},[])
    

const PostHandler = async (e)=>{
    e.preventDefault()
    
await axios.post("https://amaccompany.onrender.com/postnewdatatostore",{items:items,store:store,type:type,quantity:Quantity},{withCredentials:true}).
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
    <Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setStore(value)}
        //   onClickCapture={(e)=>setSpecificUnite(e.type)}
        options={stores.map((option) => option.name)}
        renderInput={(params) => <TextField {...params}  label="المخازن" placeholder="اختر المخزن"/>}
      />
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

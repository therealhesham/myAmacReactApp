// import { Stack } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Button, Stack, TextField ,Autocomplete} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";







export default function SecondTransaction({fromList,source,client,data,unit , styler}){
const [from,setFrom]=useState("")
const [typeOfImporter,setTypeOfImporter]=useState("")
const [contractor,setContractor]=useState("")
const [type,setType]=useState("")
const [quantity,setQuantity]=useState("")
const [receipt,setReceipt]=useState("")
const [items,setItems]=useState("")
const [typeOfContracting,settypeOfContracting]=useState("")
const [lOcation,setlOcation]=useState("")
const [specificitems,setToGetSpecificITems]=useState([])
const [notExist,setExistense]=useState(null)
const [specificUnite,setSpecificUnite]=useState()
const [done,setDone]=useState(null)
// useEffect(()=>{

//     if(ex)& Clear()


// })
const postHandler =async (e)=>{
    e.preventDefault()
    const find = localStorage.getItem("token")
    const details = jwtDecode(find)
    if (!from ||  !type || !typeOfImporter || !lOcation  ||!quantity || !items|| !receipt  ) return setExistense("رجاء ملىء البيانات")
    console.log(type,from,items)
    await axios.post("https://amaccompany.onrender.com/secondtransaction",{store:from,typeOfImporter:typeOfImporter,
        contractor:contractor,typeOfContracting:typeOfContracting,unit:type,
        items:items,location:lOcation,quantity:quantity,receiptno:receipt,user:details.username},{withCredentials:true}).then(e=>
           e.data == "error" ? setExistense("   ..خطأ في التسجيل ... المهام غير متاحة بالمخزن او وحدات المنصرف  لا تناسب وحدات الجرد") :
             Clear() 
            )
            
    }


    const Clear =()=>{
setExistense(null)
        setDone("تم تسجيل البيانات بنجاح") 
setFrom("")
setTypeOfImporter("")
setType("")
setQuantity("")
setItems("")
settypeOfContracting("")



    }
    const getSpecificData =(e)   =>{
    // alert(destination)

    axios.post("https://amaccompany.onrender.com/specificdata",{store:from},{withCredentials:true}).then((e)=>setToGetSpecificITems(e.data)).catch(e=>console.log(e))
    // console.log(destination);
    
 }
return(


<div>
    <form  style={{width:styler }}>
<Stack   gap="12px">
<TextField id="outlined-basic" label="رقم الاذن" variant="outlined" 
name="quantity" value={receipt} onChange={e=>setReceipt(e.target.value)}/>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">المخزن</InputLabel>
<Select
name="store"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={from}
onFocusCapture={getSpecificData}
label="المخزن"
onChange={(e)=>setFrom(e.target.value)}
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
<MenuItem  value="عادل">عادل</MenuItem>
<MenuItem  value="عبدالعال">عبدالعال</MenuItem>
<MenuItem  value="مخيمر">مخيمر</MenuItem>
<MenuItem  value="كامل عيد">كامل عيد</MenuItem>
<MenuItem  value="احمد سليمان">احمد سليمان</MenuItem>
<MenuItem  value="محمد السيد عصفور">محمد السيد عصفور</MenuItem>
<MenuItem  value="ربيع فايز">ربيع فايز</MenuItem>
<MenuItem  value="علي ابو العز">علي ابو العز</MenuItem>
<MenuItem  value="بكر راضي">بكر راضي</MenuItem>
<MenuItem  value="حنا فرج">حنا فرج </MenuItem>
<MenuItem  value="علاء حسن">علاء حسن</MenuItem>
<MenuItem  value="عيسى">عيسى</MenuItem>
<MenuItem  value="نور حجازي">نور حجازي</MenuItem>
    <MenuItem  value="ماهر حسين">ماهر حسين</MenuItem>
<MenuItem  value="سمير ثابت">سمير ثابت</MenuItem>
<MenuItem  value="ابو راس">ابو راس</MenuItem>
    <MenuItem  value="محمد عبدالظاهر">محمد عبدالظاهر</MenuItem>
<MenuItem  value="صفوت طه">صفوت طه</MenuItem>
<MenuItem  value="عمر حامد">عمر حامد</MenuItem>
<MenuItem  value="مصطفى اشرف">مصطفى اشرف</MenuItem>

<MenuItem  value="ناجح حمدي">ناجح حمدي</MenuItem>

<MenuItem  value="سيد عبدالنبي">سيد عبدالنبي</MenuItem>



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
          onInputChange={(event, value) => setItems(value)}
          
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
<MenuItem value="جبل الطير" >جبل الطير</MenuItem>
<MenuItem value="ابوقرقاص" >ابوقرقاص</MenuItem>
<MenuItem value="ابشاق" >ابشاق</MenuItem>
<MenuItem value="ابوان" >ابوان</MenuItem>
<MenuItem value="بردنوها" >بردنوها</MenuItem>
<MenuItem value="نزلة جلف" >نزلة جلف</MenuItem>
<MenuItem value="ابوجرج" >ابوجرج</MenuItem>
<MenuItem value="سلاقوس" >سلاقوس</MenuItem>
<MenuItem value="شلقام" >شلقام</MenuItem>
<MenuItem value="دمشير" >دمشير</MenuItem>
<MenuItem value="بني سعيد" >بني سعيد</MenuItem>
<MenuItem value="جريس" >جريس</MenuItem>
<MenuItem value="كوم محرص" >كوم محرص</MenuItem>
<MenuItem value="السعدية" >السعدية</MenuItem>
<MenuItem value="بني خالد" >بني خالد</MenuItem>
<MenuItem  value="طوخ الخيل">طوخ الخيل</MenuItem>
<MenuItem  value="دشطوط">دشطوط</MenuItem>
<MenuItem  value="ريحانة">ريحانة</MenuItem>
<MenuItem  value="سفاي">سفاي</MenuItem>
<MenuItem  value="دعبس">دعبس</MenuItem>
<MenuItem  value="اطفيح">اطفيح</MenuItem>
<MenuItem  value="البرنسات">البرنسات</MenuItem>
<MenuItem  value="دمشاو هاشم">دمشاو هاشم</MenuItem>
<MenuItem  value="سمالوط">سمالوط</MenuItem>

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


    
<MenuItem value="م/ط" key="1" >م/ط</MenuItem>
<MenuItem value="طن" key="2" >طن</MenuItem>
<MenuItem value="عدد" key="3" >عدد</MenuItem>
<MenuItem value="م2" key="4" >م2</MenuItem>


</Select>
</FormControl>

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

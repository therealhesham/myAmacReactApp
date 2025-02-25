import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
import _, { update } from "lodash"
import Paginat from "./pagination";
import { TextField,Typography ,Box, Button,InputLabel, MenuItem,Alert, Stack,Autocomplete, useMediaQuery, Select,ButtonBase, FormControl,FormLabel, FormHelperText, FormControlLabel, Checkbox ,Modal} from "@mui/material";
import Transaction from "./addtransaction";
import socketClient  from "socket.io-client";
import App from "./App";
import { Link, Navigate, useMatch, useNavigate } from "react-router-dom";
import ComboBox from "./search";
import jwtDecode from "jwt-decode";
import printJS from "print-js";
import ListCompon from "./listComponent";

function DataPreview(){
const [data,setData]=useState([]);
const [updater,setUpdater]= useState("")
const [done,setDone]=useState("")

const [startpage,setPage] = useState(0)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const [token,setToken]=useState()
const ref = useRef(0);
const [typeOfImporter,setTypeOfImporter]=useState("")

const [from,setFrom]=useState("")
const [authenticator,setAuthenticator]=useState("");
const [admin,isAdmin]=useState(true)
const [items,setItems] = useState("")
const [store,setStore]=useState("")
const [type,setType]=useState("")
const [Quantity,setQuantity]=useState("")
const [error,setError]= useState("")
// const [id,setID]= useState("")
const [storeNames,setStoreNames]=useState([])
const [success,setSuccess]= useState()
const[factories,setFactories]=useState([])
const [printDataDelet,setPrintDataDelet]=useState(searchedData)
const navigate = useNavigate()
const [contractor,setContractor]=useState("")
const [contractorNames,setContractors]=useState([])
  const [places,setPlaces]=useState([])
  const [stores,setStores]=useState([])

const [typeOfContracting,settypeOfContracting]=useState("");
const [lOcation,setlOcation]=useState("");
const[exportQuantity,setExportQuantity]=useState(0)
const [zero,setZero]= useState(0)
const [open, setOpen] = useState(false);
const [openExportingModal,setOpenExportingModal]=useState(false)
const handleOpen = () => setOpen(true);

const handleCloseExporting=()=>{

setReceiptNO("")    
  setItems("");

  setStore("");
setType("");
  
setQuantity(0);
// setUpdater(id)     
  setOpenExportingModal(false)



}


const handleClose = () => 
  {

setReceiptNO("")    
    
    setItems("");

    setStore("");
setType("");
    
setQuantity(0);
// setUpdater(id)     
    setOpen(false)
  
  }
    const ClearError=()=>{
  setDone(null)
  setExistense("خطأ في تسجيل البيانات .. تأكد من وجود المهام في جرد المخزن  ")


}
const Clear =()=>{
  setExistense(null)
  setDone("تم تسجيل البيانات بنجاح") 
setFrom("")

setExistense("")

setQuantity("")
setOpenExportingModal(false)
setOpen(false)
setDateNow(Date.now())




}


const matches = useMediaQuery('(max-width:400px)');
async function dataGetter(){
  
    await axios.get(process.env.REACT_APP_API_URL+"/listofstores",{withCredentials:true}).then((e) => 
    
     setStores(e.data)
     )
    


  await axios.get(process.env.REACT_APP_API_URL+"/listofnames",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
  setContractors(_.reverse(e.data))).catch(error=>console.log(error))
  
  
  await axios.get(process.env.REACT_APP_API_URL+"/listofplaces",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
  setPlaces(_.reverse(e.data))).catch(error=>console.log(error))
  

//  await axios.get(process.env.REACT_APP_API_URL+"/listofstores",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
//   setStoreNames(e.data))
  await axios.get(process.env.REACT_APP_API_URL+"/listoffactories",{withCredentials:true}).then((e) => 
    setFactories(e.data)
    )
 
}

const [dateNow,setDateNow]=useState(Date.now());
useEffect(()=>{
  (async function GetMainData(){
  await axios.get(process.env.REACT_APP_API_URL+"/preview",{withCredentials:true}).then((e) => 
    
    e.data == "not authenticated" ?navigate("/login") :setSearcher(e.data) & setData(e.data) 
    )})()
  
  // if(ref.current == zero){ 
    
    
//     console.log(data )

if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
  dataGetter();
  }
  else if (!localStorage.getItem("token")){
navigate("/login")


  }
    setZero(zero + 1)
    
// }
// else  {
// // ref.current = 1
// }
}
    ,[dateNow])
    
    
    // console.log(ref.current);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const [code,setCode]=useState("");
    const [sayedCode,setSayedCode]=useState("");
    const [refundLocation,setRefundLocation]=useState("")
    const [refundContractor,setRefundContractor]=useState("");
    const [executionType ,setExecutionType]=useState("");
const [searchValue,setSearchValue]=useState("");
const [searchValueByCode,setSearchValueByCode]=useState("");
const [searchedStore,setSearchedStore]=useState("");

const filterStore = (s) =>{
  s.preventDefault()
  setSearchedStore(s.target.value)
const mapper = data.filter(e=>e.store.includes(s.target.value))

setSearcher(mapper)
setPage(1)
// .includes("سلاقوس")

// data.filter((e)=>e.includes("مواسير"))
// console.log(newData);

}





const arraySearch=[]
const Search = (s)=>{
s.preventDefault();
setSearchValue(s.target.value.ArtoEn())
// console.log(`${s.target.value}`.trim());
function areAllItemsInArray(arr1, arr2) {
  const set2 = new Set(arr2);  // Convert arr2 to a Set for faster lookup
  return arr1.some(item => set2.has(item));
}

const specificSearch = data.filter(b=>b.items.includes(s.target.value.ArtoEn()));
const filtering =data.filter(e=>{
const n = e.items.split(s.target.value.ArtoEn());

return areAllItemsInArray(n,s.target.value.ArtoEn())

});
arraySearch.push(...specificSearch,...filtering)
const uniqueArray = arraySearch.filter((value, index, self) => {
  return self.indexOf(value) === index;
});
setSearcher(uniqueArray)
setPage(1)

    }
 
    const SearchByCode = (s)=>{
      s.preventDefault();
      setSearchValueByCode(s.target.value.ArtoEn())
      // console.log(`${s.target.value}`.trim());
      const mapperCodeSearch = data.filter(e=>e.code.includes(s.target.value.ArtoEn()));
      
      setSearcher(mapperCodeSearch)
      setPage(1)
      // .includes("سلاقوس")
      
      // data.filter((e)=>e.includes("مواسير"))
      // console.log(newData);
      
          }
  const style= {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };       

          const styleDelete = {
          display:"flex",
          flexDirection:"column",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };       
const [notExist,setExistense]=useState("")
 
    const [falser,setFalser]=useState(false)
    const setStoreQuery=(s)=>{
      setFalser(true)
if (searchValue.length > 0 ) {
const mapper = data.filter(e=>e.items.includes(s.target.value.ArtoEn()))
const mmm = mapper.filter(e=> e.store.includes(s.target.value))
setSearcher(mmm)
}
 else {     const we= data.filter(e=> e.store.includes(s.target.value) )

      setSearcher(we)}
          }

const [confirmationPassword,setConfirmationPassword]=useState("")
    const [deletedID,setDeletedID]=useState("")      
    const [DeleterModalOpen,setDeleterModalOpen]=useState(false)
    const DeleteModal = async (e)=>{
      // alert(e)
setDeletedID(e)
      setDeleterModalOpen(true)


    } 
    
          const Delet=async ()=>{
            if(confirmationPassword != "Material") return alert("error")
  //  alert(deletedID)   
      await axios.post(process.env.REACT_APP_API_URL+'/delete',{id:deletedID},{withCredentials:true}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> deletedID != s._id)
const dataRe = [...data]
setSearcher(dataRe)
setDeletedID("")
    }
    const reset =()=>{
     
setDateNow(Date.now())
setUpdater(0) 

    }

    const importing =(id,items,store,type,quantity)=>{

      setItems(items);

      setStore(store);
setType(type);
      
setNewQuantity(quantity);
// setUpdater(id)      
handleOpen()
    }
 


    const exporting =(id,items,store,type,quantity)=>{

      setItems(items);

      setFrom(store);
setType(type);
      
setExportQuantity(quantity);
// setUpdater(id)     
setOpenExportingModal(true)
}










    const updating =(id,items,store,type,quantity)=>{
setQuantity(quantity)
      setItems(items);

      setStore(store);
setType(type);
      
// setQuantity(quantity);
setUpdater(id)      

    }
    const updateOne=async (e)=>{
      console.log("updateOne",e)
      await axios.post(process.env.REACT_APP_API_URL+'/updatedata',{id:e,store:store,items:items,type:type,quantity:Quantity},{withCredentials:true}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )

    }
    const additem = ()=>{


      
    }


    const [openNEWItemModal,setOpenNEWItemModal]=useState(false) 
const [newAddedItems,setNewAddedItem]=useState("");
const[newAddedStore,setNewAddedStore]=useState("");
const[newAddedType,setNewAddedType]=useState("");
const [newAddedQuantity,setNewAddedQuantity]=useState(0);
const [errorNEwItemModal,setErrorNewItemModal]= useState("")
const [successNEwItemModal,setSuccessNewItemModal]= useState()


const newDataDone = ()=>{

setNewAddedItem("")
setNewAddedStore("")
  setNewAddedType("");


  setNewAddedQuantity(0)
setErrorNewItemModal("")
setOpenNEWItemModal(false)
}
function opennewitemmodal (){
  setOpenNEWItemModal(true)}
    
const PostHandlerNewItem = async (e)=>{
  e.preventDefault()
  
await axios.post(process.env.REACT_APP_API_URL+"/postnewdatatostore",{items:newAddedItems,sayedCode:sayedCode,code:code,store:newAddedStore,type:newAddedType,quantity:newAddedQuantity},{withCredentials:true}).
then(e=>e.data == "success" ? newDataDone() :setErrorNewItemModal("يرجى مراعاة ادخال البيانات الصحيحة"))

}
String.prototype.ArtoEn= function() {
      return this.replace(/[\u0660-\u0669]/g, 
        d => d.charCodeAt() - 1632)
    }
  const[receiptNo,setReceiptNO]=useState("");
  const [newQuantity,setNewQuantity]=useState(0);
const[destination,setDestination]=useState("");
const [importDate,setImportDate]=useState("");
const[importedReceiptNo,setImportedReceiptNo]=useState("")
const [exportDate,setExportDate]=useState("");
    const postHandler =async (e)=>{
      e.preventDefault()
      const find = localStorage.getItem("token")
      const details = jwtDecode(find)
      console.log(from,type ,newQuantity,store ,items ,receiptNo)
      if (!from ||  !type || !newQuantity || !store ||!importDate  || !items || !receiptNo ) return setExistense("رجاء ملىء البيانات")
      await axios.post(process.env.REACT_APP_API_URL+"/transactionexport",
      {source:from,destination:store,unit:type,quantity:newQuantity,items,date:importDate,receiptno:receiptNo,user:details.username,refundLocation,refundContractor,importedReceiptNo},{withCredentials:true}).
      then(e=>{
          e.data == "error" ? ClearError() : Clear()})
      
      }
  
      const postExportHandler =async (e)=>{
        e.preventDefault();
        const find = localStorage.getItem("token");
        const details = jwtDecode(find);
        console.log(from,type,exportDate,lOcation,exportQuantity,items,receiptNo)
        if (  !type || !typeOfImporter || !exportDate|| !lOcation  ||!exportQuantity || !items|| !receiptNo ) return setExistense("رجاء ملىء البيانات")
        
        await axios.post(process.env.REACT_APP_API_URL+"/secondtransaction",{store:from,typeOfImporter:typeOfImporter,
            contractor:contractor,typeOfContracting:typeOfContracting,unit:type,date:exportDate,items:items,location:lOcation,quantity:exportQuantity,receiptno:receiptNo,user:details.username},{withCredentials:true}).then(e=>
               e.data == "error" ? ClearError():
                 Clear() 
                )
      
        }
    
const closeNEWitemmodall=        ()=>
          setOpenNEWItemModal(false)
          
    
    return (
  <div>{matches?  
    <><ListCompon data={data} items={items} quantity={Quantity} store={store} type={type} searchedData={searchedData}  setItems={setItems} delet={Delet} setStore={setStore}

setquantity={setQuantity} settype={setType} token={token} search={(e,s)=>Search(e,s)} updateOne={updateOne} updater={updater} updating={updating}

/></>
    :
    <div>
    <div>

    <Modal 
      
      open={DeleterModalOpen}
      onClose={()=>setDeleterModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
      > 
    
    <Box sx={styleDelete}>
    <TextField id="outlined-basic" label="كلمة سر تأكيد حذف المهام" variant="outlined" 
 value={confirmationPassword} onChange={(e)=>setConfirmationPassword(e.target.value)}/>
<Button variant="contained" color="error" onClick={Delet}>تأكيد الحذف</Button>

</Box>    
  </Modal>

    <Modal 
      
      open={openNEWItemModal}
      onClose={closeNEWitemmodall}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
      > 
    
    <Box sx={style}>

    {/* <Stack maxWidth="800px" minWidth="250px" style={{padding:"60px"}} gap="12px"> */}
    <Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setNewAddedStore(value)}
        //   onClickCapture={(e)=>setSpecificUnite(e.type)}
        options={stores.map((option) => option.name)}
        renderInput={(params) => <TextField {...params}  label="المخازن" placeholder="اختر المخزن"/>}
      />
<TextField id="outlined-basic" label="cairo code" variant="outlined" 
name="items" value={code} onChange={(e)=>setCode(e.target.value)}/>
<TextField id="outlined-basic" label="Our Code" variant="outlined" 
name="items" value={sayedCode} onChange={(e)=>setSayedCode(e.target.value)}/>

<TextField id="outlined-basic" label="المهام" variant="outlined" 
name="items" value={newAddedItems} onChange={(e)=>setNewAddedItem(e.target.value)}/>
<TextField id="outlined-basic" label="الوحدة" variant="outlined"
 name="type" value={newAddedType} onChange={(e)=> setNewAddedType(e.target.value)}/>
<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={newAddedQuantity} onChange={e=>setNewAddedQuantity(e.target.value)}/>
<div>

<Button style={{width:"70px"}} color="info" variant="contained" size="medium" onClick={PostHandlerNewItem}>تسجيل بيانات</Button>
</div>

{errorNEwItemModal ? <Alert severity="error">خطأ في ادخال البيانات</Alert>:null}

</Box>    
  </Modal>
























      <Modal 
      
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
      > 
      <Box sx={style}>

      { notExist ? <Alert severity="error" >
    {notExist}</Alert>:null}
    { done ?    <Alert severity="success">{done}</Alert>:null}


          <Typography id="modal-modal-title" variant="h6" component="h2">
            اضافة وارد 
          </Typography>

          <TextField label="رقم الاذن" value={receiptNo} onChange={e=>setReceiptNO(e.target.value)}/>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {items}
          </Typography>
          <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">المورد / المصنع</InputLabel>
<Select name="source"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={from}
label="المورد"
onChange={(e)=>setFrom(e.target.value)}>


{factories.map(e=> <MenuItem value={e.name} key={e._id}>{e.name}</MenuItem>)  }




</Select>
</FormControl>


<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">تشغيل / خصم</InputLabel>
<Select
name="exectype"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={executionType}
label="تشغيل / خصم"
onChange={(e)=>setExecutionType(e.target.value)}
>

<MenuItem value="تشغيل" >تشغيل</MenuItem>
<MenuItem value="خصم" >خصم</MenuItem>





</Select>
</FormControl>


<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">مقاول</InputLabel>
<Select
name="اسم المقاول"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={refundContractor}
label="مقاول"
onChange={(e)=>setRefundContractor(e.target.value)}
>

<MenuItem  value="">.......</MenuItem>
{contractorNames.map(e=>
<MenuItem  value={e.name}>{e.name}</MenuItem>)}



</Select>
</FormControl>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">الموقع</InputLabel>
<Select
name="refundlocation"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={refundLocation}
label="الموقع"
onChange={(e)=>setRefundLocation(e.target.value)}
>


{places.map(e=>
<MenuItem  value={e.name}>{e.name}</MenuItem>)}

</Select>
</FormControl>

















          <Typography id="modal-modal-title" variant="h6" component="h2">
  {store} 
          </Typography>



          <TextField label="التاريخ" value={importDate} type="date" onChange={e=>setImportDate(e.target.value)}/>



          <TextField label="الكمية" value={newQuantity} onChange={e=>setNewQuantity(e.target.value)}/>



          <TextField label="رقم اذن المنصرف" value={newQuantity} onChange={e=>setImportedReceiptNo(e.target.value)}/>

          <div>
          <Button style={{width:"70px"}} color="info" variant="contained" onClick={handleClose}> close</Button>

<Button style={{width:"70px"}} color="info" variant="contained" onClick={postHandler}> اضافة وارد</Button>
</div>


        </Box>
      </Modal>



      <Modal 
      
      open={openExportingModal}
      onClose={handleCloseExporting}
            aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
      > 
      <Box sx={style}>

      { notExist ? <Alert severity="error" >
    {notExist}</Alert>:null}
    { done ?    <Alert severity="success">{done}</Alert>:null}


          <Typography id="modal-modal-title" variant="h6" component="h2">
            اضافة منصرف 
          </Typography>

          <TextField label="رقم الاذن" value={receiptNo} onChange={e=>setReceiptNO(e.target.value)}/>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {items}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
  {store} 
          </Typography>






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

          <TextField label="التاريخ" value={exportDate} type="date" onChange={e=>setExportDate(e.target.value)}/>


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



<Typography alignItems="center"  justifyContent="center" >{type}</Typography>





<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={exportQuantity} onChange={e=>setExportQuantity(e.target.value)}/>













<div>
        <Button style={{width:"70px"}} color="info" variant="contained" onClick={handleCloseExporting}> Close</Button>

        <Button style={{width:"70px"}} color="info" variant="contained" onClick={postExportHandler}> اضافة منصرف</Button>

</div>




        </Box>


      </Modal>

<div style={{display:"flex",flexDirection:"column",marginTop:"3px",justifyContent:"space-between"}}>
             <FormControl >
<InputLabel id="demo-simple-select-label">بحث بالمخزن</InputLabel>
<Select
name="source"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={searchedStore}
label="المورد"
onChange={(e)=>filterStore(e)}
>


{stores.map(e=> <MenuItem value={e.name} key={e._id}>{e.name}</MenuItem>)  }




</Select>
</FormControl>

    <div>
    <TextField style={{"marginTop": "12px"}} label="بحث باسم الصنف"    value={searchValue} onChange={(e)=>Search(e)}/>
    {/* <TextField style={{"marginTop": "12px"}} label="بحث بكود الصنف"    value={searchValueByCode} onChange={(e)=>SearchByCode(e)}/> */}
</div>    
      
    <div style={{backgroundColor:"dodgerblue",padding:"9px",borderRadius:"5px",cursor:"pointer",color:"white",width:"100px" ,marginTop:"13px"}} onClick={opennewitemmodal}>  اضافة عنصر   </div>
    </div>
    </div>
    {/* {storeNames.map(e=><FormControlLabel
        label={e.name}
        control={
          <Checkbox 

            value={e.name}
            Checked ={falser}
            onChange={e=> e.target.checked ? setStoreQuery(e):""}
            color="primary"
          />
        }
      />)}      
       */}

  <Table striped="columns">

      <thead>
        <tr >
        <th >كود القاهرة</th>
        <th >كود المنيا</th>

        <th>المخزن</th>
          <th>المهام</th>
          <th>الوحدة</th>
          <th>كمية</th>
          <th>تحديث</th>
          <th>اضافة وارد</th>
          <th>اضافة منصرف</th>
          <th>نسخ الصنف</th>

          <th>حذف</th>
          {/* <th>طباعة</th> */}
        </tr>
      </thead>
      {/* {data.} */}
      {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
      <tbody key={e._id}>
        <tr>

          <td>{updater  == e._id?<TextField id="outlined-basic" label="كود القاهرة" variant="outlined"
type="text" name="code" value={code} onChange={(e)=>setCode(e.target.value)}/> :e.code}</td>
          <td>{updater  == e._id?<TextField id="outlined-basic" label="كود المنيا" variant="outlined"
type="text" name="sayedCode" value={sayedCode} onChange={(e)=>setSayedCode(e.target.value)}/> :e.sayedCode}</td>
         
          <td >{updater  == e._id?<TextField id="outlined-basic" style={{width:"200px"}} label="المخزن" variant="outlined"
type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/> :e.store}</td>
          <td >{updater ==e._id? <TextField style={{width:"200px"}} id="outlined-basic" fullWidth label="المهام" variant="outlined" 
name="items" value={items} onChange={(e)=>setItems(e.target.value)}/>:<Link to={"/"+ e.items+"/"+ e.store}>{e.items}</Link>}</td>
          <td > {updater ==e._id?<TextField id="outlined-basic" style={{width:"80px"}} label="الوحدة" variant="outlined"
name="type" value={type} onChange={(e)=> setType(e.target.value)}/> :e.type}</td>
          <td >{updater==e._id?<TextField id="outlined-basic"  style={{width:"70px"}} label="الكمية" variant="outlined" 
name="quantity" value={Quantity} onChange={e=>setQuantity(e.target.value)}/>:e.quantity}</td>
          <td >{updater == e._id ? <Button variant="contained"  style={{width:"70px"}} onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.items,e.store,e.type,e.quantity)}>UPDATE</Button>}</td>

          <td ><Button  color="warning" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>importing(e._id,e.items,e.store,e.type)}>اضافة وارد</Button></td>


          <td ><Button  color="secondary" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>exporting(e._id,e.items,e.store,e.type)}>اضافة منصرف</Button></td>


          <td ><Button  color="info" variant="contained" disabled={token.isAdmin?false:true} >نسخ</Button></td>


          <td><Button color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>DeleteModal(e._id)}>Delete</Button></td>
          {/* <td style={{width:"70px"}}><Button style={{width:"70px"}} color="info" variant="contained" disabled={token.isAdmin?false:true} onClick={ ()=> printJS({printable:[{المخزن : e.store,المهام:e.items,الوحدة:e.type,الكمية:e.quantity}],properties:["المخزن","المهام","الوحدة","الكمية"],type:'json'}) }>Print </Button></td> */}
          </tr>      
           

</tbody>)}
      
              </Table>
<div>
  
  
<Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>
</div>
<div style={{width:"200px",margin:"100px"}}><Button style={{width:"170px"}} color="info" variant="contained"  onClick={ ()=> printJS({printable:searchedData,
 gridHeaderStyle: 'color: black;  border: 2px solid #3971A5;',
 gridStyle: 'border: 2px solid #3971A5;'
,properties:["store","items","type","quantity"],type:'json'}) }>طباعة كامل الجرد</Button></div>
{/* <Transaction data={data}/> */}

<span style={{color:"black"}}>  IT team work on releasing IOS and Android Applications,stay Tuned </span>

</div>



    
    }</div>
  

)








}

export default DataPreview;
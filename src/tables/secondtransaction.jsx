import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"
// import Paginat from "./pagination";
import {FormControl,InputLabel,Select,MenuItem, TextField , Button, Stack, Autocomplete,useMediaQuery, Typography, Modal, Box } from "@mui/material";

import socketClient  from "socket.io-client";
import * as XLSX from "xlsx"

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";
import jwtDecode from "jwt-decode";

function SecondTransactionadding(){
  
const [data,setData]=useState([]);
const [searchEngineModal,setSearchEngineModal]=useState(false);
const [startpage,setPage] = useState(1)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const [deletedColumn,setDeleter]= useState(false)

const [updater,setUpdater]=useState("");
const[store,setStore]=useState("");
const [receiptno,setReceiptno]=useState("")
const [typeOfImporter,setTypeOfImporter]=useState("")
const[contractor,setContractor]=useState("")
const [typeOfContracting,setTypeOfContracting]=useState("")
const [quantity,setQuantity]=useState("");
const[items,setItems]=useState("");
const [unit,setUnit]=useState("");
const [date,setDate]=useState("");
const [location,setLocation]=useState("");
const handleClose = () => setStatePreview(false);
const [user,setUser]=useState("");
const [error,setError]=useState("")
const[token,setToken]=useState({})
const ref = useRef(0);
const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("")
  const [ statePreviewImage,setStatePreview]=useState(false)
  
  
  const styleModal = {
    display:"flex",
    gap:"12px",
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
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    height:"500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const navigate = useNavigate()
const[uniqueitems,setUniqueITems]=useState([])
const [stores,setStores]=useState([])

const [contractors,setContractors]=useState([])
async function dataGetter(){
  
  await axios.get(process.env.REACT_APP_API_URL+"/listofstores",{withCredentials:true}).then((e) => 
  
   setStores(e.data)
   )


   
  await axios.get(process.env.REACT_APP_API_URL+"/listofnames",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
  setContractors(_.reverse(e.data))).catch(error=>console.log(error))
  
}


useEffect(()=>{
  
if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
dataGetter()
  axios.get(process.env.REACT_APP_API_URL+'/uniqueitems',{withCredentials:true}).then((e) => setUniqueITems(e.data)  )
  
    axios.get(process.env.REACT_APP_API_URL+'/getsecondtransactions',{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(_.reverse(e.data)) & setData(e.data) )
}    
else if (!localStorage.getITem("token")){
  navigate("/login")
  

}},[])
const [searchedExecutionType,setSearchedExecutionType]=useState("");
const[searchedTypeOfImporter,setSearchedOfTypeOfImporter]=useState("");
const [searchedItem,setSearchedItem]=useState("");
const [searchedContractor,setSearchedContractor]=useState("");
const [searchedStore,setSearchedStore]=useState("");

const searchHandler = async()=>{

await axios.post(process.env.REACT_APP_API_URL+'/searchsecondtransaction',{searchedStore,searchedTypeOfImporter,searchedItem,searchedContractor},{withCredentials:true}).then((e) => setSearcher(_.reverse(e.data))  )
  


}
const handleExportToExcel = () => {
  // Convert JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(searchedData);

  // Create a workbook with the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Write the workbook to a binary Excel file and trigger a download
  XLSX.writeFile(wb, 'data.xlsx');
};


// console.log(ref.current);
    const handleChange = (event, value) => {
      setPage(value);
    };

    const Search = (s)=>{
      s.preventDefault();
      
      const mapper = data.filter(e=>e.items.includes(`${s.target.value}`))
      
      setSearcher(mapper)
      setPage(1)
      
          }
    const SearchByReceipt = (s)=>{
            s.preventDefault();
            
            const mapper = data.filter(e=>e.receiptno.includes(s.target.value))
            
            setSearcher(mapper)
            setPage(1)
            
                }

                const [contractorsearcher,setcontractorsearcher]=useState("")
    const searchByContractor = (s)=>{
                  s.preventDefault();
                  setcontractorsearcher(s.target.value)
                  const mapper = data.filter(e=>e.contractor.includes(contractorsearcher))
                
                  setSearcher(mapper)
                  setPage(1)
                  
                      }

const Delet = async (e)=>{
  
  await axios.post(process.env.REACT_APP_API_URL+'/deletesecondtransaction',{id:e},{withCredentials:true}).then((e) => console.log(e.data))
  const data = searchedData.filter((s)=> e != s._id)
  const dataRe = [...data]
  setSearcher(dataRe)
  
    }

    
    const updating =(id,store,receiptno,typeOfImporter,contractor,typeOfContracting,
      quantity,items,unit,date,location,user)=>{

      setUpdater(id);
setStore(store);
setReceiptno(receiptno);
setTypeOfImporter(typeOfImporter);
setContractor(contractor);
setTypeOfContracting(typeOfContracting);
setQuantity(quantity);
setItems(items);
setUnit(unit);
setDate(date);
setLocation(location);
setUser(user);
      
      }
      
      const reset=()=>{
setUpdater(0)

      }
      const updateOne=async (e)=>{
        
        await axios.post(process.env.REACT_APP_API_URL+'/updatesecondtransaction',
        {id:e,store:store,
          receiptno:receiptno,
          typeOfImporter:typeOfImporter,
          contractor:contractor,
          typeOfContracting:typeOfContracting,
          
          quantity:quantity,
          items:items,
          unit:unit,
          date:date,
          location:location,
          user:user},{withCredentials:true}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )
  
      }
  
      return (
  
  <div>
<Modal open={searchEngineModal} 
      onClose={()=>setSearchEngineModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"



>
<Box sx={styleModal}>
<div>
  Search Engine
</div>
<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setSearchedItem(value)}
        
        options={uniqueitems.map((option) => option)}
        renderInput={(params) => <TextField {...params}  label="المهام" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />
      <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">تشغيل / خصم</InputLabel>
<Select
name="exectype"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={searchedExecutionType}
label="تشغيل / خصم"
onChange={(e)=>setSearchedExecutionType(e.target.value)}
>

<MenuItem value="تشغيل" >تشغيل</MenuItem>
<MenuItem value="خصم" >خصم</MenuItem>





</Select>
</FormControl>





<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">ذاتي / مقاول</InputLabel>
<Select
name="exectype"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={searchedTypeOfImporter}
label="ذاتي / مقاول"
onChange={(e)=>setSearchedOfTypeOfImporter(e.target.value)}
>

<MenuItem value="تنفيذ ذاتي" >تنفيذ ذاتي</MenuItem>
<MenuItem value="تنفيذ مقاول" >تنفيذ مقاول</MenuItem>





</Select>
</FormControl>





<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setSearchedStore(value)}
        value={searchedStore}  
        options={stores.map((option) => option.name)}
        renderInput={(params) => <TextField {...params}  label="المخازن" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />

<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setSearchedContractor(value)}
       value={searchedContractor}   
        options={contractors.map((option) => option.name)}
        renderInput={(params) => <TextField {...params}  label="المخازن" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />



<Button onClick={searchHandler} variant="contained" color="info">search</Button>

<Button onClick={()=>setSearchEngineModal(false)} variant="contained" color="error">cancel</Button>


</Box>

</Modal>

        <Stack>
        <TextField style={{"marginTop": "12px"}} label="بحث برقم الاذن " onChange={(e)=>SearchByReceipt(e)}/>
        {/* <TextField style={{"marginTop": "12px"}} label="بحث باسم المقاول " onChange={searchByContractor}/> */}
        <div>
        <Button onClick={handleExportToExcel} variant="contained" color="info">Excel File</Button>  

        <Button onClick={()=>setSearchEngineModal(true)} variant="contained" color="warning">search engine</Button>  

</div>

        </Stack>
      <Table striped="columns"  >
          <thead>
            <tr>
            
<th>رقم الاذن</th>
              <th>مصدر</th>
              <th>النوع</th>
              <th>المقاول</th>
              <th>خصم / تشغيل</th>
              <th>المهام</th>
              <th>كمية</th>
              <th>الوحدة</th>
              <th>صورة الاذن</th>
              <th>موقع العملية</th>
              
              <th>بواسطة</th>
              <th>تاريخ</th>
              <th>حذف</th>
              <th>تحديث</th>
            </tr>
          </thead>
          
          {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
          
          <tbody key={e._id}>
            <tr>

              
             <th>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="رقم الاذن" variant="outlined"
type="number" name="receiptno" value={receiptno} onChange={(e)=>setReceiptno(e.target.value)}/>: e.receiptno}</th>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="مخزن" variant="outlined"
type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/>:e.store}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="ذاتي / مقاول" variant="outlined"
type="text" name="typeofimporter" value={typeOfImporter} onChange={(e)=>setTypeOfImporter(e.target.value)}/>:e.typeOfImporter}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="مقاول" variant="outlined"
type="text" name="contractor" value={contractor} onChange={(e)=>setContractor(e.target.value)}/>:e.contractor}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="ذاتي / خصم" variant="outlined"
type="text" name="typeofcontracting" value={typeOfContracting} onChange={(e)=>setTypeOfContracting(e.target.value)}/>:e.typeOfContracting}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="المهام" variant="outlined"
type="text" name="items" value={items} onChange={(e)=>setItems(e.target.value)}/>:e.items}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="الكمية" variant="outlined"
type="text" name="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>:e.quantity}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="الوحدة" variant="outlined"
type="text" name="unit" value={unit} onChange={(e)=>setUnit(e.target.value)}/>:e.unit}</td>
  <td>{e.file?<Typography onClick={()=>{setStatePreview(true)
  setCloudinaryImage(e.file)}
  } style={{color:"green"}}>    صورة الاذن من هنا </Typography>:<Typography>غير متاح صور اذون</Typography>  }</td>             
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="الموقع" variant="outlined"
type="text" name="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>:e.location}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="المستخدم" variant="outlined"
type="text" name="user" value={user} onChange={(e)=>setUser(e.target.value)}/>:e.user}</td>

              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="التاريخ" variant="outlined"
type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>:e.date}</td>
              <td><Button color="error" variant="contained" onClick={()=>Delet(e._id)}>Delete</Button></td>
              <td style={{width:"70px"}}>{updater === e._id ? <Button variant="contained"  style={{width:"70px"}} 
              onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.store,e.receiptno,e.typeOfImporter,e.contractor,e.typeOfContracting,
                e.quantity,e.items,e.unit,e.date,e.location,e.user)}>UPDATE</Button>}</td>
            </tr>
          
          </tbody>)}


        </Table>
  

    <div>
    <Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>
    </div>

</div>




)






              }
            
export default SecondTransactionadding;

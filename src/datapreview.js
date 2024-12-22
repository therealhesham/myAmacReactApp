import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _, { update } from "lodash"
import Paginat from "./pagination";
import { TextField,Typography ,Box, Button,InputLabel, MenuItem,Alert, Stack, useMediaQuery, Select,ButtonBase, FormControl,FormLabel, FormHelperText, FormControlLabel, Checkbox ,Modal} from "@mui/material";
import Transaction from "./addtransaction";
import socketClient  from "socket.io-client";
import App from "./App";
import { Link, Navigate, useMatch, useNavigate } from "react-router-dom";
import ComboBox from "./search";
import jwtDecode from "jwt-decode";
import printJS from "print-js";
import ListCompon from "./listComponent";
import e from "cors";

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
const [zero,setZero]= useState(0)
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
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





}


const matches = useMediaQuery('(max-width:400px)');
async function dataGetter(){

 await axios.get("https://amaccompany.onrender.com/listofstores",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
  setStoreNames(e.data))
  await axios.get("https://amaccompany.onrender.com/listoffactories",{withCredentials:true}).then((e) => 
    setFactories(e.data)
    )
  
  await axios.get("https://amaccompany.onrender.com/preview",{withCredentials:true}).then((e) => 
    
  e.data == "not authenticated" ?navigate("/login") :setSearcher(e.data) & setData(e.data) 
  )

}
useEffect(()=>{
  
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
    ,[])
    // console.log(ref.current);
    const handleChange = (event, value) => {
      setPage(value);
    };
const [searchValue,setSearchValue]=useState("")
const [searchValueByCode,setSearchValueByCode]=useState("")

const Search = (s)=>{
s.preventDefault();
setSearchValue(s.target.value.ArtoEn())
// console.log(`${s.target.value}`.trim());
const mapper = data.filter(e=>e.items.includes(s.target.value.ArtoEn()))

setSearcher(mapper)
setPage(1)
// .includes("سلاقوس")

// data.filter((e)=>e.includes("مواسير"))
// console.log(newData);

    }
 
    const SearchByCode = (s)=>{
      s.preventDefault();
      setSearchValueByCode(s.target.value.ArtoEn())
      // console.log(`${s.target.value}`.trim());
      const mapper = data.filter(e=>e.code.includes(s.target.value.ArtoEn()))
      
      setSearcher(mapper)
      setPage(1)
      // .includes("سلاقوس")
      
      // data.filter((e)=>e.includes("مواسير"))
      // console.log(newData);
      
          }

          const style = {
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
    const Delet=async (e)=>{
      await axios.post('https://amaccompany.onrender.com/delete',{id:e},{withCredentials:true}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }
    const reset =()=>{
     

setUpdater(0) 

    }

    const importing =(id,items,store,type,quantity)=>{

      setItems(items);

      setStore(store);
setType(type);
      
setQuantity(quantity);
// setUpdater(id)      
handleOpen()
    }
 

    const updating =(id,items,store,type,quantity)=>{

      setItems(items);

      setStore(store);
setType(type);
      
// setQuantity(quantity);
setUpdater(id)      

    }
    const updateOne=async (e)=>{
      console.log("updateOne",e)
      await axios.post('https://amaccompany.onrender.com/updatedata',{id:e,store:store,items:items,type:type,quantity:Quantity},{withCredentials:true}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )

    }
String.prototype.ArtoEn= function() {
      return this.replace(/[\u0660-\u0669]/g, 
        d => d.charCodeAt() - 1632)
    }
  const[receiptNo,setReceiptNO]=useState("");
  const [newQuantity,setNewQuantity]=useState(0);
const[destination,setDestination]=useState("");
    const postHandler =async (e)=>{
      e.preventDefault()
      const find = localStorage.getItem("token")
      const details = jwtDecode(find)
      
      if (!from ||  !type || !newQuantity || !destination || !items || !receiptNo ) return setExistense("رجاء ملىء البيانات")
      await axios.post("https://amaccompany.onrender.com/transactionexport",
      {source:from,destination:destination,unit:type,quantity:newQuantity,items,receiptno:receiptNo,user:details.username,date:""},{withCredentials:true}).
      then(e=>{
          e.data == "error" ? ClearError() : Clear()})
      
      }
  
    
      
    
    return (
  <div>{matches?  
    <><ListCompon data={data} items={items} quantity={Quantity} store={store} type={type} searchedData={searchedData}  setItems={setItems} delet={Delet} setStore={setStore}

setquantity={setQuantity} settype={setType} token={token} search={(e,s)=>Search(e,s)} updateOne={updateOne} updater={updater} updating={updating}

/></>
    :
    <div>
    <div>
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
<Select
name="source"
labelId="demo-simple-select-label"
id="demo-simple-select"
value={from}
label="المورد"
onChange={(e)=>setFrom(e.target.value)}
>


{factories.map(e=> <MenuItem value={e.name} key={e._id}>{e.name}</MenuItem>)  }




</Select>
</FormControl>


          <Typography id="modal-modal-title" variant="h6" component="h2">
  {store} 
          </Typography>




          <TextField label="الكمية" value={newQuantity} onChange={e=>setNewQuantity(e.target.value)}/>

<Button style={{width:"70px"}} color="info" variant="contained" onClick={postHandler}> اضافة وارد</Button>

        </Box>


      </Modal>


    <TextField style={{"marginTop": "12px"}} label="بحث باسم الصنف"    value={searchValue} onChange={(e)=>Search(e)}/>
    <TextField style={{"marginTop": "12px"}} label="بحث بكود الصنف"    value={searchValueByCode} onChange={(e)=>SearchByCode(e)}/>
    
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
        <th style={{width:"50px"}}>كود الصنف</th>
        <th>المخزن</th>
          <th>المهام</th>
          <th>الوحدة</th>
          <th>كمية</th>
          <th>تحديث</th>
          <th>حذف</th>
          <th>طباعة</th>
        </tr>
      </thead>
      {/* {data.} */}
      {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
      <tbody key={e._id}>
        <tr>

          <td>{e.code}</td>
         
          <td style={{width:"200px"}}>{updater  == e._id?<TextField id="outlined-basic" style={{width:"200px"}} label="المخزن" variant="outlined"
type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/> :e.store}</td>
          <td style={{width:"200px"}} >{updater ==e._id? <TextField style={{width:"200px"}} id="outlined-basic" fullWidth label="المهام" variant="outlined" 
name="items" value={items} onChange={(e)=>setItems(e.target.value)}/>:<Link to={"/"+ e.items+"/"+ e.store}>{e.items}</Link>}</td>
          <td style={{width:"80px"}}> {updater ==e._id?<TextField id="outlined-basic" style={{width:"80px"}} label="الوحدة" variant="outlined"
name="type" value={type} onChange={(e)=> setType(e.target.value)}/> :e.type}</td>
          <td style={{width:"70px"}}>{updater==e._id?<TextField id="outlined-basic"  style={{width:"70px"}} label="الكمية" variant="outlined" 
name="quantity" value={Quantity} onChange={e=>setQuantity(e.target.value)}/>:e.quantity}</td>
          <td style={{width:"70px"}}>{updater == e._id ? <Button variant="contained"  style={{width:"70px"}} onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.items,e.store,e.type,e.quantity)}>UPDATE</Button>}</td>

          <td style={{width:"70px"}}><Button style={{width:"70px"}} color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>importing(e._id,e.items,e.store,e.type)}>توريد</Button></td>

          <td style={{width:"70px"}}><Button style={{width:"70px"}} color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>Delet(e._id)}>Delete</Button></td>
          <td style={{width:"70px"}}><Button style={{width:"70px"}} color="info" variant="contained" disabled={token.isAdmin?false:true} onClick={ ()=> printJS({printable:[{المخزن : e.store,المهام:e.items,الوحدة:e.type,الكمية:e.quantity}],properties:["المخزن","المهام","الوحدة","الكمية"],type:'json'}) }>Print </Button></td>
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
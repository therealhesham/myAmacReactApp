import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"

// import Paginat from "./pagination";
import { TextField , Button, Typography } from "@mui/material";

import socketClient  from "socket.io-client";

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";
import jwtDecode from "jwt-decode";


function ImportedData(){
const [data,setData]=useState([]);
const [startpage,setPage] = useState(1)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const ref = useRef(0);
const navigate = useNavigate()
const [updater,setUpdater]= useState("")
const [error,setError]=useState("")
const [receiptno,setReceiptno]=useState("")
const [source,setSource]=useState("")
const [destination,setDestination]=useState("")
const[quantity,setQuantity]=useState("")
const[items,setItems]=useState("")
const[unit,setUnit]=useState("")
const [user,setUser]=useState("")
const [date,setDate]=useState("")
const[token,setToken]=useState({})
useEffect(()=>{
  
if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
  axios.get('https://amaccompany.onrender.com/firsttansactionlist',{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(e.data) & setData(e.data) )
  }
  else if (!localStorage.getItem("token")){
navigate("/login")


  }

    // console.log(ref.current);
  
    
}


    ,[])
    // console.log(ref.current);

    const reset =()=>{
     

      setUpdater(0) 
      
          }
    const handleChange = (event, value) => {
      setPage(value);
    };
// d
const SearchByReceipt = (s)=>{
  s.preventDefault();
  
  const mapper = data.filter(e=>e.receiptno.includes(s.target.value))
  
  setSearcher(mapper)
  setPage(1)
  // .includes("سلاقوس")
  
  // data.filter((e)=>e.includes("مواسير"))
  // console.log(newData);
  
      }



const Search = (s)=>{
s.preventDefault();
console.log(`${s.target.value}`.trim());
const mapper = data.filter(e=>e.items.includes(`${s.target.value}`))

setSearcher(mapper)
setPage(1)
// .includes("سلاقوس")

// data.filter((e)=>e.includes("مواسير"))
// console.log(newData);

    }

    const Delet=(e)=>{
      axios.post('https://amaccompany.onrender.com/deletfirsttransaction',{id:e},{withCredentials:true}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }

    const updating =(id,receiptno,source,destination,quantity,items,unit,user,date)=>{
    setUpdater(id);
    setReceiptno(receiptno);
    setSource(source);
    setDestination(destination);
    setQuantity(quantity);
setItems(items);
setUnit(unit);
setUser(user);
setDate(date)
    
    
    
    }
    const updateOne=async (e)=>{
      console.log("updateOne",e)
      await axios.post('https://amaccompany.onrender.com/updatefirsttransaction',
      {id:e,receiptno:receiptno,
        source:source,
        destination:destination,
    quantity:quantity,
    items:items,
    unit:unit,
    user:user,
    date:date},{withCredentials:true}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )

    }

    return (
  
  <div>
        {/* <App/> */}
        <TextField style={{"marginTop": "12px"}} label="بحث بالمهام " onChange={Search}/>
        <TextField style={{"marginTop": "12px"}} label="بحث برقم الاذن" onChange={SearchByReceipt}/>
      <Table striped="columns"  style={{width:"900px"}} >
          <thead>
            <tr>
              <th>رقم الاذن</th>
              <th>مصدر</th>
              <th>الى مخزن</th>
              <th>مهام</th>
              <th>كمية</th>
              <th>الوحدة</th>
              <th>صورة الاذن</th>
              <th>بواسطة</th>
              <th>تاريخ</th>
              <th>حذف</th>
              <th>تحديث</th>
            </tr>
          </thead>
          {console.log(size)}
          {/* {data.} */}
          {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
          
          <tbody key={e._id}>
            <tr>


              <td>{  updater === e._id  ? <TextField  id="outlined-basic" style={{width:"200px"}} label="رقم الاذن" variant="outlined"
type="number" name="store" value={receiptno}  onChange={(e)=>setReceiptno(e.target.value)}/> : e.receiptno}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="مصدر الوارد" variant="outlined"
type="text" name="store" value={source} onChange={(e)=>setSource(e.target.value)}/> :e.source}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="المخزن" variant="outlined"
type="text" name="store" value={destination} onChange={(e)=>setDestination(e.target.value)}/> :e.destination}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="المهام" variant="outlined"
type="text" name="store" value={items} onChange={(e)=>setItems(e.target.value)}/> :e.items}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="الكمية" variant="outlined"
type="number" name="store" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/> :e.quantity}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="الوحدة" variant="outlined"
type="text" name="store" value={unit} onChange={(e)=>setUnit(e.target.value)}/> :e.unit}</td>
                  <td>{e.file?<Typography onClick={()=>{setStatePreview(true) 
                              setCloudinaryImage(e.file)}} style={{color:"green"}}>   صورة الاذن من هنا </Typography>:<Typography>غير متاح صور اذون</Typography>  }</td>            
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="المستخدم" variant="outlined"
type="text" name="store" value={user} onChange={(e)=>setUser(e.target.value)}/> :e.user}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"200px"}} label="التاريخ" variant="outlined"
type="date" name="store" value={date} onChange={(e)=>setDate(e.target.value)}/> :e.date}</td>
              <td><Button color="error" variant="contained" onClick={()=>Delet(e._id)}>Delete</Button></td>
              <td style={{width:"70px"}}>{updater === e._id ? <Button variant="contained"  style={{width:"70px"}} 
              onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.receiptno,e.source,e.destination,e.quantity,e.items,e.unit,e.user,e.date)}>UPDATE</Button>}</td>
            </tr>
          
          </tbody>)}


        </Table>
        {statePreviewImage?<div ><img style={{height:"300px",width:"600",zIndex:1,position:"absolute",top:1}} src={cloudinaryImage} onClick={()=>setStatePreview(false)}/></div>:""}
    <div>
    <Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>
    </div>
  
{/* <Transaction data={data}/> */}
</div>




)








}

export default ImportedData;
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _, { update } from "lodash"
import Paginat from "./pagination";
import { TextField , Button, Alert, Stack } from "@mui/material";
import Transaction from "./addtransaction";
import socketClient  from "socket.io-client";
import App from "./App";
import { Navigate, useNavigate } from "react-router-dom";
import ComboBox from "./search";
import jwtDecode from "jwt-decode";

function DataPreview(){
const [data,setData]=useState([]);
const [updater,setUpdater]= useState("")
const [startpage,setPage] = useState(0)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const [token,setToken]=useState()
const ref = useRef(0);
const [authenticator,setAuthenticator]=useState("");
const [admin,isAdmin]=useState(true)
const [items,setItems] = useState("")
const [store,setStore]=useState("مخزن بني مزار الرئيسي")
const [type,setType]=useState("")
const [Quantity,setQuantity]=useState("")
const [error,setError]= useState("")
// const [id,setID]= useState("")
const [success,setSuccess]= useState()
console.log(updater)
const navigate = useNavigate()
const [zero,setZero]= useState(0)
useEffect(()=>{
  console.log(ref.current);
  if(ref.current == zero){ 
    
    axios.get("https://amaccompany.onrender.com/preview",{withCredentials:true}).then((e) => 
    // console.log(e)
     e.data == "not authenticated" ?navigate("/login") :setSearcher(_.reverse(e.data)) & setData(_.reverse(e.data)) 
     )
//     console.log(data )

if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
  
  }
    setZero(zero + 1)

}
else  {
// ref.current = 1
}
}
    ,[data,searchedData])
    // console.log(ref.current);
    const handleChange = (event, value) => {
      setPage(value);
    };

    const Search = (s)=>{
s.preventDefault();

// console.log(`${s.target.value}`.trim());
const mapper = data.filter(e=>e.items.includes(s.target.value))
console.log(mapper)
setSearcher(mapper)
setPage(1)
// .includes("سلاقوس")

// data.filter((e)=>e.includes("مواسير"))
// console.log(newData);

    }

    const Delet=(e)=>{
      axios.post('https://amaccompany.onrender.com/delete',{id:e},{withCredentials:true}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }
    const reset =()=>{
     
      setZero(ref.current)
      setZero(ref.current-1)
console.log(ref.current)
setUpdater(0) 

    }
    const updating =(id,items,store,type,quantity)=>{

      setItems(items);

      setStore(store);
setType(type);
      
setQuantity(quantity);
setUpdater(id)      

    }
    const updateOne=(e)=>{
      console.log("updateOne",e)
      axios.post('https://amaccompany.onrender.com/updatedata',{id:e,store:store,items:items,type:type,quantity:Quantity},{withCredentials:true}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )
// const data = searchedData.filter((s)=> e != s._id)
// const dataRe = [...data]
// setSearcher(dataRe)
// ref.current = 
    }

      return (
  <div>{token?  
    <div>
    {/* <App/> */}
    {/* <ComboBox data={[...searchedData]}/> */}
    <TextField style={{"marginTop": "12px"}} label="Search" onChange={(e)=>Search(e)}/>
  <Table striped="columns">
      <thead>
        <tr>
        <th>id</th><th>store</th>
          <th>items</th>
          <th>type</th>
          <th>quantity</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      {/* {data.} */}
      {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
      <tbody key={e._id}>
        <tr>

          <td>{data.indexOf(e)}</td>
         
          <td style={{width:"200px"}}>{updater  == e._id?<TextField id="outlined-basic" style={{width:"200px"}} label="المخزن" variant="outlined"
type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/> :e.store}</td>
          <td style={{width:"200px"}} >{updater ==e._id? <TextField style={{width:"200px"}} id="outlined-basic" fullWidth label="المهام" variant="outlined" 
name="items" value={items} onChange={(e)=>setItems(e.target.value)}/>:e.items}</td>
          <td style={{width:"80px"}}> {updater ==e._id?<TextField id="outlined-basic" style={{width:"80px"}} label="الوحدة" variant="outlined"
name="type" value={type} onChange={(e)=> setType(e.target.value)}/> :e.type}</td>
          <td style={{width:"70px"}}>{updater==e._id?<TextField id="outlined-basic"  style={{width:"70px"}} label="الكمية" variant="outlined" 
name="quantity" value={Quantity} onChange={e=>setQuantity(e.target.value)}/>:e.quantity}</td>
          <td style={{width:"70px"}}>{updater == e._id ? <Button variant="contained"  style={{width:"70px"}} onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.items,e.store,e.type,e.quantity)}>UPDATE</Button>}</td>
          <td><Button color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>Delet(e._id)}>Delete</Button></td>
          </tr>      
           

</tbody>)}
      
              </Table>
<div>
<Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>
</div>

{/* <Transaction data={data}/> */}
</div>



    
    :""}</div>
  

)








}

export default DataPreview;
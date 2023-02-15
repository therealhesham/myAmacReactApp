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
const [success,setSuccess]= useState()
console.log(updater)
const navigate = useNavigate()
useEffect(()=>{
  
  if(ref.current == 0){ 
    console.log(ref.current);
    axios.get("https://amaccompany.onrender.com/preview",{withCredentials:true}).then((e) => 
    // console.log(e)
     e.data == "not authenticated" ?navigate("/login") :setSearcher(_.reverse(e.data)) & setData(e.data) 
     )
//     console.log(data )

if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
  
  }
    ref.current=ref.current +1

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

    const updateOne=(e)=>{
      console.log("updateOne",e)
      axios.post('https://amaccompany.onrender.com/updatedata',{id:e,store:store,items:items,type:type,quantity:Quantity},{withCredentials:true}).then((e) => console.log(e.data))
// const data = searchedData.filter((s)=> e != s._id)
// const dataRe = [...data]
// setSearcher(dataRe)
    }

      return (
  
  <div>
        {/* <App/> */}
        {/* <ComboBox data={[...searchedData]}/> */}
        <TextField style={{"marginTop": "12px"}} label="Search" onChange={(e)=>Search(e)}/>
      <Table striped="columns">
          <thead>
            <tr>
              <th>store</th>
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

              
             
              <td>{e.store}</td>
              <td>{e.items}</td>
              <td>{e.type}</td>
              <td>{e.quantity}</td>
              <td><Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>setUpdater(e._id)}>UPDATE</Button></td>
              <td><Button color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>Delet(e._id)}>Delete</Button></td>
              </tr>      
                    <br></br>
          {updater == e._id ? 
          <div><form  >
    
<Stack  direction="row">
<TextField id="outlined-basic" label="المخزن" variant="outlined"
 type="text" name="store" value={e.store} onChange={(e)=>setStore(e.target.value)}/>
<TextField id="outlined-basic" label="المهام" variant="outlined" 
name="items" value={e.items} onChange={(e)=>setItems(e.target.value)}/>
<TextField id="outlined-basic" label="الوحدة" variant="outlined"
 name="type" value={e.type} onChange={(e)=> setType(e.target.value)}/>
<TextField id="outlined-basic" label="الكمية" variant="outlined" 
name="quantity" value={e.quantity} onChange={e=>setQuantity(e.target.value)}/>
<Button variant="contained" size="medium" onClick={()=>updateOne(e._id)}>تسجيل بيانات</Button>
</Stack>
{error ? <Alert severity="error">خطأ في ادخال البيانات</Alert>:null}
{success ? <Alert severity="success">تم تحديث البيانات بنجاح</Alert>:null}


</form>
</div>
:null}

</tbody>)}
          
                  </Table>
    <div>
    <Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>
    </div>
  
{/* <Transaction data={data}/> */}
</div>




)








}

export default DataPreview;
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"

// import Paginat from "./pagination";
import { TextField , Button, Stack, useMediaQuery } from "@mui/material";

import socketClient  from "socket.io-client";

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";
import jwtDecode from "jwt-decode";

function SecondTransactionadding(){
const [data,setData]=useState([]);
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
const [user,setUser]=useState("");
const [error,setError]=useState("")
const[token,setToken]=useState({})
const ref = useRef(0);


const navigate = useNavigate()
useEffect(()=>{
  
if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
    axios.get('https://amaccompany.onrender.com/getsecondtransactions',{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(_.reverse(e.data)) & setData(_.reverse(e.data)) )
}    
else if (!localStorage.getITem("token")){
  navigate("/login")
  

}
}

    ,[])
    // console.log(ref.current);
    const handleChange = (event, value) => {
      setPage(value);
    };

    const Search = (s)=>{
      s.preventDefault();
      
      const mapper = data.filter(e=>e.items.includes(`${s.target.value}`))
      
      setSearcher(mapper)
      setPage(1)
      // .includes("سلاقوس")
      
      // data.filter((e)=>e.includes("مواسير"))
      // console.log(newData);
      
          }
    const SearchByReceipt = (s)=>{
            s.preventDefault();
            
            const mapper = data.filter(e=>e.receiptno.includes(s.target.value))
            
            setSearcher(mapper)
            setPage(1)
            // .includes("سلاقوس")
            
            // data.filter((e)=>e.includes("مواسير"))
            // console.log(newData);
            
                }
    const searchByContractor = (s)=>{
                  s.preventDefault();
                  
                  const mapper = data.filter(e=>e.contractor.includes(s.target.value))
                  
                  setSearcher(mapper)
                  setPage(1)
                  // .includes("سلاقوس")
                  
                  // data.filter((e)=>e.includes("مواسير"))
                  // console.log(newData);
                  
                      }                  
    const Delet=async (e)=>{
      await axios.get('https://amaccompany.onrender.com/deletesecondtransaction/'+e).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }

    
    const updating =(id,store,receiptno,typeOfImporter,contractor,typeOfContracting,
      quantity,items,unit,date,location,user
      
      )=>{

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
        console.log("updateOne",e)
        await axios.post('https://amaccompany.onrender.com/updatesecondtransaction',
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
        {/* <App/> */}
        <Stack>
        <TextField style={{"marginTop": "12px"}} label="بحث بالمهام " onChange={Search}/>
        <TextField style={{"marginTop": "12px"}} label="بحث برقم الاذن " onChange={SearchByReceipt}/>
        <TextField style={{"marginTop": "12px"}} label="بحث باسم المقاول " onChange={searchByContractor}/>
 
        </Stack>
      <Table striped="columns"  style={{width:"1000px"}} >
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
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="رقم الاذن" variant="outlined"
type="text" name="typeofcontracting" value={typeOfContracting} onChange={(e)=>setTypeOfContracting(e.target.value)}/>:e.typeOfContracting}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="المهام" variant="outlined"
type="text" name="items" value={items} onChange={(e)=>setItems(e.target.value)}/>:e.items}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="الكمية" variant="outlined"
type="text" name="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>:e.quantity}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="الوحدة" variant="outlined"
type="text" name="unit" value={unit} onChange={(e)=>setUnit(e.target.value)}/>:e.unit}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="الموقع" variant="outlined"
type="text" name="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>:e.location}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="المستخدم" variant="outlined"
type="text" name="user" value={user} onChange={(e)=>setUser(e.target.value)}/>:e.user}</td>
              <td>{updater === e._id ?<TextField id="outlined-basic" style={{width:"200px"}} label="التاريخ" variant="outlined"
type="text" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>:e.date}</td>
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
  
{/* <Transaction data={data}/> */}
</div>




)








}

export default SecondTransactionadding;
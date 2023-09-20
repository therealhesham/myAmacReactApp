import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"

// import Paginat from "./pagination";
import { TextField , Button, Stack } from "@mui/material";

import socketClient  from "socket.io-client";

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";

function SecondTransactionadding(){
const [data,setData]=useState([]);
const [startpage,setPage] = useState(1)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const [deletedColumn,setDeleter]= useState(false)
const ref = useRef(0);
const navigate = useNavigate()
useEffect(()=>{
  
  if(ref.current == 0){
    // console.log(ref.current);
    axios.get('https://amaccompany.onrender.com/getsecondtransactions',{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(e.data) & setData(e.data.reverse()) )
    
    ref.current=ref.current +1

}
else  {
// ref.current = 1
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
    const Delet=(e)=>{
      axios.get('https://amaccompany.onrender.com/deletesecondtransaction/'+e).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }
      return (
  
  <div>
        {/* <App/> */}
        <Stack>
        <TextField style={{"marginTop": "12px"}} label="بحث بالمهام " onChange={Search}/>
        <TextField style={{"marginTop": "12px"}} label="بحث برقم الاذن " onChange={SearchByReceipt}/>
        <TextField style={{"marginTop": "12px"}} label="بحث باسم المقاول " onChange={searchByContractor}/>
 
        </Stack>
      <Table striped="columns" variant="dark" style={{width:"1000px"}} >
          <thead>
            <tr>
            {/* store:{type:"string",required:true},
typeOfImporter:{type:"string",required:true},
contractor:{type:"string"},
typeOfContracting:{type:"string"},

quantity:{type:"number",required:true},
items:{type:"string",required:true},
unit:{type:"string"},
location:{type:"string"},
date:{type:"string",default:new Date(Date.now()).toDateString()},
user:"string" */}
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
              <th>Delete</th>
            </tr>
          </thead>
          {console.log(size)}
          {/* {data.} */}
          {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
          
          <tbody key={e._id}>
            <tr>

              {console.log(e)}
             <th>{e.receiptno}</th>
              <td>{e.store}</td>
              <td>{e.typeOfImporter}</td>
              <td>{e.contractor}</td>
              <td>{e.typeOfContracting}</td>
              <td>{e.items}</td>
              <td>{e.quantity}</td>
                            <td>{e.unit}</td>
                            <td>{e.location}</td>
                            <td>{e.user}</td>
              <td>{e.date}</td>
              <td><Button color="error" variant="contained" onClick={()=>Delet(e._id)}>Delete</Button></td>
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
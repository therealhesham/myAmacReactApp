import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"

// import Paginat from "./pagination";
import { TextField , Button } from "@mui/material";

import socketClient  from "socket.io-client";

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";

function ImportedData(){
const [data,setData]=useState([]);
const [startpage,setPage] = useState(1)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const ref = useRef(0);
const navigate = useNavigate()
useEffect(()=>{
  
  if(ref.current == 0){
    // console.log(ref.current);
    axios.get('https://amaccompany.onrender.com/firsttansactionlist').then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(e.data) & setData(e.data) )
    
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
console.log(`${s.target.value}`.trim());
const mapper = data.filter(e=>e.items.includes(`${s.target.value}`))

setSearcher(mapper)
setPage(1)
// .includes("سلاقوس")

// data.filter((e)=>e.includes("مواسير"))
// console.log(newData);

    }

    const Delet=(e)=>{
      axios.post('/deletfirsttransaction',{id:e}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }
      return (
  
  <div>
        {/* <App/> */}
        <TextField style={{"marginTop": "12px"}} label="Search" onChange={Search}/>
      <Table striped="columns" variant="dark" style={{width:"900px"}} >
          <thead>
            <tr>
              
              <th>مصدر</th>
              <th>الى مخزن</th>
              <th>مهام</th>
              <th>كمية</th>
              <th>الوحدة</th>
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
             
              <td>{e.source}</td>
              <td>{e.destination}</td>
              <td>{e.items}</td>
              <td>{e.quantity}</td>
              <td>{e.unit}</td>
              
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

export default ImportedData;
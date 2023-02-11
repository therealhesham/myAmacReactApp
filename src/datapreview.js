import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"
import Paginat from "./pagination";
import { TextField , Button } from "@mui/material";
import Transaction from "./addtransaction";
import socketClient  from "socket.io-client";
import App from "./App";
import { Navigate, useNavigate } from "react-router-dom";
import ComboBox from "./search";
import jwtDecode from "jwt-decode";

function DataPreview(){
const [data,setData]=useState([]);
const [startpage,setPage] = useState(0)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState("")
const [id,setId]=useState("")
const [token,setToken]=useState()
const ref = useRef(0);
const [admin,isAdmin]=useState(true)
const navigate = useNavigate()
useEffect(()=>{
  
  if(ref.current == 0){
    console.log(ref.current);
    axios.get('https://amaccompany.onrender.com/preview').then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(e.data) & setData(e.data) )
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
      axios.post('https://amaccompany.onrender.com/delete',{id:e}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
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
              <td><Button color="success" variant="contained" disabled={token.isAdmin?false:true} >UPDATE</Button></td>
              <td><Button color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>Delet(e._id)}>Delete</Button></td>
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

export default DataPreview;
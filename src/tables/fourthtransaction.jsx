import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"

// import Paginat from "./pagination";
import { TextField , Button, Typography } from "@mui/material";

import socketClient  from "socket.io-client";

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";

function FourthTransactionadding(){
const [data,setData]=useState([]);
const [startpage,setPage] = useState(1)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const [deletedColumn,setDeleter]= useState(false)
const ref = useRef(0);
const navigate = useNavigate()
const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("")
  const [ statePreviewImage,setStatePreview]=useState(false)
useEffect(()=>{
  
  // if(ref.current == 0){
    // console.log(ref.current);
    axios.get(process.env.REACT_APP_API_URL+'/refunds',{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(_.reverse(e.data)) & setData(_.reverse(e.data)) )
    
//     ref.current=ref.current +1
}
// }
// else  {
// // ref.current = 1
// }
// }
    ,[])
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

    const Delet=async (e)=>{
      await axios.get(process.env.REACT_APP_API_URL+'/deletrefund/'+e,{withCredentials:true}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }
      return (
  
  <div>
        {/* <App/> */}
        <TextField style={{"marginTop": "12px"}} label="Search" onChange={Search}/>
      <Table striped="columns"   >
          <thead>
            <tr>
            
              <th>رقم الاذن</th>
              <th>المخزن</th>
              <th>المقاول</th>
              
              <th>المهام</th>
              <th>كمية</th>
              <th>الوحدة</th>
  <th>رابط صورة الاذن</th>            
             
              <th>تاريخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          {console.log(size)}
          {/* {data.} */}
          {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
          
          <tbody key={e._id}>
            <tr>

             
  <td>{e.receiptno}</td>
              <td>{e.contractor}</td>
              <td>{e.destination}</td>
              <td>{e.items}</td>
              <td>{e.quantity}</td>
              
              
                            <td>{e.type}</td>
              
                <td>{e.file?<Typography onClick={()=>{setStatePreview(true)
                setCloudinaryImage(e.file)}
                } style={{color:"green"}}>   صورة الاذن من هنا </Typography>:<Typography>غير متاح صور اذون</Typography>  }</td>             
              <td>{e.date}</td>
              <td><Button color="error" variant="contained" onClick={()=>Delet(e._id)}>Delete</Button></td>
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

export default FourthTransactionadding;
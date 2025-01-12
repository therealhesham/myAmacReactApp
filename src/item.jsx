import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import {sort } from"fast-sort";
import { Typography } from "@mui/material";

const ItemPage = (props) => {
const navigate = useNavigate();
const {name,store} = useParams()
const [ array,setArray]=useState([]);

useEffect(()=>{
(async function getData(){
    
 const data = await axios.get(`${process.env.REACT_APP_API_URL}/find/${name}/store/${store}`).then(e=> e.data == "not authenticated" ? navigate("/login"):e.data)
const sortedData = sort(data).desc(u=>u.date)
setArray(sortedData)

})()


},[])
const columns= [
    { field: 'receiptno', headerName: 'رقم الاذن', width: 150 },  
    { field: 'transaction', headerName: 'نوع العملية', width: 150 },
    { field: 'transactionType', headerName: 'نوع العملية', width: 150 },
    { field: 'store', headerName: 'المخزن', width: 150 },
    { field: 'quantity', headerName: 'الكمية', width: 200 },
    
    { field: 'date', headerName: 'تاريخ الاصدار', width: 150 }, 
    { field: 'file', headerName: 'صورة الاذن', width: 800 }
    // { field: 'transaction', headerName: 'صورة الرابط', width: 200 },
  ];
  function getRowId(row){

return row._id

  }

return ( <div style={{height:'100%',width:"100%"}}>
<Typography style={{marginLeft:"40%",fontSize:"2.5rem",color:"dodgerblue"}}>بيان {name} المتاح في {store}</Typography>
<div style={{ height: "100%", width: '100%' }}>
      <DataGrid getRowId={getRowId} style={{width:"100%",border:'black'}} rows={array} columns={columns} />
    </div>
    </div> );
}
 
export default ItemPage ;
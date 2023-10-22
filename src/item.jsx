import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";


const ItemPage = (props) => {

const {name,store} = useParams()
const [ array,setArray]=useState([]);
useEffect(()=>{
(async function getData(){
    
await axios.get("https://amaccompany.onrender.com/find/"+name+"/store/"+store).then(e=> e.data == "not authenticated" ? navigate("/login"):setArray(finder))


})()


},[])
const columns= [
    { field: 'receiptno', headerName: 'رقم الاذن', width: 150 },  
    { field: 'transaction', headerName: 'نوع العملية', width: 150 },
    { field: 'quantity', headerName: 'الكمية', width: 200 },
    { field: 'file', headerName: 'صورة الاذن', width: 200 },
    { field: 'date', headerName: 'تاريخ الاصدار', width: 150 },

    // { field: 'transaction', headerName: 'صورة الرابط', width: 200 },
  ];
  function getRowId(row){

return row._id

  }

return ( <div style={{height:'100%',width:"100%"}}>

<div style={{ height: "100%", width: '100%' }}>
      <DataGrid getRowId={getRowId} style={{width:"100%"}} rows={array} columns={columns} />
    </div>
    </div> );
}
 
export default ItemPage ;
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';

function RecycleBin(){
const [data,setData]=React.useState([]);


const fetcher = async()=>{
    
    if(localStorage.getItem("token")){
        const getToken = localStorage.getItem("token");
        
        const details = jwtDecode(getToken)
        
        await axios.get('https://amaccompany.onrender.com/firsttansactionlist',{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setData(e.data) )
        }
        else if (!localStorage.getItem("token")){
      navigate("/login")
      
      
        }
      
          // console.log(ref.current);
        
}

React.useEffect(()=>{

          fetcher();
      
      



},[])  
      
// type:"string",
// date:"string",
// user:"string",
// imageurl:"string",
// transaction:"object"


const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns= [
    
    { field: 'type', headerName: 'نوع عملية الحذف', width: 150 },
    { field: 'date', headerName: 'تاريخ', width: 150 },
    { field: 'user', headerName: 'القائم بعملية الحذف', width: 200 },
    { field: 'imageurl', headerName: 'صورة الرابط', width: 200 },
    // { field: 'transaction', headerName: 'صورة الرابط', width: 200 },
  ];
  



  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
    
    }
    
    export default RecycleBin;
    



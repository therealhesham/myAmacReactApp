import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

import _ from "lodash"

// import Paginat from "./pagination";
import { Autocomplete,FormControl,InputLabel,Select,MenuItem,TextField ,Modal, Button, Typography, Box } from "@mui/material";

import socketClient  from "socket.io-client";

import { Navigate, useNavigate } from "react-router-dom";
import Paginat from "../pagination";
import jwtDecode from "jwt-decode";
import * as XLSX from "xlsx"


function ImportedData(){
const [data,setData]=useState([]);
const [startpage,setPage] = useState(1)
const [size,setSize] = useState(10)
const [searchedData,setSearcher ] = useState([])
const [id,setId]=useState("")
const ref = useRef(0);
const navigate = useNavigate()
const [updater,setUpdater]= useState("")
const [error,setError]=useState("")
const [stores,setStores]=useState([])
const [contractors,setContractors]=useState([])
const [searchedExecutionType,setSearchedExecutionType]=useState("");
const[searchedTypeOfImporter,setSearchedOfTypeOfImporter]=useState("");
const [searchedItem,setSearchedItem]=useState("");
const [searchedContractor,setSearchedContractor]=useState("");
const [searchedStore,setSearchedStore]=useState("");
const[uniqueitems,setUniqueITems]=useState([])


const [receiptno,setReceiptno]=useState("")
const [refundlocation,setRefundlocation]=useState("")
const [refundcontractor,setRefundcontractor]=useState("")
const [importedreceiptno,setImportedreceiptno]=useState("")
const [searchEngineModal,setSearchEngineModal]=useState(false);
const [source,setSource]=useState("");
const [destination,setDestination]=useState("");
const[quantity,setQuantity]=useState("");
const[items,setItems]=useState("");
const[unit,setUnit]=useState("");
const [user,setUser]=useState("");
const [date,setDate]=useState("");
const[token,setToken]=useState({});
const [uploadFile, setUploadFile] = useState("");
const[factories,setFactories]=useState([]);
const[searchedFactory,setSearcedFactory]=useState("");
const [cloudinaryImage, setCloudinaryImage] = useState("")
  const [ statePreviewImage,setStatePreview]=useState(false)
  const handleClose = () => setStatePreview(false);
  const handleOpen = () => setStatePreview(true);

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    height:"500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  
  async function dataGetter(){
    await axios.get(process.env.REACT_APP_API_URL+"/listoffactories",{withCredentials:true}).then((e) => 
      setFactories(e.data)
      )
    
    await axios.get(process.env.REACT_APP_API_URL+"/listofstores",{withCredentials:true}).then((e) => 
    
     setStores(e.data)
     )
  
  
     
    await axios.get(process.env.REACT_APP_API_URL+"/listofnames",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
    setContractors(_.reverse(e.data))).catch(error=>console.log(error))
    
  }
  
  const styleModal = {
    display:"flex",
    gap:"12px",
    flexDirection:"column",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };       
  useEffect(()=>{
  
if(localStorage.getItem("token")){
  const getToken = localStorage.getItem("token");
  
  const details = jwtDecode(getToken)
  setToken(details)
dataGetter()
  axios.get(process.env.REACT_APP_API_URL+"/firsttansactionlist",{withCredentials:true}).then((e) => e.data == "not authenticated" ?navigate("/login") :setSearcher(_.reverse(e.data)) & setData(_.reverse(e.data)) )
  }
  else if (!localStorage.getItem("token")){
navigate("/login")


  }

    // console.log(ref.current);
  
    
}


    ,[])
    // console.log(ref.current);

    const reset =()=>{
     

      setUpdater(0) 
      
          }
    const handleChange = (event, value) => {
      setPage(value);
    };
// d
const searchHandler = async()=>{

  await axios.post(process.env.REACT_APP_API_URL+'/searchfirsttransaction',{searchedStore,searchedFactory,searchedTypeOfImporter,searchedItem,searchedContractor},{withCredentials:true}).then((e) => setSearcher(_.reverse(e.data))  )
    
  
  
  }

const handleExportToExcel = () => {
  // Convert JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(searchedData);

  // Create a workbook with the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Write the workbook to a binary Excel file and trigger a download
  XLSX.writeFile(wb, 'data.xlsx');
};

  const SearchByReceipt = (s)=>{
  s.preventDefault();
  
  const mapper = data.filter(e=>e.receiptno.includes(s.target.value))
  
  setSearcher(_.reverse(mapper))
  setPage(1)
  // .includes("سلاقوس")
  
  // data.filter((e)=>e.includes("مواسير"))
  // console.log(newData);
  
      }



const Search = (s)=>{
s.preventDefault();

const mapper = data.filter(e=>e.items.includes(`${s.target.value}`))

setSearcher(_.reverse(mapper))
setPage(1)

    }

    const Delet=async (e)=>{
      await axios.post(process.env.REACT_APP_API_URL+"/deletfirsttransaction",{id:e},{withCredentials:true}).then((e) => console.log(e.data))
const data = searchedData.filter((s)=> e != s._id)
const dataRe = [...data]
setSearcher(dataRe)
    }

    const updating =(id,receiptno,source,destination,quantity,items,unit,user,date,refundLocation,refundContractor,importedReceiptNo)=>{
    setUpdater(id);
    setReceiptno(receiptno);
    setSource(source);
    setDestination(destination);
    setQuantity(quantity);
setItems(items);
setUnit(unit);
setUser(user);
setDate(date)
setRefundlocation(refundLocation)
    setRefundcontractor(refundContractor)
    setImportedreceiptno(importedReceiptNo)
    
    }
    const updateOne=async (e)=>{
      
      await axios.post(process.env.REACT_APP_API_URL+"/updatefirsttransaction",
      {id:e,receiptno:receiptno,
        source:source,
        destination:destination,
    quantity:quantity,
    items:items,
    unit:unit,
    user:user,
    date:date},{withCredentials:true}).then((e) => e.data == "updated" ?  reset()  :setError("خطأ في البيانات") )

    }

    return (
  
  <div>
    <div>
        <Button onClick={handleExportToExcel} variant="contained" color="info">Excel File</Button>  

        <Button onClick={()=>setSearchEngineModal(true)} variant="contained" color="warning">search engine</Button>  

</div>
        {/* <App/> */}

<Modal open={searchEngineModal} 
      onClose={()=>setSearchEngineModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"



>
<Box sx={styleModal}>
<div>
  Search Engine
</div>
<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setSearchedItem(value)}
        
        options={uniqueitems.map((option) => option)}
        renderInput={(params) => <TextField {...params}  label="المهام" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />








<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setSearchedStore(value)}
        value={searchedStore}  
        options={stores.map((option) => option.name)}
        renderInput={(params) => <TextField {...params}  label="المخازن" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />


<Autocomplete
          id="combo-box-demo"
          onInputChange={(event, value) => setSearcedFactory(value)}
        value={searchedFactory}  
        options={factories.map((option) => option.name)}
        renderInput={(params) => <TextField {...params}  label="المصدر" placeholder="اكتب اول حرفين من المهام واختار من القائمة"/>}
      />



<Button onClick={searchHandler} variant="contained" color="info">search</Button>

<Button onClick={()=>setSearchEngineModal(false)} variant="contained" color="error">cancel</Button>


</Box>

</Modal>


        <TextField style={{"marginTop": "12px"}} label="بحث بالمهام " onChange={Search}/>

        <TextField style={{"marginTop": "12px"}} label="بحث برقم الاذن" onChange={SearchByReceipt}/>
      <Table striped="columns"   >
          <thead>
            <tr>
              <th >رقم الاذن</th>
              <th >مصدر</th>
              <th >القرية</th>
              <th >المقاول</th>

              <th >مخزن الوارد</th>

              <th >مهام</th>
              <th >كمية</th>
              <th >الوحدة</th>
              <th >اذن الوارد</th>

              <th >صورة الاذن</th>
              <th >بواسطة</th>
              <th >تاريخ</th>
              <th>حذف</th>
              <th>تحديث</th>
            </tr>
          </thead>
          {console.log(size)}
          {/* {data.} */}
          {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map((e)=>
          
          <tbody key={e._id}>
            <tr>


              <td>{  updater === e._id  ? <TextField  id="outlined-basic" style={{width:"400px"}} label="رقم الاذن" variant="outlined"
type="number" name="store" value={receiptno}  onChange={(e)=>setReceiptno(e.target.value)}/> : e.receiptno}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="مصدر الوارد" variant="outlined"
type="text" name="store" value={source} onChange={(e)=>setSource(e.target.value)}/> :e.source}</td>

<td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="القرية" variant="outlined"
type="text" name="refundlocation" value={refundlocation} onChange={(e)=>setRefundlocation(e.target.value)}/> :e.refundlocation}</td>



<td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="المقاول" variant="outlined"
type="text" name="refundcontractor" value={refundcontractor} onChange={(e)=>setRefundcontractor(e.target.value)}/> :e.refundlocation}</td>




              <td style={{backgroundColor:"yellowgreen",color:"white"}}>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="المخزن" variant="outlined"
type="text" name="store" value={destination} onChange={(e)=>setDestination(e.target.value)}/> :e.destination}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="المهام" variant="outlined"
type="text" name="store" value={items} onChange={(e)=>setItems(e.target.value)}/> :e.items}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="الكمية" variant="outlined"
type="number" name="store" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/> :e.quantity}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="الوحدة" variant="outlined"
type="text" name="store" value={unit} onChange={(e)=>setUnit(e.target.value)}/> :e.unit}</td>


<td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="اذن التوريد" variant="outlined"
type="text" name="store" value={importedreceiptno} onChange={(e)=>setImportedreceiptno(e.target.value)}/> :e.importedreceiptno}</td>


                  <td>{e.file?<Typography onClick={()=>{setStatePreview(true) 
                              setCloudinaryImage(e.file)}} style={{color:"green",padding:4}}>   صورة الاذن من هنا </Typography>:<Typography>غير متاح صور اذون</Typography>  }</td>            
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="المستخدم" variant="outlined"
type="text" name="store" value={user} onChange={(e)=>setUser(e.target.value)}/> :e.user}</td>
              <td>{updater === e._id ? <TextField id="outlined-basic" style={{width:"400px"}} label="التاريخ" variant="outlined"
type="date" name="store" value={date} onChange={(e)=>setDate(e.target.value)}/> :e.date}</td>
              <td><Button color="error" variant="contained" onClick={()=>Delet(e._id)}>Delete</Button></td>
              
              <td style={{width:"70px"}}>{updater === e._id ? <Button variant="contained"  style={{width:"70px"}} 
              onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.receiptno,e.source,e.destination,e.quantity,e.items,e.unit,e.user,e.date,e.refundlocation,e.refundcontractor,e.importedreceiptno)}>UPDATE</Button>}</td>
            </tr>
            
          </tbody>)}


        </Table>
        <Modal
        open={statePreviewImage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          صورة الاذن رقم {receiptno}
          </Typography>
          <img   style={style} src={cloudinaryImage} />
        </Box>
      </Modal>
    <div>
    <Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>
    </div>
  
{/* <Transaction data={data}/> */}
</div>




)








}

export default ImportedData;
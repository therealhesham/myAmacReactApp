import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import _ from "lodash";

import {useState , useEffect , useRef} from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
export default function AlignItemsList() {
const [data,setData ] = useState([])
const [reversedData,setReversed ] = useState()
const [copyiedArr,setCopied]=useState("")
const [filtered,setFiltered]=useState([])
const [filteredData,setFilteredfalse]=useState([])
const ref = useRef(0)
const navigate = useNavigate()

const matches = useMediaQuery('(min-width:600px)');
    useEffect(()=>{

      const token = localStorage.getItem("token");
if (!token) return navigate("/login")


// if (ref.current < 1){
axios.get("https://amaccompany.onrender.com/requests").then((e)=>   { e.data == "not authenticated" ? navigate("/login")  : setData(e.data)} )

setFiltered(data.filter(e=> e.isOk == true))
setFilteredfalse(data.filter(e=> e.isOk != true))

// setReversed(data)

// console.log(data)
    // console.log(_.reverse(data))
    // const newArr = []
//     ref.current = ref.current +1
// }
// else{
// console.log("ss")
    
// }


},[data,filteredData,filtered])
const setter = (id)=>{
axios.post("https://amaccompany.onrender.com/setter",{id:id}).then(e=>console.log("deleted"))
ref.current = -1

}
  return (
    <div style={{padding : "10px"}}>
        
    <List sx={{ width: '100%', maxWidth: 720,minWidth:100, bgcolor: 'background.paper'  }}>
    {data ? filteredData.map(e=>         
        <ListItem alignItems="flex-start" key={e._id} >
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={e.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" , fontSize: "18px" }}
                component="strong"
                variant="body2"
                color="maroon"
                gap="1"
              > 
              {/* from */}
                {e.sender}
              </Typography>
              <br></br>
              {e.message}
              
              <Button  onClick = {()=>setter(e._id)}style ={{marginLeft:"11px"}}color={e.isOk ? "success" :"error"} variant="contained">وافق</Button>
            </React.Fragment>
          }
        />
      </ListItem>   ):""}
      {data ?filtered.map(e=>         
        <ListItem alignItems="flex-start" key={e._id} >
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={e.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                gap="3"
              >
                {e.firstName}
              </Typography>
              {e.message}
              
              <Button  onClick = {()=>setter(e._id)}style ={{marginLeft:"11px"}}color={e.isOk ? "success" :"error"} variant="contained">وافق</Button>
            </React.Fragment>
          }
        />
      </ListItem>   ):""}
      
          </List>
</div>  );
}

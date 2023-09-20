
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, TextField, Stack } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { useState } from 'react';
import Paginat from './pagination';
import _ from 'lodash';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import exportFromJSON from 'export-from-json' 


const ListCompon = ({searchedData,data,delet,updateOne,items,store,quantity,updater,token,search,setStore,setItems,setquantity,type,settype,updating}) => {

// const xlsx = "xls";
// const downloads = "download"
//     const download=exportFromJSON({ searchedData , downloads , xlsx })    
    
    const [startpage,setPage] = useState(0)
    const [size,setSize] = useState(10)
    const handleChange = (event, value) => {
        setPage(value);
      };
      
    
    
    const rowSizes = new Array(searchedData.length)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 50));
    const getItemSize = index => rowSizes[index];
    // sss = 
    // nnnn=
    
    return (<div>

    <TextField style={{"marginTop": "12px"}} label="Search" onChange={(e,s)=>search(e,s)}/>

      <List >
        {_.drop(searchedData,(startpage-1 )* size).slice(0,size).map(e=>
        <ListItem  disablePadding={false} sx={{ width: "350px"}}>
          <Stack>
            
           {updater === e._id? <TextField id="outlined-basic" style={{width:"350px" ,paddingBottom:"5px"}} label="المخزن" variant="outlined"
type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/> : <ListItemText style={{width:"350px"}} >{e.store}</ListItemText>}
    {updater === e._id? <TextField id="outlined-basic" style={{width:"350px" ,paddingBottom:"5px"}} label="المهام" variant="outlined"
type="text" name="store" value={items} onChange={(e)=>setItems(e.target.value)}/> : <ListItemText style={{width:"350px"}} >{e.items}</ListItemText>}
             {updater === e._id? <TextField id="outlined-basic" style={{width:"350px" ,paddingBottom:"5px"}} label="الكمية" variant="outlined"
type="text" name="store" value={quantity} onChange={(e)=>setquantity(e.target.value)}/> : <ListItemText  style={{width:"350px"}}>{e.quantity}</ListItemText>}
            {updater === e._id? <TextField id="outlined-basic" style={{width:"350px" ,paddingBottom:"5px"}} label="الوحدة" variant="outlined"
type="text" name="store" value={type} onChange={(e)=>settype(e.target.value)}/> : <ListItemText style={{width:"350px"}} >{e.type}</ListItemText>}
            
            {updater === e._id?<Button variant="contained" fullWidth color="info" style={{paddingBottom:"12px"}}   onClick={()=>updateOne(e._id)}>تحديث بيانات</Button>:<Button fullWidth color="info" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.items,e.store,e.type,e.quantity)}>UPDATE</Button>}
          <Button  fullWidth color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>delet(e._id)}>Delete</Button>
          </Stack>

        </ListItem>)}
        <Divider />
      </List>
{/*       
      <WhatsappShareButton url={download}
       
       
       title={"sss"}       separator=":: "
       className="share__some-network__share-button"
      >
       <WhatsappIcon size={24} round />
      </WhatsappShareButton> */}
      <Paginat  startPage={startpage} size={searchedData.length} Setter={handleChange} color="secondary"/>

  </div> );
}
 
export default ListCompon;
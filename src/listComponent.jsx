
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
import { inner } from '@cloudinary/url-gen/qualifiers/outlineMode';

const ListCompon = ({searchedData,data,delet,updateOne,items,store,quantity,updater,token,search,setStore,setItems,setquantity,type,settype,updating}) => {

    return (<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

    <TextField style={{"marginTop": "12px"}} label="Search" onChange={(e,s)=>search(e,s)}/>
<FixedSizeList height={window.innerHeight} itemSize={window.innerHeight/5} itemCount={5} width={window.innerWidth}>
    <nav aria-label="main mailbox folders">
      <List>
        {searchedData.map(e=>
        <ListItem disablePadding>
          <Stack>
            
           {updater? <TextField id="outlined-basic" style={{width:"200px"}} label="المخزن" variant="outlined"
type="text" name="store" value={store} onChange={(e)=>setStore(e.target.value)}/> : <ListItemText  >{e.store}</ListItemText>}
    {updater? <TextField id="outlined-basic" style={{width:"200px"}} label="المهام" variant="outlined"
type="text" name="store" value={items} onChange={(e)=>setItems(e.target.value)}/> : <ListItemText  >{e.items}</ListItemText>}
             {updater? <TextField id="outlined-basic" style={{width:"200px"}} label="الكمية" variant="outlined"
type="text" name="store" value={quantity} onChange={(e)=>setquantity(e.target.value)}/> : <ListItemText  >{e.quantity}</ListItemText>}
            {updater? <TextField id="outlined-basic" style={{width:"200px"}} label="الوحدة" variant="outlined"
type="text" name="store" value={type} onChange={(e)=>settype(e.target.value)}/> : <ListItemText  >{e.types}</ListItemText>}
            
            <Button variant="contained"   fullWidth onClick={()=>console.log(e._id)}>تحديث بيانات</Button>:<Button fullWidth color="success" variant="contained" disabled={token.isAdmin?false:true}  onClick={()=>updating(e._id,e.items,e.store,e.type,e.quantity)}>UPDATE</Button>
          <Button  fullWidth color="error" variant="contained" disabled={token.isAdmin?false:true} onClick={()=>console.log("sss")}>Delete</Button>
          </Stack>
        </ListItem>)}
      </List>
      <Divider />
    </nav>
    </FixedSizeList>
  </Box> );
}
 
export default ListCompon;
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile() {
    
    const navigate = useNavigate();
    const ref = React.useRef(0)
    const [profiledata,setData]=React.useState({})
    const [ token,setToken]=React.useState(profiledata)
React.useEffect(()=>
{
    if(localStorage.getItem("token")){
        const getToken = localStorage.getItem("token");
        
        const details = jwtDecode(getToken)
        setToken(details)
        // console.log(token)
        // if(ref.current == 0){
          
        axios.get("https://amaccompany.onrender.com/info/"+token.id).then(e=>e.data?setData(e.data):navigate("/login"))
      console.log(profiledata)
      // ref.current = ref.current +1
      // }
        }else if(localStorage.getItem("token") == null)
        {navigate("/login")}

        

}

,[token,profiledata]


)    
  return (<div style={{backgroundColor:"azure" ,color:"orchid"}}>
    {(localStorage.getItem("token"))?<Box sx={{ flexGrow: 1 }}>
      <Grid  gap={4} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} 
      style={{paddingLeft:"10px" ,color:"darkcyan"}} color="darkcyan"
      >
      <Grid xs={2} sm={4} md={4} style={{width:"300px" , paddingTop:"20px", paddingLeft:"20px"}}>
            <Item  style={{width:"300px" , padding:"2px"}}><img  style={{width:"300px" }} src={token?token.url:"/"}></img></Item>
            
          </Grid>
          <Grid xs={2} sm={4} md={4} >
            <Item>
               <div ><Typography > <Typography  >user name:</Typography><Typography style={{color:"blue"}}>{profiledata.username}</Typography></Typography></div>
            <Typography>First Name:</Typography><Typography style={{color:"blue"}}>{profiledata.firstName}</Typography>
            <div style={{display:"inline-block"}}><Typography style={{display:"inline-block" , whiteSpace:"nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>second Name: <Typography style={{color:"blue"}}>{profiledata.secondName}</Typography></Typography></div>
            <Typography>Job Title:</Typography><Typography style={{color:"blue"}}>{profiledata.position}</Typography>
            <Typography>Age:</Typography>

            
            </Item>
            
          </Grid>
          
      </Grid>
    </Box>:""}
    </div>
  );
}
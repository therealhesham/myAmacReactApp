import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';

import { Badge, Stack } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import ButtonsComponent from './components/registerloginbutton';
import jwtDecode from 'jwt-decode';


const pages = [
{link : <Link to="/profile" style={{textDecoration:"none",color:"black"}}>الصفحة الشخصية</Link>,id:1},
{link:<Link to="/preview" style={{textDecoration:"none",color:"black",borderColor:"white"}}>جرد المخازن</Link>,id:2}
,
{link:<Link to="/postmaindata" style={{textDecoration:"none",color:"black",borderColor:"black"}}>اضافة جرد</Link>,id:3},
{link:<Link to="/transaction" style={{textDecoration:"none",color:"black",borderColor:"black"}}>اضافة عملية</Link>,id:4},
{link:<Link to="/previewtable" style={{textDecoration:"none",color:"black",borderColor:"black"}}>جداول العمليات</Link>,id:5}

];
const settings = [{setting:<Link to="/profile">Profile</Link>,id:1}, {setting:'store',id:2},
 
{setting:'Dashboard',id:3}, {setting:<Link to="/logout">تسجيل خروج</Link>,id:4}];

function ResponsiveAppBar() {
const [list,setList] = React.useState([])
const [filtered,setFiltered]=React.useState([])
const [data,setData ] = React.useState([])
const [filteredData,setFilteredfalse]=React.useState([])
const [token,setToken]=React.useState("")
const navigate = useNavigate()
const ref = React.useRef(0)
function Logout(){
    
  localStorage.clear()
  // window.location.reload()
 
 }
useEffect( ()=>{
  if(ref.current == 0){
   axios.get("https://amaccompany.onrender.com/checker").then((e)=> e.data == "not authenticated"  ?
    Logout : 
    setData(e.data) )
ref.current = ref.current+1
}
if(localStorage.getItem("token")){
const getToken = localStorage.getItem("token");

const details = jwtDecode(getToken)
setToken(details)
 }
 
else if(localStorage.getItem("token") == null)
{navigate("/login")}
//  }
  },[data])
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{ height:"60px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AMAC Company
          </Typography>

          {token?<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
              
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography key={page.id} textAlign="center" variant='black' >{page.link}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>:""}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Amac
          </Typography>
          
         {token? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              
              variant='primary'
              
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary', display: 'block'}}
              >
                {page.link}
              </Button>
            ))}
            
          </Box>:""}
          {localStorage.getItem("token")?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={token.firstName} src={token.url} />
              </IconButton> 
            </Tooltip>
            <Badge  color="secondary" style={{paddingLeft:"12px"}} >
            <Link to="/chat"><SendIcon fontSize="small" color="action" variant="error"></SendIcon>  </Link>
            </Badge>
            <Badge badgeContent={typeof data == "string" ? null :data.length} color="error" style={{paddingLeft:"12px"}} >
            
            <NotificationsNoneIcon fontSize="small" color="action" variant="secondary"/>
            
          </Badge>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  
                  <Typography textAlign="center" ><Link to="/">{setting.setting}</Link></Typography>
                  
                </MenuItem>
              ))}
            
            </Menu>
            
          </Box>
          :<ButtonsComponent/>}
        </Toolbar>
      </Container>
      
    </AppBar>
  );
}
export default ResponsiveAppBar;
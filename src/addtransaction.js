import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppBar, Button, Stack, SwipeableDrawer, TextField, Typography, useMediaQuery } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

// import TabPanel from '@mui/lab/TabPanel';
import PropTypes from 'prop-types';
import _ from "lodash";

// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import axios from "axios";
import jwtDecode from "jwt-decode";
import FirstTransaction from "./components/firstTransactionComp";
import SecondTransaction from "./components/secondTransactionComp";

import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views-react-18-fix/lib/SwipeableViews";
import Thirdtransaction from "./components/thirdTransaction";
import { useEffect } from "react";
import Fourth from "./components/fourth";
import { useNavigate } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Transaction() {


  const [fromList,setFromList]=useState([])
  const [data,setData]=useState([])
const ref = React.useRef(1)
const [unit,setUnit]=useState([])
const [StorageToken, SetToken]= useState("")
const [contractorNames,setContractors]=useState([])
  const [places,setPlaces]=useState([])
  const [storenames,setStoreNames]=useState([])
  const [factories,setFactories]=useState([])
 const client = ["مقاول" , "مخزن"]
 
 const match = useMediaQuery("(max-width: 450px)")
 const navigate =useNavigate()


 async function getDatas(){
  await axios.get(process.env.REACT_APP_API_URL+"/listoffactories",{withCredentials:true}).then((e) => 
  setFactories(e.data)
  )

  await axios.get(process.env.REACT_APP_API_URL+"/preview",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
setData(_.reverse(e.data))).catch(error=>console.log(error))
// alert(localStorage.getItem("firstname"))


await axios.get(process.env.REACT_APP_API_URL+"/listofnames",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
setContractors(_.reverse(e.data))).catch(error=>console.log(error))


await axios.get(process.env.REACT_APP_API_URL+"/listofplaces",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
setPlaces(_.reverse(e.data))).catch(error=>console.log(error))

await axios.get(process.env.REACT_APP_API_URL+"/listofstores",{withCredentials:true}).then(e=> e.data == "not authenticated" ? navigate("/login"):
setStoreNames(_.reverse(e.data))).catch(error=>console.log(error))

   

 }
 useEffect( ()=>{
  getDatas()

    // for (let i = 0; i < ref.current ; i++) {
const loStorage = localStorage.getItem("token")
if(!loStorage) return;
// console.log(Tabs);

const geTTer = jwtDecode(loStorage)
SetToken(geTTer.username)
const arr=[]
const unitArr = []
   data.forEach(e=> {if (!arr.includes(e.store)) return arr.push(e.store)})
console.log(data)
   data.forEach(e=> {if (!unitArr.includes(e.type)) return unitArr.push(e.type)})
setFromList(arr)
setUnit(unitArr)
// }
}

,[data])

const theme = useTheme();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};
return(
<div>
{StorageToken ? 
  <Box sx={{ bgcolor: 'background.paper', width: "100%"   }} >
        <AppBar position="relative"  color="secondary"  sx={{borderRight:"12px" }}>
          
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            // style={{paddingLeft:"40px"}}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab   label="وارد" {...a11yProps(0)} key="0"/>
            <Tab  label="منصرف" {...a11yProps(1)} key="1"/>
            <Tab  label="تحويل" {...a11yProps(2)} key="2"/>
            <Tab label="مرتجع" {...a11yProps(3)} key="3"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
        
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          
        >
          <TabPanel  value={value} index={0} key="0" dir={theme.direction} >
          <FirstTransaction  places={places} storenames={storenames} fromList={fromList}  data={data} client={client} source={factories} unit={unit}/>
          </TabPanel>
          <TabPanel value={value}  index={1} key="1" dir={theme.direction}>
          <SecondTransaction  places={places}   storenames={storenames} contractorNames={contractorNames}  fromList={fromList} data={data} client={client} source={factories} unit={unit}/>
          </TabPanel>
          <TabPanel value={value} index={2} key="2" dir={theme.direction}>
          <Thirdtransaction fromList={fromList} data={data} client={client} source={factories} unit={unit}/>
          </TabPanel>
          <TabPanel value={value} index={3} key="3" dir={theme.direction}>
            
            {/* <Thirdtransaction fromList={fromList} data={data} client={client} source={source} unit={unit}/> */}
          <Fourth places={places}   storenames={storenames} contractorNames={contractorNames} fromList={fromList} data={data}  unit={unit}/>
          </TabPanel>
        </SwipeableViews>
      </Box>
      
  
  
  
  
   :navigate("/login")}
  </div>
    )
}



export default Transaction;





import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImportedData from './tables/firsttransaction';
import SecondTransactionadding from './tables/secondtransaction';
import ThirdTransactionadding from './tables/thirdtransaction';
import FourthTransactionadding from './tables/fourthtransaction';
import jwtDecode from 'jwt-decode';

export default function Previewtable() {

  React.useEffect(()=>
  {
const token = localStorage.getItem("token")
const decoder = jwtDecode(token)
if(!decoder) return;


  })
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="قايمة الوارد" value="1" />
            <Tab label="قائمة المنصرف" value="2" />
            <Tab label="قائمة التحويلات" value="3" />
            <Tab label="قائمة المرتجعات" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"><ImportedData/></TabPanel>
        <TabPanel value="2"><SecondTransactionadding/></TabPanel>
        <TabPanel value="3"><ThirdTransactionadding/></TabPanel>
        <TabPanel value="4"><FourthTransactionadding/></TabPanel>
      </TabContext>
    </Box>
  );
}


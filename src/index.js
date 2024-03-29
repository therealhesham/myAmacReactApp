import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import reportWebVitals from './reportWebVitals';
import Register from './register';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './navbar';
 import AlignItemsList from "./components/requestpreview"
import Login from './login';

import PostNewDataToMainWarehouse from './routes/postdatatomainwarehouses';
import ResponsiveAppBar from './navbar';
import Transaction from './addtransaction';
import Chat from './components/engineerReq';
// Profile
import ColorBadge from './iconNotifications';
import DataPreview from './datapreview';

import Previewtable from './preview';
import ImportedData from './tables/firsttransaction';
import Profile from './App';
import jwtDecode from 'jwt-decode';
import {Provider} from 'react-redux'
import Logout from './logoutComponent';
import Names from './postnames';
import PrivacyPolice from './privacypolice';
import RecycleBin from './recyclebin';
import ItemPage from './item';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //  <React.StrictMode>
  // <Provider>
    <BrowserRouter>
  <ResponsiveAppBar/>
    <Routes>

<Route  element={<ItemPage/>} path='/:name/:store'/>
    <Route element={<Login/>}  path="/login"/>
    <Route element={<Logout/>}  path="/logout"/>
    <Route element={<Names/>}  path="/postnames"/>
    <Route element={<DataPreview/>}  path="/"/>
    {/* <Route element={<DataPreview/>}  path="/"/> */}
    <Route element={<Transaction/>}  path="/transaction"/>
    <Route element={<DataPreview/>}  path="/preview" />
    <Route element={<Previewtable/>}  path="/previewtable" />
    <Route element={<Profile/>}  path="/Profile" />
    <Route element={<Chat/>}  path="/chat"/>
    <Route element={<AlignItemsList/>}  path="/list"/>
    <Route element={<PrivacyPolice/>}  path="/privacypolicy"/>
    <Route element={<Register/>}  path="/register"/>
  <Route element={<PostNewDataToMainWarehouse/>} path="/postmaindata"/>
  <Route element={<RecycleBin/>} path="/recyclebin"/>
    

    </Routes>
    </BrowserRouter>
   /* // </React.StrictMode>  */
   /* </Provider> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

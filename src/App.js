import React, { useReducer, useState } from 'react';
import { Box } from "@mui/material";
import Team from "./scenes/team";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Contacts from "./scenes/contacts";
import Sidebar from "./scenes/global/Sidebar";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/Pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Main from "./scenes/main";

import DistrictCreate from './scenes/district/create';
import DistrictList from './scenes/district/list';
import DistrictUpdate from './scenes/district/update';
import { useParams } from "react-router-dom";
import HotelList from './scenes/hotels/list';
import HotelCreate from './scenes/hotels/create';
import HotelUpdate from './scenes/hotels/update';
import TourCreate from './scenes/tours/create';
import TourList from './scenes/tours/list';
import TourUpdate from './scenes/tours/update';
import VehicleCreate from './scenes/tours/createVehicle';
import VehicleList from './scenes/tours/listVehicle';
import PlanList from './scenes/tours/listPlan';
import PlanCreate from './scenes/tours/createPlan';
import TouristSpotList from './scenes/touristspot/list';
import TouristSpotCreate from './scenes/touristspot/create';
import SpotUpdate from './scenes/touristspot/update';
import ResortCreate from './scenes/resort/create';
import ResortList from './scenes/resort/list';
import ResortUpdate from './scenes/resort/update';
import RestaurantList from './scenes/restaurant/list';
import RestaurantCreate from './scenes/restaurant/create';
import RestaurantUpdate from './scenes/restaurant/update';
import RoomList from './scenes/hotels/listRoom';
import RoomCreate from './scenes/hotels/createRoom';
import Login from './scenes/login/login';
import RoomListByResort from './scenes/resort/listRoom';
import RoomCreateByResort from './scenes/resort/createRoom';
import FeedbackList from './scenes/feedback/list';

import { UserProvider } from './store/context';
import reducer from './store/reducer'
import INIT_STATE from './store/initState';
import { useEffect } from 'react';


function App() {
  const localState = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")):INIT_STATE;
  const [theme, colorMode] = useMode();
  const [state,dispatch] = useReducer(reducer,localState);

  // useEffect(() => {
  //   // Kiểm tra xem có token trong localStorage hay không
  //   const token = localStorage.getItem("token");
    
  //   if (!token) {
  //     <Navigate to="/" />;
  //   } 
  // }, []);


  const styles = {
    backgroundImage:"url(https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921)",
    width:"100%",
    height:"100%",
    position:"fixed",
    top:0,
    left:0,
    backgroundColor:"#000000",
    opacity:0.8,
    zIndex:100,
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
    display: state.isLoading?"block":"none"
  }

  return (
    <UserProvider value={{state,dispatch}}>
      <div id='loading' style={styles}></div>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
              <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />

                <Route path="/districtList" element={<DistrictList />} />
                <Route path="/districtCreate" element={<DistrictCreate />} />
                <Route path="/districtUpdate/:id" element={<DistrictUpdate />} />

                <Route path="/hotelList" element={<HotelList />} />
                <Route path="/hotelCreate" element={<HotelCreate />} />
                <Route path="/HotelUpdate/:id" element={<HotelUpdate />} />

                <Route path="/TourList" element={<TourList />} />
                <Route path="/TourCreate" element={<TourCreate />} />
                <Route path="/PlanList/:hotelId" element={<PlanList />} />
                <Route path="/PlanCreate/:hotelId" element={<PlanCreate />} />
                <Route path="/TourUpdate/:id" element={<TourUpdate />} />
                <Route path="/VehicleList/:hotelId" element={<VehicleList />} />
                <Route path="/VehicleCreate/:hotelId" element={<VehicleCreate />} />

                <Route path="/TouristSpotList" element={<TouristSpotList />} />
                <Route path="/TouristSpotCreate" element={<TouristSpotCreate />} />
                <Route path="/SpotUpdate/:id" element={<SpotUpdate />} />

                <Route path="/ResortList" element={<ResortList />} />
                <Route path="/ResortCreate" element={<ResortCreate />} />
                <Route path="/ResortUpdate/:id" element={<ResortUpdate />} />

                <Route path="/RestaurantList" element={<RestaurantList />} />
                <Route path="/RestaurantCreate" element={<RestaurantCreate />} />
                <Route path="/RestaurantUpdate/:id" element={<RestaurantUpdate />} />

                <Route path="/RoomList/:hotelId" element={<RoomList />} />
                <Route path="/RoomCreate/:hotelId" element={<RoomCreate />} />

                <Route path="/RoomListByResort/:hotelId" element={<RoomListByResort />} />
                <Route path="/RoomCreateByResort/:hotelId" element={<RoomCreateByResort />} />

                <Route path="/FeedbackList" element={<FeedbackList />} />

                {/* <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            
      </ThemeProvider>
    </ColorModeContext.Provider>
    </UserProvider>
  );
}


export default App;

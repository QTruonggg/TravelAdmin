import React from 'react';
import { Box } from "@mui/material";
import Team from "./scenes/team";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Topbar setIsSidebar={setIsSidebar} />
          <main className="content" style={{ display: "flex" }}>
            {isSidebar && <Sidebar isSidebar={isSidebar} />}
            <Box flexGrow={1}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />

                <Route path="/districtList" element={<DistrictList />} />
                <Route path="/districtCreate" element={<DistrictCreate />} />
                <Route path="/districtUpdate/:id" element={<DistrictUpdate />} />

                <Route path="/hotelList" element={<HotelList />} />
                <Route path="/hotelCreate" element={<HotelCreate />} />
                {/* <Route path="/districtUpdate/:id" element={<DistrictUpdate />} /> */}

                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;

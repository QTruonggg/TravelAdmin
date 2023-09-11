import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import UserContext from '../../store/context';
// import api from '../../services/api';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const {state,dispatch} = useContext(UserContext);
  const logout =()=>{ 
    const u = null;
    // dispatch({type:"UPDATE_USER",payload:u});
    // state.userlogin = u;
    // setTimeout(()=>{dispatch({type:"HIDE_LOADING"})},1000);
    // localStorage.setItem("state",JSON.stringify(state));
    // api.defaults.headers.common["Authorization"] = `Bearer ${null}`;
}

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}


            {/* {(state.userlogin!=null)?(
                <div>
                

                <NavLink to="/" className=" d-flex align-items-center gap-1">
                  <button type="button" onClick={logout} className="btn btn-primary" style={{borderRadius:8, margin:'0 20px'}}> Logout </button>
                </NavLink>
                
                
              </div>

              ):(
                <IconButton>
                <NavLink to ="/">
                <button type="button" style={{borderRadius:8, backgroundColor:"pink"}} >Login</button> </NavLink>
              
              </IconButton>
              )
            } */}

            
      </Box>
    </Box>
  );
};

export default Topbar; 

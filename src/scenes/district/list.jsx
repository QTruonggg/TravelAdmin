import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";


const DistrictList = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axiosInstance("District", "GET")
      .then((response) => {
        setDistricts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
    return ( 
        <div className="container">
            <Box m="20px">
        <Header
      title="CONTACTS"
      subtitle="List of Contacts for Future Reference"
    />
          <Link to={"/districtCreate"} style={{ margin: "24px 0" }}>
            <button className="btn btn-success">
              Create District
            </button>
          </Link>

          <table className="table" style={{marginTop:'24px'}}>
            <thead>
              <th style={{width:'10%', padding:'12px'}}>STT</th>
              <th style={{width:'25%', padding:'12px'}}>Name</th>
              <th style={{width:'35%', padding:'12px'}}>Description</th>
              <th style={{width:'10%', padding:'12px'}}>Status</th>
              <th style={{width:'10%', textAlign:'center', padding:'12px'}}>Act</th>
            </thead>
            <tbody>
              {districts.map((district, index) => (
                <tr key={index}>
                  <td style={{padding:'12px'}}>{index + 1}</td>
                  <td style={{padding:'12px'}}>{district.name}</td>
                  <td className="descr" style={{padding:'12px'}}>{district.description}</td>
                  <td style={{padding:'12px'}}>{district.status}</td>

                  <td style={{textAlign:'right', padding:'8px'}}>
                      <Link to={`/districtUpdate/${district.id}`} style={{marginRight:'16px'}}>
                      <button style={{}} className="btn bg-success">
                          <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i>
                      </button> 
                      </Link>
                      <button className="btn bg-danger">
                          <i class="fa-solid fa-trash-can" style={{fontSize:'20px'}}></i>
                      </button>
                  </td>
                </tr>
              ))}
                
                  
            </tbody>
          </table>

      </Box>
        </div>
     );
}
 
export default DistrictList;
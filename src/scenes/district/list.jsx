import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";


const DistrictList = () => {
  const [districts, setDistricts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const displayedDistricts = districts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(districts.length / itemsPerPage);
  
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


  const handleDelete = (id) => {
    axiosInstance(`ManageDistrict/${id}`, "DELETE")
      .then(() => {
        setDistricts((prevDistricts) => prevDistricts.filter(district => district.id !== id));
        console.log("xóa thành công");
      })
      .catch((error) => {
        console.error("Error deleting district:", error);
      });
  };


    return ( 
        <div className="container">
          <Box m="20px">
            <Header
            title="List District"
            subtitle="List of District"
            />
            <Link to={"/districtCreate"} style={{ margin: "24px 0" }}>
              <button className="btn btn-success">
                Create District
              </button>
            </Link>

            <table className="table" style={{marginTop:'24px'}}>
              <thead>
                <th style={{width:'5%', padding:'12px'}}>STT</th>
                <th style={{width:'15%', padding:'12px'}}>Name</th>
                <th style={{width:'25%', padding:'12px'}}>Image</th>
                <th style={{width:'30%', padding:'12px'}}>Description</th>
                <th style={{width:'5%', padding:'12px'}}>Status</th>
                <th style={{width:'10%', textAlign:'center', padding:'12px'}}>Action</th>
              </thead>
              <tbody>
              {displayedDistricts.map((district, index) => (
                  <tr key={index}>
                    <td style={{padding:'12px'}}>{startIndex + index + 1}</td>
                    <td style={{padding:'12px', fontWeight:'bold', fontSize:'16px'}}>{district.name}</td>
                    <td style={{padding:'12px'}}>
                      <img src={district.images[0].imageUrl} alt="images" style={{width:'100%', height:'150px', objectFit:'cover'}}/>
                    </td>
                    <td className="descr" style={{padding:'12px'}}>{district.description}</td>
                    <td style={{padding:'12px'}}>{district.status}</td>

                    <td style={{textAlign:'right', padding:'8px'}}>
                        <Link to={`/districtUpdate/${district.id}`} style={{marginRight:'16px'}}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i> update
                        </button> 
                        </Link>
                        <button className="btn bg-danger" onClick={() => handleDelete(district.id)}>
                            <i class="fa-solid fa-trash-can" style={{fontSize:'20px'}}></i>
                        </button>
                    </td>
                  </tr>
                ))}
                  
                    
              </tbody>
            </table>

            <div style={{ marginTop: '16px', textAlign:'right' }}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{
                    margin: '0 4px',
                    padding: '4px 10px',
                    backgroundColor: currentPage === index + 1 ? 'blue' : 'gray',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius:'50%'
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>

          </Box>

        </div>
     );
}
 
export default DistrictList;
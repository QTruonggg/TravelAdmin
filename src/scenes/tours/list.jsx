import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";


const TourList = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebar, setIsSidebar] = useState(true);

  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };  
  useEffect(() => {
    axiosInstance("ManageTour", "GET")
      .then((response) => {
        setHotels(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleDelete = (id) => {
    axiosInstance(`ManageTour/${id}`, "DELETE")
      .then(() => {
        setHotels((prevHotels) => prevHotels.filter(hotel => hotel.id !== id));
        console.log("xóa thành công");
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
      });
  };
  const filteredDistricts = hotels.filter((district) =>
    district.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedHotels = filteredDistricts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredDistricts.length / itemsPerPage);


    return ( 
      <>
      <div className="app">
          <Topbar setIsSidebar={setIsSidebar} />
          <main className="content" style={{ display: "flex" }}>
            {isSidebar && <Sidebar isSidebar={isSidebar} />}
            <Box flexGrow={1}>
        <div className="container">
          <Box m="20px">
            <Header
            title="List Tours"
            subtitle="List of Tours"
            />
            <Link to={"/TourCreate"} style={{ margin: "24px 0" }}>
              <button className="btn btn-success">
                Create Tour
              </button>
            </Link>
            <br />
        <label htmlFor="">Search: </label>
            <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{marginLeft:'12px', marginTop: "24px", width:'30%', padding:'8px', borderRadius:'8px' }}
        />

            <table className="table" style={{marginTop:'24px'}}>
              <thead>
                <th style={{width:'5%', padding:'12px'}}>STT</th>
                <th style={{width:'15%', padding:'12px'}}>Name</th>
                <th style={{width:'15%', padding:'12px'}}>TravelDate</th>
                <th style={{width:'15%', padding:'12px'}}>TravelType</th>
                <th style={{width:'10%', padding:'12px'}}>Price</th>
                <th style={{width:'25%', padding:'12px'}}>Image</th>
                {/* <th style={{width:'30%', padding:'12px'}}>Description</th> */}
                <th style={{width:'5%', padding:'12px'}}>Status</th>
                <th style={{width:'10%', textAlign:'center', padding:'12px'}}>Action</th>
              </thead>
              <tbody>
              {displayedHotels.map((hotel, index) => (
                  <tr key={index}>
                    <td style={{padding:'16px'}}>{startIndex + index + 1}</td>
                    <td style={{padding:'16px', fontWeight:'bold', fontSize:'16px'}}>{hotel.name}</td>
                    <td style={{padding:'16px', fontWeight:'bold', fontSize:'16px'}}>{hotel.travelDate}</td>
                    <td style={{padding:'16px', fontWeight:'bold', fontSize:'16px'}}>{hotel.travelType}</td>
                    <td style={{padding:'16px', fontWeight:'bold', fontSize:'16px'}}>{hotel.price}</td>


                    <td style={{padding:'16px'}}>
                    {hotel.images[0] && hotel.images[0].imageUrl ? (
                      <img
                        src={hotel.images[0].imageUrl}
                        alt="images"
                        style={{width:'100%', height:'200px', objectFit:'cover'}}
                      />
                    ) : (
                      <img
                        src={""} 
                        alt="No image"
                        style={{width:'100%', height:'200px', objectFit:'cover'}}
                      />
                    )}                      </td>

                    {/* <td className="descr" style={{padding:'16px'}}>{hotel.description}</td> */}
                    <td style={{padding:'16px'}}>{hotel.status==1?"Active":"InActive"}</td>

                    <td style={{textAlign:'center', padding:'16px 8px'}}>
                        <Link to={`/TourUpdate/${hotel.id}`}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i> update
                        </button> 
                        </Link>
                        <div style={{height:'12px'}}> </div>
                        <Link to={`/PlanList/${hotel.id}`}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i> Plan
                        </button> 
                        </Link>
                        <div style={{height:'12px'}}> </div>
                        <Link to={`/VehicleList/${hotel.id}`}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i> Vehicle
                        </button> 
                        </Link>
                        {hotel.status === 1 && ( // Conditionally render the delete button
                          <button className="btn bg-danger" onClick={() => handleDelete(hotel.id)} style={{marginTop:'20px'}}>
                            <i class="fa-solid fa-trash-can" style={{ fontSize: '20px' }}></i>
                          </button>
                        )}
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
        </Box>
        </main>
        </div>
        </>
     );
}
 
export default TourList;
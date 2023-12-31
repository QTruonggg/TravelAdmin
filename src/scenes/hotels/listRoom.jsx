import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";


const RoomList = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebar, setIsSidebar] = useState(true);

  const { hotelId } = useParams(); // Lấy ID từ tham số URL
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const displayedHotels = hotels.slice(startIndex, endIndex);
  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  
  useEffect(() => {
    axiosInstance(`ManageRoom/GetRoomByHotelId/${hotelId}`, "GET")
      .then((response) => {
        setHotels(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleDelete = (id) => {
    axiosInstance(`ManageRoom/${id}`, "DELETE")
      .then(() => {
        setHotels((prevHotels) => prevHotels.filter(hotel => hotel.id !== id));
        console.log("xóa thành công");
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
      });
  };


    return ( 
      <>
      <div className="app">
          <Topbar setIsSidebar={setIsSidebar} />
          <main className="content" style={{ display: "flex", height:'90vh' }}>
            {isSidebar && <Sidebar isSidebar={isSidebar} />}
            <Box flexGrow={1}>
        <div className="container">
          <Box m="20px">
            <Header
            title="List Rooms"
            subtitle="List of Rooms"
            />
            <Link to={`/RoomCreate/${hotelId}`} style={{ margin: "24px 0" }}>
              <button className="btn btn-success">
                Create Room
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
              {displayedHotels.map((hotel, index) => (
                  <tr key={index}>
                    <td style={{padding:'12px', fontSize:'18px'}}>{startIndex + index + 1}</td>
                    <td style={{padding:'12px', fontWeight:'bold', fontSize:'20px'}}>{hotel.name}</td>
                    <td style={{padding:'12px'}}>
                      <img src={hotel.images[0].imageUrl} alt="images" style={{width:'100%', height:'180px', objectFit:'cover'}}/>
                    </td>
                    <td className="descr" style={{ padding:'12px', height: '212px', display: '-webkit-box', overflow: 'hidden',
                                              fontSize: '16px', WebkitLineClamp: '8',  WebkitBoxOrient: 'vertical',}}>{hotel.description}</td>
                    <td style={{padding:'12px'}}>{hotel.status==1?"Active":"InActive"}</td>

                    <td style={{textAlign:'center', padding:'32px 0'}}>
                        {/* <Link to={`/hotelUpdate/${hotel.id}`} style={{marginRight:'16px'}}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i> update
                        </button> 
                        </Link> */}
                        <button className="btn bg-danger" onClick={() => handleDelete(hotel.id)}>
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
        </Box>
        </main>
        </div>
        </>
     );
}
 
export default RoomList;
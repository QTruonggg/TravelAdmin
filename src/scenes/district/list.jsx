import React, { useContext,useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import UserContext from "../../store/context";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const DistrictList = () => {
  const {state,dispatch} = useContext(UserContext);
  const [districts, setDistricts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;
  const [isSidebar, setIsSidebar] = useState(true);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    dispatch({type:"SHOW_LOADING"});
    axiosInstance("ManageDistrict", "GET")
      .then((response) => {
        setDistricts(response.data);
        console.log(response.data);
        dispatch({type:"HIDE_LOADING"});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance(`ManageDistrict/${id}`, "DELETE")
      .then(() => {
        setDistricts((prevDistricts) => prevDistricts.filter((district) => district.id !== id));
        console.log("xóa thành công");
      })
      .catch((error) => {
        console.error("Error deleting district:", error);
      });
  };

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedDistricts = filteredDistricts.slice(startIndex, endIndex);
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
        <Header title="List District" subtitle="List of District" />

        <Link to={"/districtCreate"} style={{ margin: "24px 0" }}>
          <button className="btn btn-success">Create District</button>
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

        <table className="table" style={{ marginTop: "12px" }}>
          <thead>
            <th style={{ width: "5%", padding: "12px" }}>STT</th>
            <th style={{ width: "15%", padding: "12px" }}>Name</th>
            <th style={{ width: "25%", padding: "12px" }}>Image</th>
            <th style={{ width: "30%", padding: "12px" }}>Description</th>
            <th style={{ width: "5%", padding: "12px" }}>Status</th>
            <th style={{ width: "10%", textAlign: "center", padding: "12px" }}>Action</th>
          </thead>
          <tbody>
            {displayedDistricts.map((district, index) => (
              <tr key={index}>
                <td style={{ padding: "12px", fontSize: "18px" }}>{startIndex + index + 1}</td>
                <td style={{ padding: "12px", fontWeight: "bold", fontSize: "24px" }}>{district.name}</td>
                <td style={{ padding: "12px" }}>
                  {district.images[0] && district.images[0].imageUrl ? (
                    <img
                      src={district.images[0].imageUrl}
                      alt="images"
                      style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    />
                  ) : (
                    <img
                      src={""}
                      alt="No image"
                      style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td className="descr" style={{ padding:'12px', height: '210px', display: '-webkit-box', overflow: 'hidden',
                                              fontSize: '16px', WebkitLineClamp: '8',  WebkitBoxOrient: 'vertical',}}>
                  {district.description}
                </td>
                <td style={{ padding: "12px" }}>{district.status == 1 ? "Active" : "InActive"}</td>

                <td style={{ textAlign: "center", padding: "36px 0" }}>
                  <Link to={`/districtUpdate/${district.id}`} style={{ marginBottom: "16px" }}>
                    <button style={{}} className="btn bg-success">
                      <i class="fa-solid fa-pen-to-square" style={{ fontSize: "20px" }}></i> update
                    </button>
                  </Link>
                  {district.status === 1 && ( // Conditionally render the delete button
                          <button className="btn bg-danger" onClick={() => handleDelete(district.id)} style={{marginTop:'24px'}}>
                            <i class="fa-solid fa-trash-can" style={{ fontSize: '20px' }}></i>
                          </button>
                        )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "16px", textAlign: "right" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 4px",
                padding: "4px 10px",
                backgroundColor: currentPage === index + 1 ? "blue" : "gray",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "50%",
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
};

export default DistrictList;

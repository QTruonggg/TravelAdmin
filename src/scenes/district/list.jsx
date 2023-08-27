import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { async } from "q";
import { getDistrict } from "../../services/district.service";


const DistrictList = (props) => {
const [districts,setDistrict] = useState([]);
const getDistricts =async ()=>{
  const districts = await getDistrict();
  setDistrict(districts);
}
useEffect(()=>{
  getDistricts();
},[])





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
              <th style={{width:'10%', textAlign:'center', padding:'12px'}}>Action</th>
            </thead>
            <tbody>

            {
              districts.map((e, k) => (
                <tr key={k}>
                  <td style={{ padding: '12px' }}>{k + 1}</td>
                  <td style={{ padding: '12px' }}>{e.name}</td>
                  <td className="descr" style={{ padding: '12px' }}>
                    {e.description}
                  </td>
                  <td style={{ padding: '12px' }}>{e.status==1?"Active":"InActive"}</td>

                  <td style={{ textAlign: 'right', padding: '8px' }}>
                    <Link to={"/districtUpdate/" + e.id} style={{ marginRight: '16px' }}>
                      <button style={{}} className="btn bg-success">
                        <i className="fa-solid fa-pen-to-square" style={{ fontSize: '20px' }}></i>
                      </button>
                    </Link>

                  </td>
                </tr>
              ))
            }

                  
                
                  
            </tbody>
          </table>

      </Box>
        </div>
     );
}
 
export default DistrictList;
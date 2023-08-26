import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";


const DistrictList = () => {
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

            <tr >
                    <td style={{padding:'12px'}}>n+1</td>
                    <td style={{padding:'12px'}}>name</td>
                    <td className="descr" style={{padding:'12px'}}>Lasmdklsamf aksmflka sfklas fkl asklf kaskf kas fklsafasfkl klasfklasfk ksndkjasndasn laksn Lasmdklsamf aksmflka sfklas fkl asklf kaskf kas fklsafasfkl klasfklasfk</td>
                    <td style={{padding:'12px'}}>on</td>

                    <td style={{textAlign:'right', padding:'8px'}}>
                        <Link to={"/districtUpdate/"} style={{marginRight:'16px'}}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i>
                        </button> 
                        </Link>
                        <button className="btn bg-danger">
                            <i class="fa-solid fa-trash-can" style={{fontSize:'20px'}}></i>
                        </button>
                    </td>
                  </tr>
                  <tr >
                    <td style={{padding:'12px'}}>n+1</td>
                    <td style={{padding:'12px'}}>name</td>
                    <td className="descr" style={{padding:'12px'}}>Lasmdklsamf aksmflka sfklas fkl asklf kaskf kas fklsafasfkl klasfklasfk ksndkjasndasn laksn Lasmdklsamf aksmflka sfklas fkl asklf kaskf kas fklsafasfkl klasfklasfk</td>
                    <td style={{padding:'12px'}}>on</td>

                    <td style={{textAlign:'right', padding:'8px'}}>
                        <Link to={"/districtUpdate/"} style={{marginRight:'16px'}}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i>
                        </button> 
                        </Link>
                        <button className="btn bg-danger">
                            <i class="fa-solid fa-trash-can" style={{fontSize:'20px'}}></i>
                        </button>
                    </td>
                  </tr><tr >
                    <td style={{padding:'12px'}}>n+1</td>
                    <td style={{padding:'12px'}}>name</td>
                    <td className="descr" style={{padding:'12px'}}>Lasmdklsamf aksmflka sfklas fkl asklf kaskf kas fklsafasfkl klasfklasfk ksndkjasndasn laksn Lasmdklsamf aksmflka sfklas fkl asklf kaskf kas fklsafasfkl klasfklasfk</td>
                    <td style={{padding:'12px'}}>on</td>

                    <td style={{textAlign:'right', padding:'8px'}}>
                        <Link to={"/districtUpdate/"} style={{marginRight:'16px'}}>
                        <button style={{}} className="btn bg-success">
                            <i class="fa-solid fa-pen-to-square" style={{fontSize:'20px'}}></i>
                        </button> 
                        </Link>
                        <button className="btn bg-danger">
                            <i class="fa-solid fa-trash-can" style={{fontSize:'20px'}}></i>
                        </button>
                    </td>
                  </tr>
                
                  
            </tbody>
          </table>

      </Box>
        </div>
     );
}
 
export default DistrictList;
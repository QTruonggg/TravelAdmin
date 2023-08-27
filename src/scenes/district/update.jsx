import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {  Upload } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from "react-router-dom";


const DistrictUpdate = () => {
    const { id } = useParams(); 
    const isUpdating = !!id;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [selectedImages, setSelectedImages] = useState([]);
    const [initialValues, setInitialValues] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [fetchedData, setFetchedData] = useState({ name: "", description: "", status:"", images:[] });
    
    useEffect(() => {
        if (isUpdating) {
          axiosInstance(`District/${id}`, "GET")
            .then((response) => {
              const data = response.data;
              setFetchedData({
                name: data.name,
                description: data.description,
                status: data.status,
                images: data.images,
              });
              setInitialValues({
                name: data.name,
                description: data.description,
                status: data.status,
                images: data.images,
              });
              console.log(data);

            })
            .catch((error) => {
              console.error("Error fetching district data:", error);
            });
        }
      }, [id, isUpdating]);

  const handleUpdateFormDistrict = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
  
      const districtData = new FormData();
      districtData.append('name', values.name);
      districtData.append('description', values.description);
  
      for (let i = 0; i < selectedImages.length; i++) {
        districtData.append('images', selectedImages[i]);
      }
  
      console.log(districtData);
      await axiosInstance(`ManageDistrict/${id}`, 'PUT', districtData);
  
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error updating district data:', error);
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = ({ file }) => {
    setSelectedImages([...selectedImages, file]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <div className='container-lg mt-5'>
      <Box m="20px">
        <Header title="Update District" subtitle="Update a district" />

        <Formik
          onSubmit={handleUpdateFormDistrict}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={fetchedData.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={fetchedData.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <div>Status: {isUpdating ? fetchedData.status : values.status}</div>


              </Box>
              <div style={{marginTop:'24px'}}>
                <Upload
                    accept="image/*"
                    customRequest={handleImageUpload}
                    showUploadList={false}
                    multiple
                  >
                  <button className='bg-info' type='button' style={{borderRadius:'6px', padding:'6px'}}>Add Images</button>
                  </Upload>
                  {selectedImages.length >= 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{display:'flex', flexWrap:'wrap'}}>
                        {selectedImages.map((image, index) => (
                          <div key={index} style={{position:'relative', marginRight:'10px', marginBottom:'10px'}}>
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Selected ${index}`}
                            style={{ width: '166px', height:'110px', objectFit:'cover'}}
                          />
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)} 
                            style={{position:'absolute', right:'0', borderRadius:'50%', border:'none'}}
                          >
                            X
                          </button>
                        </div>
                          
                        ))}
                        
                        <div style={{position:'relative', marginRight:'10px', marginBottom:'10px'}}>
                          <img
                            src={fetchedData.images.map((image)=>(image.imageUrl))}
                            alt=""
                            style={{ width: '166px', height:'110px', objectFit:'cover'}}
                          />
                          
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)} 
                            style={{position:'absolute', right:'0', borderRadius:'50%', border:'none'}}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
              </div>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update District'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  name: "",
  description: "",
  images: [],
};   

export default DistrictUpdate;
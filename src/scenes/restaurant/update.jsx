import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {  Upload } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from "react-router-dom";
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MenuItem } from "@mui/material";
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';


const RestaurantUpdate = () => {
  const { id } = useParams(); 
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [spotOptions, setSpotOptions] = useState(0);
  const [isSidebar, setIsSidebar] = useState(true);

  const [fetchedData, setFetchedData] = useState({spotId: 0, name: "",location: "",cuisineType: "",address: "",contactNumber: "",price: 0, description: "", images: [] });
  // Sử dụng fetchedData để đặt giá trị ban đầu cho initialValues
 const [initialValues, setInitialValues] = useState({
        name: fetchedData.name,
        location: fetchedData.location,
        cuisineType: fetchedData.cuisineType,
        address:fetchedData.address,
        contactNumber: fetchedData.contactNumber,
        price: fetchedData.price,
        description: fetchedData.description,
        images: fetchedData.images,
  });
 

  useEffect(async () => {
    if (id) {
     await axiosInstance(`ManageRestaurant/${id}`, "GET")
        .then((response) => {
          const data = response.data;
          setFetchedData({
            name: data.name,
            location: data.location,
            cuisineType: data.cuisineType,
            address:data.address,
            contactNumber: data.contactNumber,
            price: data.price,
            description: data.description,
            images: data.images,
          });
          setSpotOptions(data.spotId);

          console.log("111111111111", response.data);

          setInitialValues({
            name: data.name,
            location: data.location,
            cuisineType: data.cuisineType,
            address:data.address,
            contactNumber: data.contactNumber,
            price: data.price,
            description: data.description,
            images: data.images,
          })

          setSelectedImages(data.images);
          const updatedImageIds = data.images.map((image) => image.id ? image.id : null);
          setSelectedImageIds(updatedImageIds);

        })
        .catch((error) => {
          console.error("Error fetching district data:", error);
        });
    }
  }, [id]);

  const handleFormSubmitDistrict = async (values, { setSubmitting }) => {
    
    try {
      
      const hotelData = new FormData();
      hotelData.append("Id", id);
      hotelData.append("SpotId", spotOptions);
      hotelData.append("name", values.name || initialValues.name);
      hotelData.append("Location", values.location || initialValues.location);
      hotelData.append("CuisineType", values.cuisineType || initialValues.cuisineType);
      hotelData.append("Address", values.address || initialValues.address);
      hotelData.append("ContactNumber", values.contactNumber || initialValues.contactNumber);
      hotelData.append("Price", values.price || initialValues.price);
      hotelData.append("description", values.description || initialValues.description);
      for (let i = 0; i < selectedImageIds.length; i++) {
        hotelData.append("images", selectedImageIds[i]);
      };

      for (let i = 0; i < selectedImages.length; i++) {
        hotelData.append("files", selectedImages[i]);
      };
     

      console.log("222222222222",hotelData);
      await axiosInstance(`ManageRestaurant/${id}`, 'PUT', hotelData);

      setSubmitting(false);
      alert("done!!!!!!!!!!!")
    } catch (error) {
      console.error('Error updating district data:', error);
      setSubmitting(false);
    }
  };
  
  const handleImageUpload = ({ file }) => {
    setSelectedImages([...selectedImages, file]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    const updatedImageIds = updatedImages.map((image) => image.id ? image.id : null);
    setSelectedImageIds(updatedImageIds);
  };

  return (
    <>
    <div className="app">
          <Topbar setIsSidebar={setIsSidebar} />
          <main className="content" style={{ display: "flex", height:'90vh' }}>
            {isSidebar && <Sidebar isSidebar={isSidebar} />}
            <Box flexGrow={1}>
    <div className='container-lg mt-5'>
      <Box m="20px">
        <Header title="Update District" subtitle="Update a district" />

        <Formik
          onSubmit={handleFormSubmitDistrict}
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
            isSubmitting,
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
                  value={values.name || initialValues.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location || initialValues.location}
                  name="location"
                  error={!!touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="CuisineType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cuisineType || initialValues.cuisineType}
                  name="cuisineType"
                  error={!!touched.cuisineType && !!errors.cuisineType}
                  helperText={touched.cuisineType && errors.cuisineType}
                  sx={{ gridColumn: "span 4" }}
                />
                
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address || initialValues.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="ContactNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contactNumber || initialValues.contactNumber}
                  name="contactNumber"
                  error={!!touched.contactNumber && !!errors.contactNumber}
                  helperText={touched.contactNumber && errors.contactNumber}
                  sx={{ gridColumn: "span 4" }}
                />
               
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price || initialValues.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description || initialValues.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <div style={{color:'black'}}>
                <CKEditor
                  editor={ ClassicEditor }
                  data={values.description} 
                   onReady={ editor => {
                  } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      handleChange({
                        target: { name: "description", value: data }
                      });
                  } }
                  onBlur={ ( event, editor ) => {
                  } }
                  onFocus={ ( event, editor ) => {
                  } }
                />
              </div>
              <div style={{marginTop:'24px'}}>
                <Upload
                    accept="image/*"
                    customRequest={handleImageUpload}
                    showUploadList={false}
                    multiple
                >
                  <button className='bg-info' type='button' style={{borderRadius:'6px', padding:'6px'}}>Add Images</button>
                </Upload>
                {selectedImages.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                      {selectedImages.map((image, index) => (
                        <div key={index} style={{position:'relative', marginRight:'10px', marginBottom:'10px'}}>
                          <img
                            src={image.imageUrl?image.imageUrl:URL.createObjectURL(image)}
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
    </Box>
    </main>
        </div>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string(),
  // Rating: yup.string(),
  // location: yup.string(),
  // address: yup.string(),
  // ContactNumber: yup.string(),
  // Price: yup.string(),
  description: yup.string(),
});

export default RestaurantUpdate;

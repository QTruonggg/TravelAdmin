import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {  Upload } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";


const RoomCreate = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImages, setSelectedImages] = useState([]);
  const { hotelId } = useParams(); // Lấy ID từ tham số URL

  const [spotOptions, setSpotOptions] = useState([]);

  const handleFormSubmitHotel = async (values, { setSubmitting,resetForm }) => {
    try {
      console.log(values);
      const hotelData = new FormData();
      hotelData.append("HotelId", hotelId);
      hotelData.append("name", values.name);
      hotelData.append("Slot", values.Slot);
      hotelData.append("Sale", values.Sale);
      hotelData.append("Price", values.Price);
      hotelData.append("description", values.description);

      
      for (let i = 0; i < selectedImages.length; i++) {
        hotelData.append("images", selectedImages[i]);
      }
  
      console.log(hotelData);
      await axiosInstance(`ManageRoom/`, 'POST', hotelData);
      alert("Ok")
      
      setSubmitting(false);
      setSelectedImages([]); 
      resetForm(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };
  useEffect(() => {
    // Gọi API hoặc xử lý dữ liệu để lấy danh sách SpotId
    const fetchSpotOptions = async () => {
      try {
        const response = await axiosInstance('ManageTouristSpot', 'GET'); // Ví dụ gọi API để lấy danh sách SpotId
        setSpotOptions(response.data); // Cập nhật danh sách SpotId vào state
      } catch (error) {
        console.error('Error fetching spot options:', error);
      }
    };

    fetchSpotOptions();
  }, []);

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
        <Header title="Add Hotel" subtitle="Create a new Hotel" />

        <Formik
          onSubmit={handleFormSubmitHotel}
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
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />              
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Sale"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ContactNumber}
                  name="Sale"
                  error={!!touched.Sale && !!errors.Sale}
                  helperText={touched.Sale && errors.Sale}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Price}
                  name="Price"
                  error={!!touched.Price && !!errors.Price}
                  helperText={touched.Price && errors.Price}
                  sx={{ gridColumn: "span 4" }}
                />
                                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Slot"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ContactNumber}
                  name="Slot"
                  error={!!touched.Slot && !!errors.Slot}
                  helperText={touched.Slot && errors.Slot}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
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
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      handleChange({
                        target: { name: "description", value: data }
                      });
                      console.log( { event, editor, data } );
                  } }
                  onBlur={ ( event, editor ) => {
                      console.log( 'Blur.', editor );
                  } }
                  onFocus={ ( event, editor ) => {
                      console.log( 'Focus.', editor );
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
                      </div>
                    </div>
                  )}
              </div>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create Hotel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  Slot: yup.string().required("required"),
  Sale: yup.string().required("required"),
  Price: yup.number().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  name: "",
  description: "",
  images: [],
};   

export default RoomCreate;
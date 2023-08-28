import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {  Upload } from 'antd';
import axiosInstance from '../../utils/axiosInstance';
import { CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const HotelCreate = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFormSubmitHotel = async (values, { setSubmitting,resetForm }) => {
    try {
      console.log(values);
      const hotelData = new FormData();
      hotelData.append("SpotId", values.SpotId);
      hotelData.append("name", values.name);
      hotelData.append("Rating", values.Rating);
      hotelData.append("Location", values.Location);
      hotelData.append("Address", values.Address);
      hotelData.append("ContactNumber", values.ContactNumber);
      hotelData.append("Price", values.Price);
      hotelData.append("description", values.description);

      
      for (let i = 0; i < selectedImages.length; i++) {
        hotelData.append("images", selectedImages[i]);
      }
  
      console.log(hotelData);
      await axiosInstance('ManageHotel', 'POST', hotelData);
      
      setSubmitting(false);
      setSelectedImages([]); 
      resetForm(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
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
                  label="SpotId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.SpotId}
                  name="SpotId"
                  error={!!touched.SpotId && !!errors.SpotId}
                  helperText={touched.SpotId && errors.SpotId}
                  sx={{ gridColumn: "span 1" }}
                />

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
                  label="Rating"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Rating}
                  name="Rating"
                  error={!!touched.Rating && !!errors.Rating}
                  helperText={touched.Rating && errors.Rating}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Location}
                  name="Location"
                  error={!!touched.Location && !!errors.Location}
                  helperText={touched.Location && errors.Location}
                  sx={{ gridColumn: "span 4" }}
                />
                
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address}
                  name="Address"
                  error={!!touched.Address && !!errors.Address}
                  helperText={touched.Address && errors.Address}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="ContactNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ContactNumber}
                  name="ContactNumber"
                  error={!!touched.ContactNumber && !!errors.ContactNumber}
                  helperText={touched.ContactNumber && errors.ContactNumber}
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
                  data="<p>Hello from CKEditor&nbsp;5!</p>"
                  onReady={ editor => {
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
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
  SpotId: yup.string().required("required"),
  name: yup.string().required("required"),
  Location: yup.string().required("required"),
  Rating: yup.string().required("required"),
  Address: yup.string().required("required"),
  ContactNumber: yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  Price: yup.number().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  name: "",
  description: "",
  images: [],
};   

export default HotelCreate;
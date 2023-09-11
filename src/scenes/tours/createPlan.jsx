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
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';


const PlanCreate = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImages, setSelectedImages] = useState([]);
  const { hotelId } = useParams(); // Lấy ID từ tham số URL

  const [spotOptions, setSpotOptions] = useState([]);

  const handleFormSubmitHotel = async (values, { setSubmitting,resetForm }) => {
    try {
      console.log(values);
      const hotelData = new FormData();
      hotelData.append("TourId", hotelId);
      hotelData.append("Title", values.title);
      hotelData.append("description", values.description);

      console.log(hotelData);
      await axiosInstance(`TravelPlan`, 'POST', hotelData);
      alert("Ok")
      
      setSubmitting(false);
      setSelectedImages([]); 
      resetForm(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
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
        <Header title="Add Plan for tour" subtitle="Create a new Hotel" />

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
                  label="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 2" }}
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
              
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create Plan
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  title: "",
  description: "",
};   

export default PlanCreate;
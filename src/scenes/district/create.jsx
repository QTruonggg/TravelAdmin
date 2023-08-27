import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {  Upload } from 'antd';
import axiosInstance from '../../utils/axiosInstance';

const DistrictCreate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFormSubmitDistrict = async (values, { setSubmitting }) => {
    try {
      // Step 1: Tạo đối tượng dữ liệu cho District
      const districtData = {
        name: values.name,
        description: values.description,
      };
  
      // Step 2: Gửi dữ liệu District lên API và lấy ID của District
      const response = await axiosInstance('ManageDistrict', 'POST', districtData);
      const districtId = response.data.id;
  
      // Step 3: Upload từng ảnh đã chọn với ID của District
      for (const image of selectedImages) {
        const formData = new FormData();
        formData.append('file', image);
  
        const uploadResponse = await axiosInstance(`Upload/image/${districtId}`, 'POST', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image upload response:', uploadResponse.data);
      }
  
      setSubmitting(false);
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
        <Header title="Add District" subtitle="Create a new district" />

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
                  Create District
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

export default DistrictCreate;
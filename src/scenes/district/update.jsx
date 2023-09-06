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

const DistrictUpdate = () => {
  const { id } = useParams(); 
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);


 

  const [fetchedData, setFetchedData] = useState({ name: "",location:"", description: "", images: [] });
  // Sử dụng fetchedData để đặt giá trị ban đầu cho initialValues
 const [initialValues, setInitialValues] = useState({
    name: fetchedData.name,
    location:fetchedData.location,
    description: fetchedData.description,
    images: fetchedData.images,
  });

  useEffect(() => {
    if (id) {
      axiosInstance(`District/${id}`, "GET")
        .then((response) => {
          const data = response.data;
          setFetchedData({
            name: data.name,
            location:data.location,
            description: data.description,
            images: data.images,
          });
          setInitialValues({
            name: data.name,
            location:data.location,
            description: data.description,
            images: data.images,
          });
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
      const districtData = new FormData();
      districtData.append("name", values.name);
      districtData.append("Location", values.location);
      districtData.append("description", values.description);
      for (let i = 0; i < selectedImageIds.length; i++) {
        districtData.append("images", selectedImageIds[i]);
      };
      console.log(selectedImageIds);

      for (let i = 0; i < selectedImages.length; i++) {
        districtData.append("files", selectedImages[i]);
      };
     

      console.log(selectedImages);
      await axiosInstance(`ManageDistrict/${id}`, 'PUT', districtData);

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
  console.log("iddddddđ",selectedImageIds);

  return (
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
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string(),
  location: yup.string(),
  description: yup.string()
});

export default DistrictUpdate;

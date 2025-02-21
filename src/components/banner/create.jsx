"use client";
import React, { Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Autocomplete,
  Avatar,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { privateRequest } from "@/config/axios.config";
import { errorHandler, responseCheck } from "@/utils/helper";
import { Toastify } from "@/components/toastify";
import InfoBox from "@/components/dynamicRoute/infoNav";
 
// Updated validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"), 
});

const ProjectCreatePostForm = () => {
  const [category, setCategory] = React.useState([]);
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      short_des: "",
      description: "", 
      thumbnail_image: null, 
      page_name:""
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.short_des);
      formData.append("button_text", values.description); 
      formData.append("banner_name", values.banner_name); 
      formData.append("banner_name", values.page_name); 
      formData.append("image", values.thumbnail_image);
      // values.multiple_images.forEach((file) => formData.append("multiple_images", file));
    
      try {
        const response = await privateRequest.post("/banner", formData);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        errorHandler(error);
      }
    },
  });

 

  return (
    <Suspense fallback={<CircularProgress />}>
    <Box>
      <InfoBox page="Create Blog" href="/blog/blog" hrefName="View Blog" />
      <Box sx={{ mx: "auto", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          
        <FormControl
        fullWidth
        error={formik.touched.page_name && Boolean(formik.errors.page_name)}
        sx={{ marginBottom: 2 }}
      >
        <InputLabel id="page_name-label">Choose an page name</InputLabel>
        <Select
          labelId="page_name-label"
          id="page_name"
          name="page_name"
          value={formik.values.page_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="home">HOME</MenuItem>
          <MenuItem value="service">SERVICE</MenuItem>
          <MenuItem value="about">ABOUT</MenuItem>
          <MenuItem value="blog">BLOG</MenuItem>
          <MenuItem value="contact">CONTACT</MenuItem>
          <MenuItem value="portfolio">PORTFOLIO</MenuItem>
        </Select>
        {formik.touched.page_name && formik.errors.page_name && (
          <FormHelperText>{formik.errors.page_name}</FormHelperText>
        )}
      </FormControl>  
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="short_des"
            name="short_des"
            label="Content"
          
            value={formik.values.short_des}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.short_des && Boolean(formik.errors.short_des)}
            helperText={formik.touched.short_des && formik.errors.short_des}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Button Text"
          
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            sx={{ mb: 2 }}
          />
 
          {formik.touched.description && formik.errors.description && (
            <Typography color="error" sx={{ mt: 1 }}>
              {formik.errors.description}
            </Typography>
          )}

         

          <ProfilePicUpload formik={formik} fieldName="thumbnail_image" label="Thumbnail Image" />
        
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
    </Suspense>
  );
};

export default ProjectCreatePostForm;

const ProfilePicUpload = ({ formik, fieldName, label }) => {
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue(fieldName, file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
      <Typography>{label}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <label htmlFor={`${fieldName}-upload`} style={{ cursor: "pointer" }}>
          <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={imagePreview} alt={label} />
          <input type="file" hidden onChange={handleFileChange} accept="image/*" id={`${fieldName}-upload`} />
        </label>
      </Box>
    </Box>
  );
};

const FileUpload = ({ formik, fieldName, label, multiple }) => (
  <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
    <Typography>{label}</Typography>
    <input
      type="file"
      multiple={multiple}
      onChange={(event) => formik.setFieldValue(fieldName, Array.from(event.target.files))}
      accept="image/*"
      style={{ display: "block", marginTop: "8px" }}
    />
  </Box>
);

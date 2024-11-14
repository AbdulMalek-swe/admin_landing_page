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
  short_des: Yup.string().required("Short description is required"),
  description: Yup.string().required("Description is required"), 
  thumbnail_image: Yup.mixed().required("Thumbnail image is required"),
  multiple_images: Yup.array().of(Yup.mixed()).required("At least one image is required"), 
});

const CreatePostForm = () => {
  const [category, setCategory] = React.useState([]);
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      short_des: "",
      description: "", 
      thumbnail_image: null,
      multiple_images: [],
     
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("short_des", values.short_des);
      formData.append("description", values.description); 
      formData.append("thumbnail_image", values.thumbnail_image);
      values.multiple_images.forEach((file) => formData.append("multiple_images", file));
    
      try {
        const response = await privateRequest.post("admin/project", formData);
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
    <Box>
      <InfoBox page="Create Blog" href="/blog/blog" hrefName="View Blog" />
      <Box sx={{ mx: "auto", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          

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
            label="Short Description"
            multiline
            minRows={3}
            value={formik.values.short_des}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.short_des && Boolean(formik.errors.short_des)}
            helperText={formik.touched.short_des && formik.errors.short_des}
            sx={{ mb: 2 }}
          />

          <Typography variant="body1" sx={{ mb: 1 }}>
            Description
          </Typography>
          <ReactQuill
            theme="snow"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue("description", value)}
            onBlur={() => formik.setFieldTouched("description", true)}
          />
          {formik.touched.description && formik.errors.description && (
            <Typography color="error" sx={{ mt: 1 }}>
              {formik.errors.description}
            </Typography>
          )}

         

          <ProfilePicUpload formik={formik} fieldName="thumbnail_image" label="Thumbnail Image" />
          <FileUpload formik={formik} fieldName="multiple_images" label="Upload Multiple Images" multiple />

          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePostForm;

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

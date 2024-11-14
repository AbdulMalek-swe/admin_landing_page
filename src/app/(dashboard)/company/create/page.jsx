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
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { privateRequest, publicRequest } from "@/config/axios.config";
import { errorHandler, responseCheck } from "@/utils/helper";
import { Toastify } from "@/components/toastify";
import InfoBox from "@/components/dynamicRoute/infoNav";
// validate schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.mixed().required("Image is required"),
});

const CreatePostForm = () => {
  const [category, setCategory] = React.useState([]);
  // submit form using formik
  const formik = useFormik({
    initialValues: {
      title: "",

      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // create form data and append it to the request body  (Note: replace '/blog' with your API endpoint)  // this assumes you have a '/blog' endpoint for creating a new blog post
      const formData = new FormData();
      formData.append("title", values.title);

      formData.append("image", values.image);

      try {
        const response = await privateRequest.post("admin/company", formData);
        console.log(response);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
        }
      } catch (error) {
        errorHandler(error);
      }
    },
  });

  return (
    <Box>
      <InfoBox
        page="Create Company"
        href="/company/company"
        hrefName="View Company"
      />
      <Box sx={{ mx: "auto", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* title  */}
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

          <ProfilePicUpload formik={formik} />
          {formik.touched.image && formik.errors.image && (
            <Typography color="error">{formik.errors.image}</Typography>
          )}

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePostForm;

const ProfilePicUpload = ({ formik }) => {
  const [imagePreview, setImagePreview] = React.useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <Avatar
            sx={{ width: 120, height: 120, mb: 2 }}
            src={imagePreview}
            alt="Profile Pic"
            name="profile"
          />
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
            name="profile"
            id="file-upload"
          />
        </label>

        {formik.errors.image && formik.touched.image && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {formik.errors.image}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

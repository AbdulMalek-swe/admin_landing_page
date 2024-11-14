"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
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
//  validate schema is already defined above. Here's how you might use it in your form:
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  short_des: Yup.string().required("Short description is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().required("Image is required"),
  category: Yup.object().nullable().required("category selection is required"),
});

const EditPostForm = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const [category, setCategory] = React.useState({});
  const [singleCategory, setSingleCategory] = React.useState({});
  // fetch single blog
  const fetchBlog = useCallback(async () => {
    try {
      const response = await publicRequest.get(`company/${params?.slug}`);
      if (responseCheck(response)) {
        setBlog(response.data?.data);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [params?.slug]);
  useEffect(() => {
    fetchBlog();
  }, []);
  // submit blog edited form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blog?.title || "",
      short_des: blog?.short_des || "",
      content: blog?.content || "",
      image: blog?.image || null,
      category: { ...singleCategory, label: singleCategory?.name || "" },
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title); 
      formData.append("image", values.image); 
      formData.append("_method", "PUT");
      try {
        const response = await privateRequest.post(
          `/company/${params?.slug}`,
          formData
        );
        console.log(response);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      // resetForm()
    },
  });
   
  return (
    <Box>
      <InfoBox page="Edit Blog" href="/blog/blog" hrefName="View Blog" />
      <Box sx={{ p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* combobox for autcomplete component for category id */}
          
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
          <ProfilePicUpload blog={blog} formik={formik} />
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

export default EditPostForm;

const ProfilePicUpload = ({ formik, blog }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // console.log(event);
      formik.setFieldValue("image", file);
      // formik.setFieldValue("profilePic", file);
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
            src={
              imagePreview ||
              `${process.env.NEXT_PUBLIC_BASE_API}${blog?.image}`
            }
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

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
import { useRouter } from "next/navigation";
//  validate schema is already defined above. Here's how you might use it in your form:
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  short_des: Yup.string().required("Short description is required"),
  content: Yup.string().required("Content is required"),
  // image: Yup.mixed().required("Image is required"),
  category: Yup.object().nullable().required("category selection is required"),
});

const EditPostForm = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const [category, setCategory] = React.useState({});
  const [singleCategory, setSingleCategory] = React.useState({});
  const router = useRouter();
  // fetch single blog
  const fetchBlog = useCallback(async () => {
    try {
      const response = await privateRequest.get(`admin/blog/${params?.slug}`);
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
      formData.append("short_des", values.short_des);
      formData.append("content", values.content);
      formData.append("image", values.image);
      formData.append("category_id", values?.category?.category_id);
      formData.append("_method", "PUT");
      try {
        const response = await privateRequest.post(
          `admin/blog/${params?.slug}`,
          formData
        );
        console.log(response);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
          router.push(`/blog/blog`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      // resetForm()
      formik.resetForm();
    },
  });
  // fetch category data
  const fetchCategory = React.useCallback(async () => {
    try {
      const categoryId = blog?.category_id;
      const response = await privateRequest.get(`admin/category`);
      console.log(response, "this is categ ");
      if (responseCheck(response)) {
        const result = response?.data?.data?.data;
        const newValue = result.find(
          (item) => item?.category_id === categoryId
        );
        const data = result.map((item) => ({ ...item, label: item?.name }));
        console.log(result, "this i scategroy area");
        setCategory(data);
        setSingleCategory({ ...newValue, label: newValue?.name || "" });
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [blog]);
  React.useEffect(() => {
    fetchCategory();
  }, [blog]);
  return (
    <Box>
      <InfoBox page="Edit Blog" href="/blog/blog" hrefName="View Blog" />
      <Box sx={{ p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* combobox for autcomplete component for category id */}
          <Autocomplete
            disablePortal
            options={category}
            getOptionLabel={(option) => option.label || ""}
            sx={{ mb: 2 }}
            onChange={(event, value) => formik.setFieldValue("category", value)}
            value={formik.values.category}
            onBlur={() => formik.setFieldTouched("category", true)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category Name"
                // onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
            )}
          />
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
            Content
          </Typography>
          <ReactQuill
            theme="snow"
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
            onBlur={() => formik.setFieldTouched("content", true)}
          />
          {formik.touched.content && formik.errors.content && (
            <Typography color="error" sx={{ mt: 1 }}>
              {formik.errors.content}
            </Typography>
          )}

          {/* <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2, width: "100%", cursor: "pointer" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
          </Button> */}
          {/* {formik.touched.image && formik.errors.image && (
            <Typography color="error">{formik.errors.image}</Typography>
          )} */}
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

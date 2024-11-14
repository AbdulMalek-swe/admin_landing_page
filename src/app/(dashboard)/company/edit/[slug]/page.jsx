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
import "react-quill/dist/quill.snow.css";
import { privateRequest, publicRequest } from "@/config/axios.config";
import { errorHandler, responseCheck } from "@/utils/helper";
import { Toastify } from "@/components/toastify";
import InfoBox from "@/components/dynamicRoute/infoNav";
import { useRouter } from "next/navigation";
//  validate schema is already defined above. Here's how you might use it in your form:
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.mixed().required("Image is required"),
});

const EditPostForm = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const router = useRouter();
  // fetch single blog
  const fetchBlog = useCallback(async () => {
    try {
      const response = await privateRequest.get(
        `admin/company/${params?.slug}`
      );
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

      image: blog?.image || null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image);
      formData.append("_method", "PUT");
      try {
        const response = await privateRequest.post(
          `/admin/company/${params?.slug}`,
          formData
        );

        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
          router.push("/company/company");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      // resetForm()
    },
  });

  return (
    <Box>
      <InfoBox
        page="Edit Company"
        href="/company/company"
        hrefName="View Company"
      />
      <Box sx={{ p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Update Post
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

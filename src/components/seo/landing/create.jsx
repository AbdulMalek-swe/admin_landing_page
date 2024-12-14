"use client";
import React, { Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Toastify } from "@/components/toastify";
import { responseCheck } from "@/utils/helper";
import { privateRequest } from "@/config/axios.config";
import InfoBox from "@/components/dynamicRoute/infoNav";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  og_title: Yup.string().required("OG Title is required"),
  og_description: Yup.string().required("OG Description is required"),
  og_image: Yup.mixed().required("OG Image is required"),
  canonical_tags: Yup.string().required("Canonical Tags are required"),
  meta_robots: Yup.string().required("Meta Robots are required"),
  type: Yup.string().required("Type is required"), 
  page_name: Yup.string().required("Page Name is required"),
});

const SEOCreateForm = ({slug}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      og_title: "",
      og_description: "",
      og_image: null,
      canonical_tags: "",
      meta_robots: "",
      type: "", 
      page_name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("og_title", values.og_title);
      formData.append("og_description", values.og_description);
      formData.append("og_image", values.og_image);
      formData.append("canonical_tags", values.canonical_tags);
      formData.append("meta_robots", values.meta_robots);
      formData.append("type", "landing");
      //   formData.append("SEO_id", values.SEO_id);
      formData.append("page_name", values.page_name);

      try {
        const response = await privateRequest.post("seo", formData);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
        }
        console.log("Form submitted successfully:", values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  }); 
  return (
    <Suspense fallback={<CircularProgress />}>
      <Box
        sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}
      >
          <InfoBox
        page='Landing SEO Create'
        href="/SEO/landing/landing"
        hrefName="View Landing SEO"
      />
        <Typography variant="h4" align="center" gutterBottom>
          Create SEO For Landing page
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* Page Name */}
          <FormField
            formik={formik}
            fieldName="page_name"
            label="Page Name"
            type="text"
          />
          {/* Title */}
          <FormField
            formik={formik}
            fieldName="title"
            label="Title"
            type="text"
          />

          {/* Description */}
          <FormField
            formik={formik}
            fieldName="description"
            label="description"
            type="text"
            multiline
            rows={3}
          />

          {/* OG Title */}
          <FormField
            formik={formik}
            fieldName="og_title"
            label="OG Title"
            type="text"
          />

          {/* OG Description */}
          <FormField
            formik={formik}
            fieldName="og_description"
            label="OG Description"
            type="text"
            multiline
            rows={3}
          />

          {/* Canonical Tags */}
          <FormField
            formik={formik}
            fieldName="canonical_tags"
            label="Canonical Tags"
            type="text"
          />

          {/* Meta Robots */}
          <FormField
            formik={formik}
            fieldName="meta_robots"
            label="Meta Robots"
            type="text"
          />

          {/* OG Image */}
          <FileUpload formik={formik} fieldName="og_image" label="OG Image" />
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
    </Suspense>
  );
};

export default SEOCreateForm;

// Form Field Component
const FormField = ({ formik, fieldName, label, type, multiline, rows }) => (
  <Box sx={{ mb: 3 }}>
    <TextField
      fullWidth
      id={fieldName}
      name={fieldName}
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      value={formik.values[fieldName]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
    />
  </Box>
);

// File Upload Component
const FileUpload = ({ formik, fieldName, label }) => {
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue(fieldName, file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>{label}</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <label htmlFor={`${fieldName}-upload`} style={{ cursor: "pointer" }}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 1 }}
            src={imagePreview}
            alt={label}
          />
          <input
            type="file"
            hidden
            id={`${fieldName}-upload`}
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      </Box>
    </Box>
  );
};

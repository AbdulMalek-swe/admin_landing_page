"use client";
import React, { Suspense, useCallback, useEffect } from "react";
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
import { errorHandler, responseCheck } from "@/utils/helper";
import { privateRequest } from "@/config/axios.config";
import InfoBox from "@/components/dynamicRoute/infoNav";

 

const SEOCreateForm = ({ formik }) => {
   
  return (
    <Suspense fallback={<CircularProgress />}>
      <Box sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
        
        <Typography variant="h4" align="center" gutterBottom>
          Edit Blog SEO For Landing page
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* Page Name */}
          
          {/* Title */}
          <FormField
            formik={formik}
            fieldName="seo_title"
            label="SE0Title"
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
      // value={formik.values.title}
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

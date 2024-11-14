"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
  MenuItem,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { errorHandler, responseCheck } from "@/utils/helper";
import { privateRequest, publicRequest } from "@/config/axios.config";
import { Toastify } from "@/components/toastify";
import InfoBox from "@/components/dynamicRoute/infoNav";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Category name should be at least 10 characters")
    .required("name is required"),
  // category: Yup.string().required('Category is required'),
});

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await privateRequest.post("admin/category", values);
        console.log(response);
        if (responseCheck(response)) {
          setLoading(false);
          Toastify.Success(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
      formik.resetForm();
    },
  });

  return (
    <Container>
      <InfoBox
        page="Category Create"
        href="/category/category"
        hrefName="View Category"
      />

      <Paper
        elevation={4}
        sx={{
          marginTop: 2,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          // backgroundColor: '#f9f9f9',
        }}
      >
        <HelpOutlineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography component="h1" variant="h5" color="primary" gutterBottom>
          Category Form
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mb: 2 }}
        >
          Add a new frequently asked name to the system. Please ensure all
          details are correct.
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category Name"
            variant="outlined"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1 }}
          >
            Submit Category
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CategoryForm;

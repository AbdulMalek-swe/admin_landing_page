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
import { privateRequest } from "@/config/axios.config";
import { errorHandler, responseCheck } from "@/utils/helper";
import { Toastify } from "@/components/toastify";
import InfoBox from "../dynamicRoute/infoNav";
import { useRouter } from "next/navigation";
import SEOCreateForm from "../seo/blog/create";
// validate schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  short_des: Yup.string().required("Short description is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().required("Image is required"),
  // category_id: Yup.number().required("Category is required"),
  category: Yup.object().nullable().required("category selection is required"),
   seo_title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    og_title: Yup.string().required("OG Title is required"),
    og_description: Yup.string().required("OG Description is required"),
    og_image: Yup.mixed().required("OG Image is required"),
    canonical_tags: Yup.string().required("Canonical Tags are required"),
    meta_robots: Yup.string().required("Meta Robots are required"),
});

const CreatePostForm = () => {
  const [category, setCategory] = React.useState([]);
  const router = useRouter();

  // submit form using formik
  const formik = useFormik({
    initialValues: {
      title: "",
      short_des: "",
      content: "",
      image: null,
      category: null,
      seo_title: "",
      description: "",
      og_title: "",
      og_description: "",
      og_image: null,
      canonical_tags: "",
      meta_robots: "",
      // type: "",
      // SEO_id: "",
      // page_name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      // create form data and append it to the request body  (Note: replace '/blog' with your API endpoint)  // this assumes you have a '/blog' endpoint for creating a new blog post
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("short_des", values.short_des);
      formData.append("content", values.content);
      formData.append("image", values.image);
      formData.append("category_id", values?.category?.category_id);

      try {
        const response = await privateRequest.post("admin/blog", formData);
         console.log(response);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
          // router.push("/blog/blog");
          // newSeoFunction()
          console.log("----------------->sdf");
          createSeoFunction({...values,blog_id:response.data.data.blog_id  });
        }
      } catch (error) {
        console.log(error);
         errorHandler(error);
      }
      // formik.resetForm();
    },
  });
  // make seo function here for SEO
    const createSeoFunction=async(values)=>{
      console.log(values,"weolcome to seo function");
      const formData = new FormData();
      formData.append("title", values.seo_title);
      formData.append("description", values.description);
      formData.append("og_title", values.og_title);
      formData.append("og_description", values.og_description);
      formData.append("og_image", values.og_image);
      formData.append("canonical_tags", values.canonical_tags);
      formData.append("meta_robots", values.meta_robots);
      formData.append("type", "blog");
      formData.append("blog_id", values?.blog_id);
         try {
              const response = await privateRequest.post("seo", formData);
              console.log(response,"welcome to  ---------------->");
              if (responseCheck(response)) {
                Toastify.Success(response.data.message);
              }
              console.log("Form submitted successfully:", values);
            } catch (error) {
              console.log(error);
              console.error("Error submitting form:", error);
            }
    }
  // fetch category data
  const fetchCategory = React.useCallback(async () => {
    try {
      const response = await privateRequest.get("admin/category");
      if (responseCheck(response)) {
        const result = response?.data?.data?.data;
        const data = result.map((item) => ({ ...item, label: item?.name }));
        setCategory(data);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, []);
  React.useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <Suspense fallback={<CircularProgress />}>
      <InfoBox page="Create Blog" href="/blog/blog" hrefName="View Blog" />
      <Box sx={{ mx: "auto", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
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
          <ProfilePicUpload formik={formik} />
          {formik.touched.image && formik.errors.image && (
            <Typography color="error">{formik.errors.image}</Typography>
          )}
          {/* START blog seo form component here  */}
             
            <SEOCreateForm formik={formik}/>
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
    <Box sx={{ maxWidth: 400, mx: "auto" ,mt:2 }}>
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

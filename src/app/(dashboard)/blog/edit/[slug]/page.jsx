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
import SEOCreateForm from "@/components/seo/blog/edit";
//  validate schema is already defined above. Here's how you might use it in your form:
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  short_des: Yup.string().required("Short description is required"),
  content: Yup.string().required("Content is required"),
  // image: Yup.mixed().required("Image is required"),
  // category: Yup.object().nullable().required("category selection is required"),
  seo_title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  og_title: Yup.string().required("OG Title is required"),
  og_description: Yup.string().required("OG Description is required"),
  // og_image: Yup.mixed().required("OG Image is required"),
  canonical_tags: Yup.string().required("Canonical Tags are required"),
  meta_robots: Yup.string().required("Meta Robots are required"),
  // type: Yup.string().required("Type is required"),
  // SEO_id: Yup.number().required("SEO ID is required").positive().integer(),
  // page_name: Yup.string().required("Page Name is required"),
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
  const [seoSingleData, setSingleBlogSeo] = React.useState({});
  // submit blog edited form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blog?.title || "",
      short_des: blog?.short_des || "",
      content: blog?.content || "",
      image:   null,
      category: { ...singleCategory, label: singleCategory?.name || "" },
      seo_title: seoSingleData?.title || "",
      description: seoSingleData?.description || "",
      og_title: "" || seoSingleData?.og_title,
      og_description: "" || seoSingleData?.og_description,
      og_image: null,
      canonical_tags: "" || seoSingleData?.canonical_tags,
      meta_robots: "" || seoSingleData?.meta_robots,
      type: "blog"  ,
      // SEO_id: "" || seoSingleData?.SEO_id,
      page_name: "" || seoSingleData?.page_name,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values,"------------>");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("short_des", values.short_des);
      formData.append("content", values.content);
      formData.append("image", values.image);
      formData.append("category_id", values?.category?.category_id);
      formData.append("_method", "PUT");
      console.log(values);
      try {
        const response = await privateRequest.post(
          `admin/blog/${params?.slug}`,
          formData
        );
        // console.log(response);
        if (responseCheck(response)) {
          Toastify.Success(response.data.message);
          editSeo(values);
          // router.push(`/blog/blog`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      // resetForm()
      // formik.resetForm();
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
        // console.log(result, "this i scategroy area");
        setCategory(data);
        setSingleCategory({ ...newValue, label: newValue?.name || "" });
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [blog]);

  React.useEffect(() => {
    fetchCategory();
    privateRequest.get("/seo").then((res) => {
      console.log(res?.data?.data);
      const data = res?.data?.data.map((item) => {
        return {
          ...item,
          id: item?.seo_id,
        };
      });
      const result = data.filter((item) => item?.type === "blog");
      // filter result usign blog id
      const blogId = params?.slug;
      const results = result.find((item) => item?.blog_id === blogId);
      console.log(results, "results---->", blogId);
      setSingleBlogSeo(results);
      // setMetaData(result);
      // setMetaData(result);
    });
  }, []);
  // create single blog seo area edit
  const editSeo = async (values) => {
    console.log("where is my values--================")
    const formData = new FormData();
    formData.append("title", values.seo_title);
    formData.append("description", values.description);
    formData.append("og_title", values.og_title);
    formData.append("og_description", values.og_description);
    formData.append("og_image", values.og_image);
    formData.append("canonical_tags", values.canonical_tags);
    formData.append("meta_robots", values.meta_robots);
    formData.append("type", "blog");
    formData.append("blog_id", params?.slug);
    //   formData.append("SEO_id", values.SEO_id);
    //   formData.append("page_name", values.page_name);
    formData.append("_method", "PUT");
    console.log(values);
    try {
      const response = await privateRequest.post(
        `seo/${seoSingleData?.seo_id}`,
        formData
      );
      if (responseCheck(response)) {
        Toastify.Success(response.data.message);
      }
      console.log("Form submitted successfully:", values);
    } catch (error) {
      console.error("Error submitting form:", error);
      errorHandler(error);
    }
  };
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

          <ProfilePicUpload blog={blog} formik={formik} />
          {/* seo edited area  */}
          <SEOCreateForm  formik={formik}/>
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

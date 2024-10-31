"use client"
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    short_des: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    console.log(formData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    //   bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Add New Entry
        </Typography>
        <form onSubmit={handleSubmit}>

          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            theme="snow"
            style={{ marginBottom: 20 }}
          />

          <TextField
            label="Short Description"
            name="short_des"
            variant="outlined"
            fullWidth
            value={formData.short_des}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default FormComponent;

"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Paper,
  MenuItem,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { errorHandler, responseCheck } from '@/utils/helper';
import { privateRequest, publicRequest } from '@/config/axios.config';
import { Toastify } from '@/components/toastify';
import InfoBox from '@/components/dynamicRoute/infoNav';
import { useRouter } from 'next/navigation';

// Validation schema with Yup
const validationSchema = Yup.object({
  question: Yup.string().min(10, 'Question should be at least 10 characters').required('Question is required'),
  answer: Yup.string().min(20, 'Answer should be at least 20 characters').required('Answer is required'),
  // category: Yup.string().required('Category is required'),
});

const FAQForm = ({ params }) => {
 const [loading,setLoading] = useState(false);
  const [faqs, setFaqs] = useState({});
  const router = useRouter()
//  fetch faq for single 
 const fetchFaqs = useCallback(async () => {
  try {
    
    const response = await publicRequest.get(`faq/${params?.slug}`);
    console.log(response,"--------------------->");
    setFaqs(response.data?.data );
  } catch (error) {
    errorHandler(error);
  } finally {
    setLoading(false);
  }
}, [params?.slug]);
useEffect(() => {
  fetchFaqs();
}, []);
console.log(faqs?.question);
  //  submit form area here start 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: faqs?.question || '',
      answer: faqs?.answer || '',
      // category: '',
    },
    validationSchema,
    // submit form 
    onSubmit: async(values) => {
      setLoading(true);
      try {
       
        const response = await privateRequest.put(`admin/faq/${params?.slug}`, values);
        console.log(response);
        if (responseCheck(response)) {
          setLoading(false);
          Toastify.Success(response?.data?.message);  
          router.push("/faq/faqs");
        }
      } catch (error) {
        console.log(error)
        errorHandler(error);
      }
      formik.resetForm();
      fetchFaqs();
    },
  });

  return (
    <Container  >
        <InfoBox page="Edit FAQ" href="/faq/faqs" hrefName="View FAQ" />
      <Paper
        elevation={4}
        sx={{
          marginTop: 2,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
          // backgroundColor: '#f9f9f9',
        }}
      >
        <HelpOutlineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography component="h1" variant="h5" color="primary" gutterBottom>
          FAQ Edit Form
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
          Add a new frequently asked question to the system. Please ensure all details are correct.
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            id="question"
            name="question"
            label="Question"
            variant="outlined"
            margin="normal"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.question && Boolean(formik.errors.question)}
            helperText={formik.touched.question && formik.errors.question}
          />
          <TextField
            fullWidth
            id="answer"
            name="answer"
            label="Answer"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={formik.values.answer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
          />
          {/* <TextField
            fullWidth
            select
            id="category"
            name="category"
            label="Category"
            variant="outlined"
            margin="normal"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="billing">Billing</MenuItem>
            <MenuItem value="technical">Technical</MenuItem>
            <MenuItem value="product">Product</MenuItem>
          </TextField> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1 }}
          >
            Submit FAQ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FAQForm;

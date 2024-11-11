"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Container } from "@mui/material";
import { publicRequest } from "@/config/axios.config";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },

  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 190,
  },
  {
    field: "message",
    headerName: "Message",
    type: "string",
    width: "auto",
  },
];

const rows = [
  {
    id: 1,
    Name: "John Doe",
    email: "john.doe@example.com",
    message: "Hello, this is John Doe. How can I help you?",
  },
  {
    id: 2,
    Name: "John Doe",
    email: "john.doe@example.com",
    message: "Hello, this is John Doe. How can I help you?",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {

    const [contact, setcontact] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    // fetch faqs 
    const fetchFaqs = React.useCallback(async () => {
      try {
        setLoading(false);  // show loading state
        const response = await publicRequest.get("contact");
        const result = response?.data?.data?.data;
        const data = result.map((item) => ({...item,  id: item.contact_id }));
        setcontact(data);
      } catch (error) {
        errorHandler(error);  
        setLoading(false);
      }
    }, []);
    React.useEffect(() => {
      fetchFaqs();
    }, []);
    // loading component 
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={contact}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          showCellVerticalBorder
        />
      </Paper>
    </Container>
  );
}

"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Container } from "@mui/material";
import { privateRequest, publicRequest } from "@/config/axios.config";
import InfoBox from "@/components/dynamicRoute/infoNav";
import Image from "next/image";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Toastify } from "@/components/toastify";
import { errorHandler, responseCheck } from "@/utils/helper";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [blog, setBlog] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // fetch faqs
  const fetchFaqs = React.useCallback(async () => {
    try {
      setLoading(false); // show loading state
      const response = await privateRequest.get("admin/contact");
      const result = response?.data?.data?.data;
      const data = result.map((item) => ({ ...item, id: item.contact_id }));
      console.log(data);
      setBlog(data);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  }, []);
  React.useEffect(() => {
    fetchFaqs();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phone",
      headerName: "Phone",
      type: "string",
      flex: 1,
    },

    {
      field: "message",
      headerName: "Description",
      type: "string",
      flex: 2,
    },
    {
      field: "conten",
      headerName: "Action",
      type: "string",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div style={{ wordBreak: "break-all" }}>
            <IconButton
              color="error"
              onClick={async () => {
                try {
                  const response = await privateRequest.delete(
                    `admin/contact/${params?.row?.contact_id}`
                  );
                  if (responseCheck(response)) {
                    fetchFaqs();
                    Toastify.Success(response?.data?.message);
                  }
                } catch (error) {
                  
                  Toastify.Error(error);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
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
    <Box>
      <InfoBox page="Contact" href="/dashboard" hrefName="View Dashboard" />
      <Paper sx={{ height: 400, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={blog}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
          showCellVerticalBorder
          width="100%"
        />
      </Paper>
    </Box>
  );
}

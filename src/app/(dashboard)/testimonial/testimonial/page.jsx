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
      const response = await publicRequest.get("testimonial");
      const result = response?.data?.data?.data;
      console.log(result, "result");
      const data = result.map((item) => ({ ...item, id: item.id }));
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
    { field: "name", headerName: "Title", flex: 1 },
    {
      field: "short_des",
      headerName: "Short Description",
      type: "string",
      flex: 1.5,
    },
    {
      field: "image",
      headerName: "Image",
      type: "string",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div style={{ wordBreak: "break-all" }}>
            <Image
              width={100}
              height={200}
              style={{
                objectFit: "cover",
                borderRadius: 5,
                cursor: "pointer",
                width: "100%",
                height: "50px",
              }}
              src={`${process.env.NEXT_PUBLIC_BASE_API}${params?.row?.image}`}
              alt="loading"
            />
          </div>
        );
      },
    },
    {
      field: "content",
      headerName: "Description",
      type: "string",
      flex: 2,
      renderCell: (params) => {
        return (
          <div
            style={{ wordBreak: "break-all" }}
            dangerouslySetInnerHTML={{ __html: params?.row?.content }}
          ></div>
        );
      },
    },
    {
      field: "conten",
      headerName: "Action",
      type: "string",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div style={{ wordBreak: "break-all" }}>
            <Link href={`/testimonial/edit/${params?.row?.id}`}>
              <IconButton color="primary" component="a">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              color="error"
              onClick={async () => {
                try {
                  const response = await privateRequest.delete(
                    `admin/testimonial/${params?.row?.id}`
                  );
                  if (responseCheck(response)) {
                    fetchFaqs();
                    Toastify.Success(response?.data?.message);
                  }
                } catch (error) {
                  console.log(error);
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
      <InfoBox page="Testimonial" href="/testimonial/create" hrefName="Create Testimonial" />
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

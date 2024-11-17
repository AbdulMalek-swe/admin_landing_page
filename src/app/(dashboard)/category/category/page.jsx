"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Container } from "@mui/material";
import { privateRequest  } from "@/config/axios.config";
import InfoBox from "@/components/dynamicRoute/infoNav";
import Image from "next/image";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Toastify } from "@/components/toastify";
import { responseCheck } from "@/utils/helper";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [category, setcategory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // fetch Category
  const fetchCategory = React.useCallback(async () => {
    try {
      setLoading(false); // show loading state
      const response = await privateRequest.get("category");
      const result = response?.data?.data?.data;
      console.log(result);
      const data = result.map((item) => ({ ...item, id: item?.category_id }));
      setcategory(data);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  }, []);
  React.useEffect(() => {
    fetchCategory();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Category Name", flex: 2 },
     
    {
      field: "conten",
      headerName: "Action",
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ wordBreak: "break-all" }}>
            <Link href={`/category/edit/${params?.row?.category_id}`}>
              <IconButton color="primary" component="a">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              color="error"
              onClick={async () => {
                try {
                  const response = await privateRequest.delete(
                    `admin/category/${params?.row?.category_id}`
                  );
                  if (responseCheck(response)) {
                    fetchCategory();
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
      <InfoBox page="Category" href="/category/create" hrefName="Create Category" />
      <Paper sx={{ height: 400, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={category}
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

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import InfoBox from "@/components/dynamicRoute/infoNav";
import { DataGrid } from "@mui/x-data-grid"; 
import { privateRequest } from "@/config/axios.config";
import { Toastify } from "@/components/toastify";
import { responseCheck } from "@/utils/helper";
const SEO = () => {
  const search = useSearchParams();
  return <LandingSeo />;
};

export default SEO;

function LandingSeo({ type = "blog" }) {
  const [metaData, setMetaData] = useState([]);
  useEffect(() => {
    privateRequest.get("/seo").then((res) => {
      console.log(res?.data?.data);
      const data = res?.data?.data.map((item) => {
        return {
          ...item,
          id: item?.seo_id,
        };
      });
      const result = data.filter((item) => item?.type === type);
      setMetaData(result);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "question", headerName: "Question", flex: 1.5 },
    {
      field: "title",
      headerName: "Title",
      type: "string",
      flex: 2.5,
    },
    {
      field: "conten",
      headerName: "Action",
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ wordBreak: "break-all" }}>
            <Link href={`/SEO/landing/edit/${params?.row?.seo_id}`}>
              <IconButton color="primary" component="a">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              color="error"
              onClick={async () => {
                try {
                  const response = await privateRequest.delete(
                    `seo/${params?.row?.seo_id}`
                  );
                  if (responseCheck(response)) {
                    // fetchFaqs();
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
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box>
      <InfoBox
        page='Landing SEO'
        href="/SEO/blog/create"
        hrefName="Create SEO"
      />
      <Paper sx={{ height: 400, width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={metaData}
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
 
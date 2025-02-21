"use client";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#FAEFB4", // replace with your desired secondary color
      },
      primary: {
        main: "#000000", // replace with your desired secondary color
      },
    },
  });
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Layout;

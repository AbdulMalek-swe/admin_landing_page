"use client"
import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer"; 
import {   usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { removeToken } from "@/utils/helper";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "blog/blog",
    title: "Blog",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "category/category",
    title: "Category",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "project/project",
    title: "Project",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "testimonial/testimonial",
    title: "Testimonial",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "faq/faqs",
    title: "Faq",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "company/company",
    title: "Company",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "contact/contact",
    title: "Contact",
    icon: <ShoppingCartIcon />,
  } 
   
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);
//   const routerss = useRouter();
//   routerss.push(pathname);
//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const routerss = useRouter();
  console.log(pathname );
  React.useEffect(() => {
    routerss.push(pathname);
  }, [pathname, routerss]);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}
// const Skeleton = styled("div")(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));
//  call logout button for logout implment system 
function Search() {
  const router = useRouter()
  return (
    <React.Fragment>
       <Button onClick={()=>{
        
        removeToken();
        router.push("/auth/log-in")
       }}>Logout</Button>
    </React.Fragment>
  );
}
export default function DashboardLayoutBasic(props) {
  const { window, children } = props;
   const pathname = usePathname()
  const router = useDemoRouter( pathname?pathname:"/dashboard");
       console.log(router);
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      // navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      // window={demoWindow}
      
      // session={session}
      // authentication={authentication}
      navigation={NAVIGATION}
      // branding={{
      //   logo: <img src="https://codingmstr.com/img/logo-white.png" alt="MUI logo" />,
      //   title: 'CodingMSTR',
      // }}
    >
      <DashboardLayout  slots={{ 
                toolbarActions: Search, 
       }}
       sx={{ 
        padding:"16px",
        }}
       >
        {/* <PageContainer >{children}</PageContainer> */}
         {children} 
      </DashboardLayout>
    </AppProvider>
  );
}

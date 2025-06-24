import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import NavBar from "../view/navbar/NavBar";
import { Paper, Box, Breadcrumbs } from "@mui/material";
import { getUserAuth, getUserCurentBranch } from "../utils/authDataConver";
import CustomeBreadcrumbs from "../components/common/CustomeBreadcrumbs";
import SideNavBar from "../view/navbar/SideNavBar";
import { getNavbarState } from "../view/navbar/navstate";

const LoginProtectedRoute: React.FC = () => {
  const user = getUserAuth();
  const location = useLocation();
  const curentBranch = getUserCurentBranch();
  // console.log(curentBranch);
  const skipSegments = ["edit", "update", "full_edit"];

  return user && curentBranch ? (
    <Paper
      sx={{
        minHeight: "100vh",
        display: "flex",
        // flexDirection: "column",
        flexDirection: getNavbarState() ? "rows" : "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {curentBranch && <NavBar />} */}
      {curentBranch && getNavbarState() ? (
        <SideNavBar />
      ) : curentBranch && getNavbarState() === false ? (
        <NavBar />
      ) : null}
      <Box
        sx={{
          flex: 1, // Take remaining space
          display: "flex",
          justifyContent: "center", // Horizontally center
          // maxWidth: "1200px",
          // minWidth: "1000px",
          paddingTop: 1,
          position: "relative",
        }}
      >
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <CustomeBreadcrumbs />
        </Box> */}
        <Box sx={{ mt: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Paper>
  ) : user && !curentBranch ? (
    <Navigate to="/branch_selection" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default LoginProtectedRoute;

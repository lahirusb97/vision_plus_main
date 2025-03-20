import React from "react";
import { Navigate, Outlet } from "react-router";
import NavBar from "../view/navbar/NavBar";
import { Paper, Box } from "@mui/material";
import { getUserAuth, getUserCurentBranch } from "../utils/authDataConver";

const LoginProtectedRoute: React.FC = () => {
  const user = getUserAuth();

  const curentBranch = getUserCurentBranch();
  console.log(curentBranch);

  return user && curentBranch ? (
    <Paper
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {curentBranch && <NavBar />}
      <Box
        sx={{
          flex: 1, // Take remaining space
          display: "flex",
          justifyContent: "center", // Horizontally center
          maxWidth: "1200px",
          minWidth: "1000px",
          paddingTop: 2,
        }}
      >
        <Outlet />
      </Box>
    </Paper>
  ) : user && !curentBranch ? (
    <Navigate to="/branch_selection" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default LoginProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router";
import NavBar from "../view/navbar/NavBar";
import { useAuthContext } from "../context/AuthContext";
import { Paper, Box } from "@mui/material";

const LoginProtectedRoute: React.FC = () => {
  const { token } = useAuthContext();

  return token ? (
    <Paper
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavBar />
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
  ) : (
    <Navigate to="/login" replace />
  );
};

export default LoginProtectedRoute;

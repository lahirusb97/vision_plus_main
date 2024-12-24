import React from "react";
import { Navigate, Outlet } from "react-router";
import NavBar from "../view/navbar/NavBar";
import { useAuthContext } from "../context/AuthContext";
import { Paper, Box } from "@mui/material";

const LoginProtectedRoute: React.FC = () => {
  const { token } = useAuthContext();

  return token || !token ? ( // Check if token exists
    <Paper
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <Box
        sx={{
          flex: 1, // Take remaining space
          display: "flex",
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
          padding: 2, // Optional: Add some padding
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

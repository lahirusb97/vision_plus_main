import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import NavBar from "../view/navbar/NavBar";
import { useAuthContext } from "../context/AuthContext";
import { getCookie } from "typescript-cookie";

const LoginProtectedRoute: React.FC = () => {
  const { token } = useAuthContext();

  return token ? ( // Check if token exists
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default LoginProtectedRoute;

import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { refractionRoutes } from "./routelist/refraction.route";

// Lazy load components
const Login = lazy(() => import("../view/login/login"));
const LoginProtectedRoute = lazy(() => import("./LoginProtectedRoute"));
const ProtectedChildRoute = lazy(() => import("./ProtectedChildRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginProtectedRoute />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedChildRoute />
          </Suspense>
        ),
        children: refractionRoutes,
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PublicRoute />
      </Suspense>
    ),
    children: [
      {
        path: "",
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);

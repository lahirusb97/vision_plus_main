/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { refractionRoutes } from "./routelist/refraction.route";
import { transactionRoutes } from "./routelist/transaction.route";
import RegisterUser from "../view/auth/RegisterUser";

// Lazy load components
const Login = lazy(() => import("../view/auth/login"));
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
      {
        path: "transaction",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedChildRoute />
          </Suspense>
        ),
        children: transactionRoutes,
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
      {
        path: "register",
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterUser />
          </Suspense>
        ),
      },
    ],
  },
]);

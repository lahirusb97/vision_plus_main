/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { refractionRoutes } from "./routelist/refraction.route";
import { channelRoutes } from "./routelist/channel.route";
import { transactionRoutes } from "./routelist/transaction.route";
import { stockRoutes } from "./routelist/stock.route";
import { userRoutes } from "./routelist/user.route";
import LoginProtectedRoute from "./LoginProtectedRoute";
import ProtectedChildRoute from "./ProtectedChildRoute";
import PublicRoute from "./PublicRoute";

const Login = lazy(() => import("../view/auth/login"));
const RegisterUser = lazy(() => import("../view/auth/RegisterUser"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginProtectedRoute />,
    children: [
      {
        path: "",
        element: <ProtectedChildRoute />,
        children: refractionRoutes,
      },

      {
        path: "channel",

        element: <ProtectedChildRoute />,

        children: channelRoutes,
      },
      {
        path: "transaction",
        element: <ProtectedChildRoute />,
        children: transactionRoutes,
      },
      {
        path: "stock",
        element: <ProtectedChildRoute />,
        children: stockRoutes,
      },
      {
        path: "transaction",
        element: <ProtectedChildRoute />,
        children: transactionRoutes,
      },
      {
        path: "user",
        element: <ProtectedChildRoute />,
        children: userRoutes,
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

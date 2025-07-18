/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { refractionRoutes } from "./routelist/refraction.route";
import { channelRoutes } from "./routelist/channel.route";
import { transactionRoutes } from "./routelist/transaction.route";
import { checkInRoutes } from "./routelist/checkin.route";
import { stockRoutes } from "./routelist/stock.route";
import { userRoutes } from "./routelist/user.route";
import LoginProtectedRoute from "./LoginProtectedRoute";
import ProtectedChildRoute from "./ProtectedChildRoute";
import PublicRoute from "./PublicRoute";
import ComingSoon from "../ComingSoon";
import { accountRoutes } from "./routelist/account.route";
import SelectBrancheIndex from "../view/SelectBrancheIndex";
import { reportRoutes } from "./routelist/reports.route";
import Login from "../view/auth/login";
import RegisterUser from "../view/auth/RegisterUser";
import { searchRoutes } from "./routelist/search.route";
import { logsRoutes } from "./routelist/logs.route";
import { masterRoutes } from "./routelist/master.route";
import { frameAndLensStoreRoutes } from "./routelist/frame-and-lens-store.route";
import { LensStoreRoutes } from "./routelist/lens-store.route";
import { imageUploadRoutes } from "./routelist/image-uploard.route";
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
        path: "transaction",
        element: <ProtectedChildRoute />,
        children: transactionRoutes,
      },
      {
        path: "search",
        element: <ProtectedChildRoute />,
        children: searchRoutes,
      },
      {
        path: "checkin",
        element: <ProtectedChildRoute />,
        children: checkInRoutes,
      },
      {
        path: "account",
        element: <ProtectedChildRoute />,
        children: accountRoutes,
      },

      {
        path: "stock",
        element: <ProtectedChildRoute />,
        children: stockRoutes,
      },
      {
        path: "channel",
        element: <ProtectedChildRoute />,

        children: channelRoutes,
      },
      {
        path: "master",
        element: <ProtectedChildRoute />,

        children: masterRoutes,
      },
      {
        path: "reports",
        element: <ProtectedChildRoute />,
        children: reportRoutes,
      },
      {
        path: "messenger",
        element: <ComingSoon />,
        // children: userRoutes,
      },
      {
        path: "user",
        element: <ProtectedChildRoute />,
        children: userRoutes,
      },
      {
        path: "logs",
        element: <ProtectedChildRoute />,
        children: logsRoutes,
      },
      {
        path: "inventory-frame",
        element: <ProtectedChildRoute />,
        children: frameAndLensStoreRoutes,
      },
      {
        path: "inventory-lens",
        element: <ProtectedChildRoute />,
        children: LensStoreRoutes,
      },
      {
        path: "image-upload",
        element: <ProtectedChildRoute />,
        children: imageUploadRoutes,
      },
    ],
  },
  {
    path: "branch_selection",
    element: <SelectBrancheIndex />,
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

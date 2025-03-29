import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import ReportsIndex from "../../view/reports/ReportsIndex";
import InvoiceReport from "../../view/reports/InvoiceReport";
import FrameReport from "../../view/reports/FrameReport";
import LensReport from "../../view/reports/LensReport";

export const reportRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <InvoiceReport />,
      },
    ],
  },
  {
    path: "frames_report",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FrameReport />,
      },
    ],
  },
  {
    path: "lens_report",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <LensReport />,
      },
    ],
  },
  // {
  //   path: "report1/", // you can add paths al you need for the UI
  //   element: <AccountIndex />, // create UI inside view/account folder then import to here
  // },
];

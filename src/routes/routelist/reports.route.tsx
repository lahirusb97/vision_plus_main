import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import ReportsIndex from "../../view/reports/ReportsIndex";
import Frames from "../../view/reports/Frames";
import Lense from "../../view/reports/Lense";


export const reportRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <ReportsIndex />,
      },
    ],
  },
  {
    path: "reports/", // you can add paths al you need for the UI
   element: <ReportsIndex />, // create UI inside view/account folder then import to here
  },

  {
    path: "frames/", // you can add paths al you need for the UI
   element: <Frames />, // create UI inside view/account folder then import to here
  },
  {
    path: "lense/", // you can add paths al you need for the UI
   element: <Lense />, // create UI inside view/account folder then import to here
  },
];

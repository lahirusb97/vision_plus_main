import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import ReportsIndex from "../../view/reports/ReportsIndex";

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
  // {
  //   path: "report1/", // you can add paths al you need for the UI
  //   element: <AccountIndex />, // create UI inside view/account folder then import to here
  // },
];

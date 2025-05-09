import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import JobProgress from "../../view/checkin/JobProgress";
import SendOrder from "../../view/checkin/SendOrder";

export const checkInRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <JobProgress />, // this is root frile when you click checkin button this UI is the one loading
      },
    ],
  },
  {
    path: "send_order",
    element: <SendOrder />,
  },
];

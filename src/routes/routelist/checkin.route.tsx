import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import CheckInIndex from "../../view/checkin/CheckInIndex";
import Transfer from "../../view/checkin/Transfer";
import SendOrder from "../../view/checkin/SendOrder";

export const checkInRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <CheckInIndex />,
      },
    ],
  },
  {
    path: "transfer/",
    element: <Transfer />,
  },
  {
    path: "send_order",
    element: <SendOrder />,
  },
];

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
        element: <CheckInIndex />, // this is root frile when you click checkin button this UI is the one loading
      },
    ],
  },
  {
    path: "transfer/", //you can change this new path if you do you have to mach the same in CheckInNav.tsx
    element: <Transfer />, // Create new comp if you want you have to change this if you do
  },
  {
    path: "send_order",
    element: <SendOrder />,
  },
];

import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import JobProgress from "../../view/checkin/JobProgress";
import SendOrder from "../../view/checkin/SendOrder";
import FittingForm from "../../view/checkin/fitting/FittingForm";
import GlassSender from "../../view/checkin/GlassSender";
import LenseArrival from "../../view/checkin/arrival_status/LenseArrival";

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
  {
    path: "checkin-fitting",
    element: <FittingForm />,
  },
  {
    path: "glasses-sender",
    element: <GlassSender />,
  },
  {
    path: "lense-arrival",
    element: <LenseArrival />,
  },
];

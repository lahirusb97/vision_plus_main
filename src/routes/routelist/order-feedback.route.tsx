import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import FeedBackCreate from "../../view/feedback/FeedBackCreate";
import FeedbackIndex from "../../view/feedback/FeedbackIndex";

export const orderFeedbackRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FeedbackIndex />,
      },
      {
        path: ":invoice_number",
        element: <FeedBackCreate />,
      },
    ],
  },
];

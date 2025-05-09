import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import CheckInIndex from "../../view/checkin/CheckInIndex";
import InvoiceSearchIndex from "../../view/transaction/InvoiceSearchIndex";

export const searchRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <CheckInIndex />,
      },
      {
        path: "print_out/",
        element: <InvoiceSearchIndex />,
      },
    ],
  },
];

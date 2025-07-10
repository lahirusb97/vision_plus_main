import { RouteObject } from "react-router";
import UploardInvoiceTable from "../../view/uploard/uploard-invoice-table";
import ProtectedChildRoute from "../ProtectedChildRoute";
import UploardView from "../../view/uploard/UploardView";

export const imageUploadRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <UploardInvoiceTable />,
      },
      {
        path: ":order_id",
        element: <UploardView />,
      },
    ],
  },
];

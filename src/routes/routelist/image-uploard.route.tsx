import { RouteObject } from "react-router";
import UploardInvoiceTable from "../../view/uploard/uploard-invoice-table";

export const imageUploadRoutes: RouteObject[] = [
  {
    path: "",
    element: <UploardInvoiceTable />,
  },
];

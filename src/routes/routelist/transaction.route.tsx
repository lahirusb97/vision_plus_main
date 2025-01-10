import Factoryinvoice from "../../view/transaction/FactoryInvoice";
import { RouteObject } from "react-router";
import NormalInvoice from "../../view/transaction/NormalInvoice";
import EditInvoice from "../../view/transaction/EditInvoice";
import DeleteInvoice from "../../view/transaction/DeleteInvoice";

export const transactionRoutes: RouteObject[] = [
  {
    path: "factory_invoice",
    element: <Factoryinvoice />,
  },
  {
    path: "normal_invoice",
    element: <NormalInvoice />,
  },
  {
    path: "edit_invoice",
    element: <EditInvoice />,
  },
  {
    path: "delete_invoice",
    element: <DeleteInvoice />,
  },
];

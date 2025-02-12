import Factoryinvoice from "../../view/transaction/FactoryIndex";
import { RouteObject } from "react-router";
import EditInvoice from "../../view/transaction/EditInvoice";
import NormalInvoice from "../../view/transaction/NormalInvoice";
import Repayment from "../../view/transaction/Repayment";
import ProtectedChildRoute from "../ProtectedChildRoute";
import NormalInvoiceActions from "../../view/transaction/NormalInvoiceActions";
import FactoryIndex from "../../view/transaction/FactoryIndex";
import FactoryInvoiceForm from "../../view/transaction/factory_invoice/FactoryInvoiceForm";
export const transactionRoutes: RouteObject[] = [
  {
    path: "factory_invoice",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FactoryIndex />,
      },
      {
        path: "create/:id",
        element: <FactoryInvoiceForm />,
      },
    ],
  },
  {
    path: "normal_invoice",
    element: <ProtectedChildRoute />,
    children: [
      {
       index  : true,
        element: 
          <NormalInvoice />
        ,
      },
      {
       path: ":id",
        element: 
          <NormalInvoiceActions />
        ,
      },
    ],
  },
  {
    path: "edit_invoice",
    element: <EditInvoice />,
  },
  {
    path: "repayment",
    element: <Repayment />,
  },
];

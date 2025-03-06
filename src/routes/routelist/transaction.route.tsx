import { RouteObject } from "react-router";
import EditInvoice from "../../view/transaction/EditInvoice";
import NormalInvoice from "../../view/transaction/NormalInvoice";
import Repayment from "../../view/transaction/Repayment";
import ProtectedChildRoute from "../ProtectedChildRoute";

import FactoryTable from "../../view/transaction/FactoryTable";
import FactoryInvoiceForm from "../../view/transaction/factory_order/FactoryInvoiceForm";
import InvoiceView from "../../view/transaction/factory_order/InvoiceView";

export const transactionRoutes: RouteObject[] = [
  {
    path: "factory_order",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FactoryTable />,
      },
      {
        path: "create/:id",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <FactoryInvoiceForm />,
          },
          // {
          //   path: "success",
          //   element: <FactoryInvoiceSucess />,
          // },
          {
            path: "view",
            element: <InvoiceView />,
          },
        ],
      },
    ],
  },
  {
    path: "normal_order",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <NormalInvoice />,
      },
      {
        path: ":id",
        element: <>s</>,
      },
    ],
  },
  {
    path: "order_edit",
    element: <EditInvoice />,
  },
  {
    path: "repayment",
    element: <Repayment />,
  },
];

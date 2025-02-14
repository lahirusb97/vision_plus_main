import Factoryinvoice from "../../view/transaction/FactoryIndex";
import { RouteObject } from "react-router";
import EditInvoice from "../../view/transaction/EditInvoice";
import NormalInvoice from "../../view/transaction/NormalInvoice";
import Repayment from "../../view/transaction/Repayment";
import ProtectedChildRoute from "../ProtectedChildRoute";
import NormalInvoiceActions from "../../view/transaction/NormalInvoiceActions";
import FactoryIndex from "../../view/transaction/FactoryIndex";
import FactoryInvoiceForm from "../../view/transaction/factory_invoice/FactoryInvoiceForm";
import InvoiceView from "../../view/transaction/factory_invoice/InvoiceView";
import InternalOrder from "../../view/transaction/factory_invoice/internal_order/InternalOrder";

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
      {
        path: "internal_order/:id",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <InternalOrder />,
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
    path: "normal_invoice",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <NormalInvoice />,
      },
      {
        path: ":id",
        element: <NormalInvoiceActions />,
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

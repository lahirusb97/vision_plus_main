import { RouteObject } from "react-router";

import ProtectedChildRoute from "../ProtectedChildRoute";
import FactoryTable from "../../view/transaction/FactoryTable";
import InvoiceView from "../../view/transaction/factory_order/InvoiceView";
import OrderEditIndex from "../../view/transaction/OrderEditIndex";
import RePaymentIndex from "../../view/transaction/RePaymentIndex";
import RepaymentForm from "../../view/transaction/RepaymentForm";
import FactoryOrder from "../../view/transaction/factory_order/FactoryOrder";
import FactoryOrderUpdate from "../../view/transaction/factory_order/FactoryOrderUpdate";
import NormalInvoice from "../../view/transaction/normal_order/NormalInvoice";
import NormalOrderInvoice from "../../view/transaction/normal_order/NormalOrderInvoice";
import InvoiceSearchIndex from "../../view/transaction/InvoiceSearchIndex";
import FrameOnlyOrderCreate from "../../view/transaction/frameonly/FrameOnlyOrderCreate";
import BusTitleIndex from "../../view/transaction/bus/BusTitleIndex";
import BusTitleUpdate from "../../view/transaction/bus/BusTitleUpdate";
import { BusTitleCreate } from "../../view/transaction/bus/BusTitleCreate";

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
        path: "create/:refraction_id",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <FactoryOrder />,
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
        path: "invoice/:invoice_number",
        element: <InvoiceView />, //Handle invoice view
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
        path: ":invoice_number",
        element: <NormalOrderInvoice />,
      },
    ],
  },
  {
    path: "order_edit",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <OrderEditIndex />,
      },
      {
        path: ":invoice_number",
        element: <FactoryOrderUpdate />,
      },
    ],
  },
  {
    path: "frame_only_order",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FrameOnlyOrderCreate />,
      },
    ],
  },
  {
    path: "repayment",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <RePaymentIndex />,
      },
      {
        path: ":invoice_number",
        element: <RepaymentForm />,
      },
    ],
  },
  {
    path: "invoice/search",
    element: <InvoiceSearchIndex />,
  },
  {
    path: "bus/",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <BusTitleIndex />,
      },
      {
        path: "create",
        element: <BusTitleCreate />,
      },
      {
        path: "update/:id",
        element: <BusTitleUpdate />,
      },
    ],
  },
];

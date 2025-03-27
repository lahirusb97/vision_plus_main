import { RouteObject } from "react-router";
import NormalInvoice from "../../view/transaction/NormalInvoice";
import ProtectedChildRoute from "../ProtectedChildRoute";
import FactoryTable from "../../view/transaction/FactoryTable";
import InvoiceView from "../../view/transaction/factory_order/InvoiceView";
import OrderEditFrom from "../../view/transaction/order_edit/OrderEditFrom";
import OrderEditIndex from "../../view/transaction/OrderEditIndex";
import RePaymentIndex from "../../view/transaction/RePaymentIndex";
import RepaymentForm from "../../view/transaction/RepaymentForm";
import FactoryOrder from "../../view/transaction/factory_order/FactoryOrder";
import FactoryOrderUpdate from "../../view/transaction/factory_order/FactoryOrderUpdate";

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
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <OrderEditIndex />,
      },
      {
        path: ":id",
        element: <FactoryOrderUpdate />,
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
        path: ":id",
        element: <RepaymentForm />,
      },
    ],
  },
];

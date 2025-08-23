import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import OrderEditIndex from "../../view/transaction/OrderEditIndex";
import RePaymentIndex from "../../view/transaction/RePaymentIndex";
import RepaymentForm from "../../view/transaction/RepaymentForm";
import FactoryOrderUpdate from "../../view/transaction/factory_order/FactoryOrderUpdate";
import FrameOnlyOrderCreate from "../../view/transaction/frameonly/FrameOnlyOrderCreate";
import FrameOnlyOrderIndex from "../../view/transaction/frameonly/FrameOnlyOrderIndex";

export const frameonlyRoutes: RouteObject[] = [
  {
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FrameOnlyOrderIndex />,
      },
      {
        path: ":patient_id/order_create",
        element: <FrameOnlyOrderCreate />,
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
];

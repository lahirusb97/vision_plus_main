import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import NormalInvoice from "../../view/transaction/normal_order/NormalInvoice";
import NormalOrderInvoice from "../../view/transaction/normal_order/NormalOrderInvoice";
import NormalOrderEdit from "../../view/transaction/normal_order/NormalOrderEdit";
import NormalOrderEditIndex from "../../view/transaction/normal_order/NormalOrderEditIndex";
import NormalOrderIndex from "../../view/transaction/normal_order/NormalOrderIndex";

export const normalOrderRoutes: RouteObject[] = [
  {
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <NormalOrderIndex />,
      },
      {
        path: ":patient_id/order_create",
        element: <NormalInvoice />,
      },
      {
        path: "search",
        element: <NormalOrderEditIndex />,
      },
      {
        path: "view/:invoice_number",
        element: <NormalOrderInvoice />,
      },
      {
        path: "edit/:invoice_number",
        element: <NormalOrderEdit />,
      },
    ],
  },
];

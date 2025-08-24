import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import HearingStore from "../../view/hearing/HearingStore";
import HearingOrderCreate from "../../view/hearing/HearingOrderCreate";
import HearingItemCreate from "../../view/hearing/HearingItemCreate";
import HearingItemEdit from "../../view/hearing/HearingItemEdit";
import HearingItemQtyUpdate from "../../view/hearing/HearingItemQtyUpdate";
import HearingItemFullEdit from "../../view/hearing/HearingItemFullEdit";
import HearingInvoiceView from "../../view/hearing/HearingInvoiceView";
import HearingOrderEditIndex from "../../view/hearing/HearingOrderEditIndex";
import HearingOrderEdit from "../../view/hearing/HearingOrderEdit";
import HearingInvoiceReport from "../../view/hearing/hearing-invoice/HearingInvoiceReport";
import HearingReminder from "../../view/hearing/hearing-reminder/HearingReminder";
import HearingRepaymentForm from "../../view/hearing/HearingRepaymentForm";
import HearingOrderIndex from "../../view/hearing/HearingOrderIndex";

export const hearingRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <HearingOrderIndex />,
      },
      {
        path: "order/:patient_id/create",
        element: <HearingOrderCreate />,
      },
      {
        path: "create/",
        element: <HearingItemCreate />,
      },
      {
        path: ":invoice_number/",
        element: <HearingInvoiceView />,
      },
      {
        path: ":invoice_number/repayment",
        element: <HearingRepaymentForm />,
      },
      {
        path: "order/",
        element: <HearingOrderEditIndex />,
      },
      {
        path: "invoice/",
        element: <HearingInvoiceReport />,
      },
      {
        path: "reminder/",
        element: <HearingReminder />,
      },
      {
        path: "order/:invoice_number/",
        element: <HearingOrderEdit />,
      },

      {
        path: "hearing_item_stock",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <HearingStore />,
          },
          {
            path: "edit/:id",
            element: <HearingItemEdit />,
          },
          {
            path: "full-edit/:id",
            element: <HearingItemFullEdit />,
          },
          {
            path: "update/:id",
            element: <HearingItemQtyUpdate />,
          },
          // {
          //   path: "history/:id",
          //   element: <OtherItemHistory />,
          // },
        ],
      },
    ],
  },
];

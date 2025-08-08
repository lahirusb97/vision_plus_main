import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import HearingStore from "../../view/hearing/HearingStore";
import HearingOrderCreate from "../../view/hearing/HearingOrderCreate";
import HearingItemCreate from "../../view/hearing/HearingItemCreate";
import HearingItemEdit from "../../view/hearing/HearingItemEdit";
import HearingItemQtyUpdate from "../../view/hearing/HearingItemQtyUpdate";
import HearingItemFullEdit from "../../view/hearing/HearingItemFullEdit";
import HearingInvoiceView from "../../view/hearing/HearingInvoiceView";

export const hearingRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
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

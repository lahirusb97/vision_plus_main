import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import SolderingOrder from "../../view/master/soldering/SolderingOrder";
import SolderingInvoiceTable from "../../view/master/soldering/SolderingInvoiceTable";
import SolderingInvoiceView from "../../view/master/soldering/SolderingInvoiceView";
import SolderingRepayment from "../../view/master/soldering/SolderingRepayment";

export const masterRoutes: RouteObject[] = [
  {
    path: "",
    element: <SolderingOrder />,
    children: [
      {
        index: true,
        element: <SolderingOrder />,
      },
    ],
  },
  {
    path: "soldering-invoice",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <SolderingInvoiceTable />,
      },
      {
        path: ":invoice_number",
        element: <SolderingInvoiceView />,
      },
      {
        path: ":invoice_number/soldering-repayment",
        element: <SolderingRepayment />,
      },
    ],
  },
];

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
import FrameOnlyOrderCreate from "../../view/transaction/frameonly/FrameOnlyOrderCreate";
import BusTitleIndex from "../../view/transaction/bus/BusTitleIndex";
import BusTitleUpdate from "../../view/transaction/bus/BusTitleUpdate";
import { BusTitleCreate } from "../../view/transaction/bus/BusTitleCreate";
import NormalOrderEdit from "../../view/transaction/normal_order/NormalOrderEdit";
import NormalOrderEditIndex from "../../view/transaction/normal_order/NormalOrderEditIndex";
import DoctorClaimInvoiceForm from "../../view/transaction/doctor_claim_invoice/DoctorClaimInvoiceForm";
import DoctorClainInvoiceView from "../../view/transaction/doctor_claim_invoice/DoctorClainInvoiceView";

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
        path: "search",
        element: <NormalOrderEditIndex />,
      },
      {
        path: ":invoice_number",
        element: <NormalOrderInvoice />,
      },
      {
        path: "edit/:invoice_number",
        element: <NormalOrderEdit />,
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
  // {
  //   path: "invoice/search",
  //   element: <InvoiceSearchIndex />,
  // },
  {
    path: "invoice/view/:invoice_number",
    element: <InvoiceView />,
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
        path: "update/:bus_title_id",
        element: <BusTitleUpdate />,
      },
    ],
  },
  {
    path: "doctor_claim_invoice",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <DoctorClaimInvoiceForm />,
      },
      {
        path: ":invoice_number",
        element: <DoctorClainInvoiceView />,
      },
    ],
  },
];

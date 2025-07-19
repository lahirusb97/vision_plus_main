import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import InvoiceReport from "../../view/reports/InvoiceReport";
import FrameReport from "../../view/reports/FrameReport";
import LensReport from "../../view/reports/LensReport";

import CustomerLocation from "../../view/reports/CustomerLocation";
import InvoiceSummary from "../../view/reports/InvoiceSummary";
import DoctorClaimReportIndex from "../../view/reports/doctor_claim/DoctorClaimReportIndex";
import DoctorClaimReportChannel from "../../view/reports/doctor_claim/DoctorClaimReportChannel";
import DoctorClaimReportLayout from "../../view/reports/layout/DoctorClaimReportLayout";
import FIttingLabRepoart from "../../view/reports/fitting-lab/FIttingLabRepoart";
import GlassSenderReport from "../../view/reports/GlassSenderReport";
import EmployerSalesHistory from "../../view/reports/EmployerSalesHistory";
import EmployerSalesReportLayout from "../../view/reports/layout/EmployerSalesReportLayout";
import MntReport from "../../view/reports/MntReport";
import NormalInvoiceReport from "../../view/reports/invoice/NormalInvoiceReport";
import FactorylInvoiceReport from "../../view/reports/invoice/FactorylInvoiceReport";
import SolderingInvoiceReport from "../../view/reports/invoice/SolderingInvoiceReport";
import ChannelInvoiceReport from "../../view/reports/invoice/ChannelInvoiceReport";
import InvoiceReportLayout from "../../view/reports/layout/InvoiceReportLayout";
import BestCustomer from "../../view/reports/bestcustomer/BestCustomer";

export const reportRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <InvoiceReport />,
      },
    ],
  },
  {
    path: "frames_report",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <FrameReport />,
      },
    ],
  },
  {
    path: "lens_report",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <LensReport />,
      },
    ],
  },
  {
    path: "best_customer",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <BestCustomer />,
      },
    ],
  },
  {
    path: "customer_location",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <CustomerLocation />,
      },
    ],
  },
  {
    path: "invoice_summary",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <InvoiceSummary />,
      },
    ],
  },
  {
    path: "doctor_claim",
    element: <DoctorClaimReportLayout />,
    children: [
      {
        index: true,
        element: <DoctorClaimReportIndex />,
      },
      {
        path: "channel",
        element: <DoctorClaimReportChannel />,
      },
    ],
  },
  {
    path: "report-fitting-lab",
    element: <FIttingLabRepoart />,
  },
  {
    path: "employer-history",
    element: <EmployerSalesReportLayout />,
    children: [
      {
        index: true,
        element: <EmployerSalesHistory />,
      },
      {
        path: "glass-sender",
        element: <GlassSenderReport />,
      },
    ],
  },
  {
    path: "best-customer",
    element: <BestCustomer />,
  },
  {
    path: "mnt-report",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <MntReport />,
      },
    ],
  },
  {
    path: "invoice",
    element: <InvoiceReportLayout />,
    children: [
      {
        index: true,
        element: <FactorylInvoiceReport />,
      },
      {
        path: "normal",
        element: <NormalInvoiceReport />,
      },

      {
        path: "soldering",
        element: <SolderingInvoiceReport />,
      },
      {
        path: "channel",
        element: <ChannelInvoiceReport />,
      },
    ],
  },
  // {
  //   path: "report1/", // you can add paths al you need for the UI
  //   element: <AccountIndex />, // create UI inside view/account folder then import to here
  // },
];

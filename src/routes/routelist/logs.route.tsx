import { RouteObject } from "react-router";
import FrameLog from "../../view/audit_logs/FrameLog";
import LensLog from "../../view/audit_logs/LensLog";
import ChannelDeactivateLog from "../../view/audit_logs/channel-refund-delete/ChannelDeactivateLog";
import ChannelRefundLog from "../../view/audit_logs/channel-refund-delete/ChannelRefundLog";
import ChannelLogsLayout from "../../view/audit_logs/layout/ChannelLogsLayout";
import FactoryOrderDeactivateLog from "../../view/audit_logs/factory-order-refund-delete/FactoryOrderDeactivateLog";
import FactoryOrderRefundLog from "../../view/audit_logs/factory-order-refund-delete/FactoryOrderRefundLog";
import FactoryOrderLogsLayout from "../../view/audit_logs/layout/FactoryOrderLogsLayout";
import OrderAuditLayout from "../../view/audit_logs/layout/OrderAuditLayout";
import OrderAudits from "../../view/audit_logs/OrderAudits";
export const logsRoutes: RouteObject[] = [
  {
    path: "",
    element: <FrameLog />,
  },

  {
    path: "lens/",
    element: <LensLog />,
  },
  {
    path: "channel/",
    element: <ChannelLogsLayout />,
    children: [
      {
        index: true,
        element: <ChannelDeactivateLog />,
      },
      {
        path: "refund/",
        element: <ChannelRefundLog />,
      },
    ],
  },
  {
    path: "factory-order/",
    element: <FactoryOrderLogsLayout />,
    children: [
      {
        index: true,
        element: <FactoryOrderDeactivateLog />,
      },
      {
        path: "refund/",
        element: <FactoryOrderRefundLog />,
      },
    ],
  },
  {
    path: "order-audit/",
    element: <OrderAuditLayout />,
    children: [
      {
        index: true,
        element: <OrderAudits />,
      },
    ],
  },
];

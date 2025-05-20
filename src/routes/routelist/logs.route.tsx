import { RouteObject } from "react-router";
import FrameLog from "../../view/audit_logs/FrameLog";
import LensLog from "../../view/audit_logs/LensLog";
import ChannelDeactivateLog from "../../view/audit_logs/channel-refund-delete/ChannelDeactivateLog";
import ChannelRefundLog from "../../view/audit_logs/channel-refund-delete/ChannelRefundLog";
import ChannelLogsLayout from "../../view/audit_logs/layout/ChannelLogsLayout";

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
];

import { RouteObject } from "react-router";
import FrameLog from "../../view/audit_logs/FrameLog";
import LensLog from "../../view/audit_logs/LensLog";

export const logsRoutes: RouteObject[] = [
  {
    path: "",
    element: <FrameLog />,
  },

  {
    path: "lens/",
    element: <LensLog />,
  },
];

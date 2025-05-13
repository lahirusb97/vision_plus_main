import { RouteObject } from "react-router";

import FrameLog from "../../view/logs/FrameLog";
import LensLog from "../../view/logs/LensLog";
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

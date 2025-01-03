import { RouteObject } from "react-router";
import Channel from "../../view/channel/Channel";
import Doctor from "../../view/channel/Doctor";

export const channelRoutes: RouteObject[] = [
  {
    path: "",
    element: <Channel />,
  },
  {
    path: "doctor",
    element: <Doctor />,
  },
];

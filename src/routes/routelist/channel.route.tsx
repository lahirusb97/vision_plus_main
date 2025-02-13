import { RouteObject } from "react-router";
import Channel from "../../view/channel/Channel";
import Doctor from "../../view/channel/Doctor";
import Channel_Invoice from "../../view/channel/Channel_Invoice";
import ChannelDetails from "../../view/channel/ChannelDetails";
import ProtectedChildRoute from "../ProtectedChildRoute";

export const channelRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <Channel />,
      },
      {
        path: ":id",
        element: <Channel_Invoice />,
      },
    ],
  },
  {
    path: "doctor",
    element: <Doctor />,
  },
  // {
  //   path: "channel_invoice",
  //   element: <Channel_Invoice />,
  // },
  {
    path: "channel_details",
    element: <ChannelDetails />,
  },
];

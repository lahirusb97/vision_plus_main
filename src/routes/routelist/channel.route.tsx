import { RouteObject } from "react-router";
import Channel from "../../view/channel/Channel";
import Doctor from "../../view/channel/Doctor";
import Channel_Invoice from "../../view/channel/channel_invoice";
import ChannelDetails from "../../view/channel/ChannelDetails";

export const channelRoutes: RouteObject[] = [
  {
    path: "",
    element: <Channel />,
  },
  {
    path: "doctor",
    element: <Doctor />,
  },
  {
    path: "channel_invoice",
    element: <Channel_Invoice />,
  },
  {
    path: "channel_details",
    element: <ChannelDetails />,
  },
];

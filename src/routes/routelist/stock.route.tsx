import { RouteObject } from "react-router";
import AddFrames from "../../view/stock/AddFrames";
import FrameStore from "../../view/stock/FrameStore";
import AddLense from "../../view/stock/AddLense";
import LenseStore from "../../view/stock/LenseStore";
import AddVariation from "../../view/stock/AddVariation";
import AddOtherItem from "../../view/stock/AddOtherItem";
import OtherItemStock from "../../view/stock/OtherItemStock";

export const stockRoutes: RouteObject[] = [
  {
    path: "add_frames",
    element: <AddFrames />,
  },
  {
    path: "frame_store",
    element: <FrameStore />,
  },
  {
    path: "add_lense",
    element: <AddLense />,
  },
  {
    path: "lens_store",
    element: <LenseStore />,
  },
  {
    path: "add_variation",
    element: <AddVariation />,
  },
  {
    path: "add_other_item",
    element: <AddOtherItem />,
  },
  {
    path: "other_item_stock",
    element: <OtherItemStock />,
  },
];

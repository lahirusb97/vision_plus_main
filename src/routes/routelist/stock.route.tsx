import { RouteObject } from "react-router";
import AddFrames from "../../view/stock/AddFrames";
import FrameStore from "../../view/stock/FrameStore";
import AddLense from "../../view/stock/AddLense";
import LenseStore from "../../view/stock/LenseStore";
import AddVariation from "../../view/stock/AddVariation";
import AddOtherItem from "../../view/stock/AddOtherItem";
import OtherItemStock from "../../view/stock/OtherItemStock";
import UpdateQty from "../../view/stock/UpdateQty";
import ProtectedChildRoute from "../ProtectedChildRoute";

export const stockRoutes: RouteObject[] = [
  {
    path: "add_frames",
    element: <AddFrames />,
  },
  {
    path: "frame_store",
    element: <ProtectedChildRoute/>,
    children: [
      {
       index  : true,
        element: 
          <FrameStore />
        ,
      },
      {
        path: "update_quantity/:id",
        element: 
          <UpdateQty />
        ,
      },
      {
        path: "edit/:id",
        element: 
          <UpdateQty />
        ,
      },
    ],
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

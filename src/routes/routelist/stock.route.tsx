import { RouteObject } from "react-router";
import AddFrames from "../../view/stock/AddFrames";
import FrameStore from "../../view/stock/FrameStore";
import AddLense from "../../view/stock/AddLense";
import LenseStore from "../../view/stock/LenseStore";
import AddVariation from "../../view/stock/AddVariation";
import AddOtherItem from "../../view/stock/AddOtherItem";
import OtherItemStock from "../../view/stock/OtherItemStock";
import ProtectedChildRoute from "../ProtectedChildRoute";
import LenseHistory from "../../view/stock/lense/LenseHistory";
import LenseEdit from "../../view/stock/lense/LenseEdit";
import FrameEdit from "../../view/stock/frame/FrameEdit";
import FrameUpdate from "../../view/stock/frame/FrameUpdate";
import FrameHIstory from "../../view/stock/frame/FrameHIstory";
import LenseUpdate from "../../view/stock/lense/LenseUpdate";

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
        path: "update/:id",
        element: 
          <FrameUpdate />
        ,
      },
      {
        path: "edit/:id",
        element: 
          <FrameEdit />
        ,
      },
      {
        path: "history/:id",
        element: 
          <FrameHIstory />
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
    element: <ProtectedChildRoute />,
    children: [
      {
       index  : true,
        element: 
          <LenseStore />
        ,
      },
      {
        path: "update/:id",
        element: 
          <LenseUpdate />
        ,
      },
      {
        path: "edit/:id",
        element: 
          <LenseEdit />
        ,
      },
      {
        path: "history/:id",
        element: 
          <LenseHistory />
        ,
      },
    ],
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

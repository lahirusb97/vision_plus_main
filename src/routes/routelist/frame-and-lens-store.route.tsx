import { RouteObject } from "react-router";
import LensStore from "../../view/inventory/lens-store/LensStore";
import FrameCreate from "../../view/inventory/frame-store/FrameCreate";
import InventoryFrameStore from "../../view/inventory/frame-store/InventoryFrameStore";
import ProtectedChildRoute from "../ProtectedChildRoute";
import FrameInventoryUpdate from "../../view/inventory/frame-store/FrameInventoryUpdate";
import FrameInventoryTransfer from "../../view/inventory/frame-store/FrameInventoryTransfer";
import FramePriceEdit from "../../view/inventory/frame-store/FramePriceEdit";
import FrameInventoryFullEdit from "../../view/inventory/frame-store/FrameInventoryFullEdit";

export const frameAndLensStoreRoutes: RouteObject[] = [
  {
    path: "",
    element: <LensStore />,
  },
  {
    path: "frame-create",
    element: <FrameCreate />,
  },
  {
    path: "frame-store",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <InventoryFrameStore />,
      },
      {
        path: "frame-update/:id",
        element: <FrameInventoryUpdate />,
      },
      {
        path: "frame-transfer/:id",
        element: <FrameInventoryTransfer />,
      },
      {
        path: "frame-price-edit/:id",
        element: <FramePriceEdit />,
      },
      {
        path: "frame-full-edit/:id",
        element: <FrameInventoryFullEdit />,
      },
    ],
  },
];

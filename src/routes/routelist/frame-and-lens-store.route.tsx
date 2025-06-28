import { RouteObject } from "react-router";
import LensStore from "../../view/inventory/lens-store/LensStore";
import FrameCreate from "../../view/inventory/frame-store/FrameCreate";
import InventoryFrameStore from "../../view/inventory/frame-store/InventoryFrameStore";
import ProtectedChildRoute from "../ProtectedChildRoute";
import FrameInventoryUpdate from "../../view/inventory/frame-store/FrameInventoryUpdate";
import FrameInventoryTransfer from "../../view/inventory/frame-store/FrameInventoryTransfer";
import FramePriceEdit from "../../view/inventory/frame-store/FramePriceEdit";
import FrameInventoryFullEdit from "../../view/inventory/frame-store/FrameInventoryFullEdit";
import InventoryFrameStockUpdate from "../../view/inventory/frame-store/InventoryFrameStockUpdate";
import AddVariation from "../../view/stock/AddVariation";
import LenseTypeAdd from "../../view/stock/lense/LenseTypeAdd";
import LenseTypeEdit from "../../view/stock/lense/LenseTypeEdit";
import LenseBrandAdd from "../../view/stock/lense/LenseBrandAdd";
import LenseBrandEdit from "../../view/stock/lense/LenseBrandEdit";
import FrameBrandAdd from "../../view/stock/frame/FrameBrandAdd";
import FrameBrandEdit from "../../view/stock/frame/FrameBrandEdit";
import LenseCoatingAdd from "../../view/stock/lense/LenseCoatingAdd";
import LenseCoatingEdit from "../../view/stock/lense/LenseCoatingEdit";
import ColorsAdd from "../../view/stock/frame/ColorsAdd";
import ColorsEdit from "../../view/stock/frame/ColorsEdit";
import FrameCodeAdd from "../../view/stock/frame/FrameCodeAdd";
import FrameCodeEdit from "../../view/stock/frame/FrameCodeEdit";
import FrameActionHistory from "../../components/common/frame-store/FrameActionHistory";

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
        path: "frame-action-history/:id",
        element: <FrameActionHistory />,
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
  {
    path: "frame-stock-update",
    element: <InventoryFrameStockUpdate />,
  },
  {
    path: "add_variation",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <AddVariation />,
      },
      {
        path: "lense_type",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <LenseTypeAdd />,
          },
          {
            path: ":id",
            element: <LenseTypeEdit />,
          },
        ],
      },
      {
        path: "lense_brand",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <LenseBrandAdd />,
          },
          {
            path: ":id",
            element: <LenseBrandEdit />,
          },
        ],
      },
      {
        path: "frame_brand",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <FrameBrandAdd />,
          },
          {
            path: ":id",
            element: <FrameBrandEdit />,
          },
        ],
      },
      {
        path: "lens_coatings",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <LenseCoatingAdd />,
          },
          {
            path: ":id",
            element: <LenseCoatingEdit />,
          },
        ],
      },
      {
        path: "color",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <ColorsAdd />,
          },
          {
            path: ":id",
            element: <ColorsEdit />,
          },
        ],
      },
      {
        path: "frame_code",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <FrameCodeAdd />,
          },
          {
            path: ":id",
            element: <FrameCodeEdit />,
          },
        ],
      },
    ],
  },
];

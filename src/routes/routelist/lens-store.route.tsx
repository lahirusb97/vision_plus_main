import { RouteObject } from "react-router";
import LensCreate from "../../view/inventory/lens-store/LensCreate";
import ProtectedChildRoute from "../ProtectedChildRoute";
import LenseUpdate from "../../view/stock/lense/LenseUpdate";
import LenseEdit from "../../view/stock/lense/LenseEdit";
import LenseFullEdit from "../../view/stock/lense/LenseFullEdit";
import LenseHistory from "../../view/stock/lense/LenseHistory";
import FrameInventoryTransfer from "../../view/inventory/frame-store/FrameInventoryTransfer";
import FrameInventoryReport from "../../components/common/frame-store/FrameInventoryReport";
import LensStoreReport from "../../view/inventory/lens-store/LensStoreReport";
import LensInventoryUpdate from "../../view/inventory/lens-store/LensInventoryUpdate";
import InventoryLenseStore from "../../view/inventory/lens-store/inventory-LenseStore";
import InventoryLensSalesReport from "../../view/inventory/lens-store/inventory-lens-sales-report";
export const LensStoreRoutes: RouteObject[] = [
  {
    path: "",
    element: <InventoryLenseStore />,
  },
  {
    path: "lens-create",
    element: <LensCreate />,
  },
  {
    path: "lens-store",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <InventoryLenseStore />,
      },
      {
        path: "update/:id",
        element: <LenseUpdate />,
      },
      {
        path: "edit/:id",
        element: <LenseEdit />,
      },
      {
        path: "full_edit/:lense_id",
        element: <LenseFullEdit />,
      },
      {
        path: "history/:id",
        element: <LenseHistory />,
      },
      {
        path: "lens-transfer/:id",
        element: <FrameInventoryTransfer />,
      },
    ],
  },
  {
    path: "lens-report",
    element: <InventoryLensSalesReport />,
  },
  {
    path: "lens-stock-updates",
    element: <LensInventoryUpdate />,
  },
  // {
  //   path: "frame-stock-update",
  //   element: <InventoryFrameStockUpdat />,
  // },
];

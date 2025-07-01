import { RouteObject } from "react-router";
import LensCreate from "../../view/inventory/lens-store/LensCreate";
import LensStore from "../../view/inventory/lens-store/LensStore";
import ProtectedChildRoute from "../ProtectedChildRoute";
import LenseStore from "../../view/stock/LenseStore";
import LenseUpdate from "../../view/stock/lense/LenseUpdate";
import LenseEdit from "../../view/stock/lense/LenseEdit";
import LenseFullEdit from "../../view/stock/lense/LenseFullEdit";
import LenseHistory from "../../view/stock/lense/LenseHistory";
import FrameInventoryTransfer from "../../view/inventory/frame-store/FrameInventoryTransfer";
import FrameInventoryReport from "../../components/common/frame-store/FrameInventoryReport";
import LensStoreReport from "../../view/inventory/lens-store/LensStoreReport";
import LensInventoryUpdate from "../../view/inventory/lens-store/LensInventoryUpdate";
export const LensStoreRoutes: RouteObject[] = [
  {
    path: "",
    element: <LensStore />,
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
        element: <LenseStore />,
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
    element: <LensStoreReport />,
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

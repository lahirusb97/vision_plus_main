import { RouteObject } from "react-router";
import LensCreate from "../../view/inventory/lens-store/LensCreate";
import LensStore from "../../view/inventory/lens-store/LensStore";
export const LensStoreRoutes: RouteObject[] = [
  {
    path: "",
    element: <LensStore />,
  },
  {
    path: "lens-create",
    element: <LensCreate />,
  },
];

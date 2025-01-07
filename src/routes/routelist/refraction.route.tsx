import RefractionDetails from "../../view/refraction/RefractionDetails";
import { RouteObject } from "react-router";
import RefractionNumber from "../../view/refraction/RefractionNumber";

import { lazy, Suspense } from "react";
const RefractionEdit = lazy(
  () => import("../../view/refraction/RefractionEdit")
);
export const refractionRoutes: RouteObject[] = [
  {
    path: "",
    element: <RefractionNumber />,
  },
  {
    path: "refraction/details",
    element: <RefractionDetails />,
  },
  {
    path: "refraction/:id",
    element: (
      <Suspense fallback={<div>Loading..</div>}>
        <RefractionEdit />
      </Suspense>
    ),
  },
];

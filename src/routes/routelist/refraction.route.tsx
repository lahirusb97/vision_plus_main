import RefractionTable from "../../view/refraction/RefractionTable";
import { RouteObject } from "react-router";
import RefractionNumber from "../../view/refraction/RefractionNumber";

import { lazy, Suspense } from "react";
import ProtectedChildRoute from "../ProtectedChildRoute";
import RefractionGenarated from "../../view/refraction/RefractionGenarated";
import UpdateRefraction from "../../view/refraction/UpdateRefraction";
const RefractionEdit = lazy(
  () => import("../../view/refraction/RefractionEdit")
);
export const refractionRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <RefractionNumber />,
      },
      {
        path: "success/",
        element: <RefractionGenarated />,
      },
      {
        path: "refraction/details/update/:id",
        element: <UpdateRefraction />,
      },
    ],
  },
  {
    path: "refraction/details",
    element: <RefractionTable />,
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

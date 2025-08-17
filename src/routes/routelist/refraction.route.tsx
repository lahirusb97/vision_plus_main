import RefractionTable from "../../view/refraction/RefractionTable";
import { RouteObject } from "react-router";
import { Suspense } from "react";
import ProtectedChildRoute from "../ProtectedChildRoute";
import RefractionGenarated from "../../view/refraction/RefractionGenarated";
import UpdateRefraction from "../../view/refraction/UpdateRefraction";
import RefractionEdit from "../../view/refraction/RefractionEdit";
import RefractionNumberTab from "../../view/refraction/RefractionNumberTab";

export const refractionRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <RefractionNumberTab />,
      },
      {
        path: ":refraction_id/success/",
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
    path: "refraction/:refraction_id",
    element: (
      <Suspense fallback={<div>Loading..</div>}>
        <RefractionEdit />
      </Suspense>
    ),
  },
];

import RefractionDetails from "../../view/refraction/RefractionDetails";
import { RouteObject } from "react-router";
import RefractionNumber from "../../view/refraction/RefractionNumber";

import { lazy, Suspense } from "react";
import UserIndex from "../../view/user/UserIndex";
import UserAdd from "../../view/user/UserAdd";
const RefractionEdit = lazy(
  () => import("../../view/refraction/RefractionEdit")
);
export const userRoutes: RouteObject[] = [
  {
    path: "",
    element: <UserIndex />,
  },
  {
    path: "add/",
    element: <UserAdd />,
  },
];

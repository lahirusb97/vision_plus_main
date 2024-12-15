import RefractionIndex from "../../view/refraction/RefractionIndex";
import { RouteObject } from "react-router";
import RefractionNumber from "../../view/refraction/RefractionNumber";

export const refractionRoutes: RouteObject[] = [
  {
    path: "",
    element: <RefractionNumber />,
  },
  {
    path: "refraction",
    element: <RefractionIndex />,
  },
  {
    path: "refraction/:id",
    element: <RefractionIndex />,
  },
];

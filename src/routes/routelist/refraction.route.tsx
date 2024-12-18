import RefractionDetails from '../../view/refraction/RefractionDetails'
import { RouteObject } from "react-router";
import RefractionNumber from "../../view/refraction/RefractionNumber";
import RefractionEdit from "../../view/refraction/RefractionEdit";

export const refractionRoutes: RouteObject[] = [
  {
    path: "",
    element: <RefractionNumber />,
  },
  {
    path: "refraction/details",
    element: <RefractionDetails/>,
  },
  {
    path: "refraction/:id",
    element: <RefractionEdit />,
  },
];

import { RouteObject } from "react-router";

import AccountIndex from "../../view/account/AccountIndex";
import ProtectedChildRoute from "../ProtectedChildRoute";
export const accountRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <AccountIndex />,
      },
      {
        path: "/yourpatsh here", // you can add paths al you need for the UI
        element: <>UI here</>, // create UI inside view/account folder then import to here
      },
      // {
      //   path: "/yourpatsh here", // you can add paths al you need for the UI
      //   element: <>UI here</>, // create UI inside view/account folder then import to here
      // },
    ],
  },
];

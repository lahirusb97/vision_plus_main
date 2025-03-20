import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import AccountIndex from "../../view/account/AccountIndex";
import Expence from "../../view/account/Expence";
import AddCatagory from "../../view/account/AddCatagory";

export const accountRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <AccountIndex />,
      },
    ],
  },
  {
    path: "account/", // you can add paths al you need for the UI
    element: <AccountIndex />, // create UI inside view/account folder then import to here
  },
  {
    path: "expence/", // you can add paths al you need for the UI
    element: <Expence />, // create UI inside view/account folder then import to here
  },
  {
    path: "add_catagory/", // you can add paths al you need for the UI
    element: <AddCatagory />, // create UI inside view/account folder then import to here
  },
];

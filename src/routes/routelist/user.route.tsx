import { RouteObject } from "react-router";
import UserIndex from "../../view/user/UserIndex";
import UserCreate from "../../view/user/UserCreate";
import BranchIndex from "../../view/user/BranchIndex";
import BranchCreate from "../../view/user/BranchCreate";
export const userRoutes: RouteObject[] = [
  {
    path: "",
    element: <UserIndex />,
  },
  {
    path: "create/",
    element: <UserCreate />,
  },
  {
    path: ":user/edit/",
    element: <UserCreate />,
  },
  {
    path: "branch/",
    element: <BranchIndex />,
  },
  {
    path: "branch/create/",
    element: <BranchCreate />,
  },
];

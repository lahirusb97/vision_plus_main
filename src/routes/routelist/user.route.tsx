import { RouteObject } from "react-router";
import UserIndex from "../../view/user/UserIndex";
import UserCreate from "../../view/user/UserCreate";
import BranchIndex from "../../view/user/BranchIndex";
import BranchCreate from "../../view/user/BranchCreate";
import UserUpdate from "../../view/user/UserUpdate";
import BranchUpdate from "../../view/user/BranchUpdate";
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
    path: ":user_id/update/",
    element: <UserUpdate />,
  },
  {
    path: "branch/",
    element: <BranchIndex />,
  },
  {
    path: "branch/:branch_id/update",
    element: <BranchUpdate />,
  },
  {
    path: "branch/create/",
    element: <BranchCreate />,
  },
];

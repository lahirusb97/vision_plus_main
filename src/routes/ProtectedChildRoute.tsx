import { Outlet } from "react-router";

export default function ProtectedChildRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

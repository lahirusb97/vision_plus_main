import { Navigate, Outlet } from "react-router";

const PublicRoute: React.FC = () => {
  const token = false; // Assuming this is how you're getting the token

  return token ? <Navigate to="/" replace /> : <Outlet />;
};
export default PublicRoute;

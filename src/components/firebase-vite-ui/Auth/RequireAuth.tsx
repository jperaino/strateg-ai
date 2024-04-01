// Based on https://github.com/remix-run/react-router/tree/main/examples/auth

import { useAuthContext } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

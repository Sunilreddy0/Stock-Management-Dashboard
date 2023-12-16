import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../AuthGaurd";

function MyRoute() {
  const { user } = useAuth();
  return (!user ?<Navigate to={"/login"} />:<Outlet />);
}

export default MyRoute;
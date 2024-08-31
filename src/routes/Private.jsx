import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export const Private = () => {
  const location = useLocation();
  const Authenticated = location.state?.Authenticated || false;

  return <>{Authenticated ?( <Outlet />) : (<>
  <h1>404 Not Found</h1>
  <p>back to<RouterLink to="/">Login</RouterLink>? </p>

  </>)}</>;
};

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = ({ isSuperUserRequired, ...rest }: any) => {
  let { user }: any = useContext(AuthContext);
  const location = useLocation();

  return isSuperUserRequired && !user?.is_superuser ? (
    <>
      <Navigate to={"/admin"} state={{ from: location }} replace />
      {localStorage.removeItem("authTokens")}
    </>
  ) : !user?.is_active ? (
    <>
      <Navigate to={"/login"} state={{ from: location }} replace />
      {localStorage.removeItem("authTokens")}
    </>
  ) : (
    <Outlet {...rest} />
  );
};

export default PrivateRoutes;

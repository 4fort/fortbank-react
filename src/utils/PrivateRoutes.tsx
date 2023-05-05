import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }: any) => {
  const authenticated = false;
  return authenticated ? <Outlet {...rest} /> : <Navigate to={"/admin"} />;
};

export default PrivateRoutes;

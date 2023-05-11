import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = ({ children, ...rest }: any) => {
  let { user }: any = useContext(AuthContext);
  return user ? <Outlet {...rest} /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;

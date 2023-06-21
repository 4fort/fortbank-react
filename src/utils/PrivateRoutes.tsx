import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = ({ isSuperUserRequired, ...rest }: any) => {
  let { user, logout, setUnauthorized }: any = useContext(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuperUserRequired && !user?.is_superuser) {
      setUnauthorized(true);
      logout();
      navigate("/admin", { state: { from: location }, replace: true });
    } else if (!user?.is_active) {
      setUnauthorized(true);
      logout();
      navigate("/login", { state: { from: location }, replace: true });
      console.log("here");
    }
  }, [isSuperUserRequired, user, logout, navigate, location]);

  if (isSuperUserRequired && !user?.is_superuser) {
    return null;
  } else if (!user?.is_active) {
    return null;
  }

  return <Outlet {...rest} />;
};

export default PrivateRoutes;

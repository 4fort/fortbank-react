import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "login";

  const handleLoad = () => {
    localStorage.removeItem("authTokens");
    navigate(from, { replace: true });
  };
  return <div onLoad={handleLoad}>Unauthorized</div>;
};

export default Unauthorized;

import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../Interfaces/interfaces";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: Props) => {
  const baseUrl: string = "http://127.0.0.1:8000";

  const [authTokens, setAuthTokens] = useState<
    AuthContextType["authTokens"] | null
  >(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );
  const [user, setUser] = useState<AuthContextType["user"] | null>(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens")!)
      : null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  const navigate = useNavigate();

  let login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let response = await fetch("/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("admin/dashboard");
      setUnauthorized(false);

      setLoading(false);
    } else {
      setUnauthorized(true);

      setLoading(false);
    }
  };

  let logout = () => {
    setLoading(true);

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("admin");

    setLoading(false);
  };

  let updateToken = async () => {
    let response = await fetch(`${baseUrl}api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setUnauthorized(false);
    } else {
      setUnauthorized(true);
      logout();
    }
  };

  let contextData: AuthContextType = {
    baseUrl: baseUrl,
    user: user,
    authTokens: authTokens,
    login: login,
    logoutAdmin: logout,
    loading: loading,
    setLoading: setLoading,
    unauthorized: unauthorized,
  };

  useEffect(() => {
    let updateInterval = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, updateInterval);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <>
      {loading ? (
        <div className='loadingScreen'>
          <div className='lds-ripple'>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <AuthContext.Provider value={contextData}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

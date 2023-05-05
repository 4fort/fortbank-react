import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  let loginAdmin = async (e: any) => {
    e.preventDefault();
    let response = await fetch("/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(data.access);
    } else {
      console.log("error");
    }
  };

  let contextData = {
    loginAdmin: loginAdmin,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from "react";
import {
  ChildProp,
  ClientContextType,
  FortbankUser,
} from "../Interfaces/interfaces";
import AuthContext from "./AuthContext";
import axios from "axios";

const ClientContext = createContext<ClientContextType | null>(null);
export default ClientContext;

export const ClientProvider = ({ children }: ChildProp) => {
  let { baseUrl, user, authTokens } = useContext(AuthContext);

  const [userLoggedIn, setUserLoggedIn] = useState<FortbankUser>();

  useEffect(() => {
    if (user) getUserInfo();
    return;
  }, [user]);

  let getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/users/${user?.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens?.access),
          },
        }
      );
      setUserLoggedIn(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  let clientContextData = {
    userLoggedIn: userLoggedIn,
  };
  return (
    <ClientContext.Provider value={clientContextData}>
      {children}
    </ClientContext.Provider>
  );
};

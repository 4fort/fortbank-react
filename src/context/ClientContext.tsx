import { createContext, useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  ChildProp,
  ClientContextType,
  FortbankUser,
} from "../Interfaces/interfaces";
import AuthContext from "./AuthContext";
import axios from "axios";
import { getBalance } from "../utils/adapters";

const ClientContext = createContext<ClientContextType | null>(null);
export default ClientContext;

export const ClientProvider = ({ children }: ChildProp) => {
  let { baseUrl, user, authTokens } = useContext<AuthContextType | null>(
    AuthContext
  ) ?? {
    baseUrl: "",
    user: {
      user_id: "",
    },
    authTokens: null,
  };

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

  const [userBalance, setUserBalance] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (userLoggedIn && authTokens) {
        const data = await getBalance(userLoggedIn.id, authTokens);
        data && setUserBalance(Number(data.balance));
      }
    };
    fetchData();
  }, [userLoggedIn?.transactionhistory_set]);

  let clientContextData = {
    userLoggedIn: userLoggedIn!,
    userBalance: userBalance,
    setUserBalance: setUserBalance,
  };
  return (
    <ClientContext.Provider value={clientContextData}>
      {children}
    </ClientContext.Provider>
  );
};

import { createContext } from "react";
import { ChildProp, ClientContextType } from "../Interfaces/interfaces";

const ClientContext = createContext<ClientContextType | null>(null);
export default ClientContext;

export const ClientProvider = ({ children }: ChildProp) => {
  let clientContextData = {};
  return (
    <ClientContext.Provider value={clientContextData}>
      {children}
    </ClientContext.Provider>
  );
};

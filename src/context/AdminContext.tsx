import { createContext, useState } from "react";

export const AdminContext = createContext({});

export const AdminContextProvider = ({ children }) => {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [balance, setBalance] = useState("");

  let contextData = {
    ownerName: ownerName,
    email: email,
    cardNum: cardNum,
    cardPin: cardPin,
    balance: balance,
  };

  return (
    <AdminContext.Provider value={contextData}>
      {children}
    </AdminContext.Provider>
  );
};

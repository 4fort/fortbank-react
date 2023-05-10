import { createContext, useContext, useState, useRef, useEffect } from "react";
import { FortbankUser } from "../Interfaces/interfaces";
import { User } from "../Models/UserModel";
import Admin from "../pages/admin/Admin";
import AuthContext from "./AuthContext";

const AdminContext = createContext({});
export default AdminContext;

export const AdminProvider = ({ children }) => {
  let { baseUrl, user, authTokens }: any = useContext(AuthContext);

  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [balance, setBalance] = useState("");

  const [modalMethod, setModalMethod] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<FortbankUser | {}>({});

  const dialogRef = useRef(null);

  const handleShowModal = () => {
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    setSelectedUser({});

    setOwnerName("");
    setEmail("");
    setCardNum("");
    setCardPin("");
    setBalance("");

    dialogRef.current.close();
  };

  const [fortbankUsers, setFortbankUsers] = useState<FortbankUser[]>([]);

  useEffect(() => {
    getUsers();
  }, [fortbankUsers]);

  const getUsers = async () => {
    let response = await fetch(`${baseUrl}/api/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    let data = await response.json();
    setFortbankUsers(data);
  };

  const addUser = async (user: User) => {
    // await fetch(`${baseUrl}/api/users/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + String(authTokens.access),
    //   },
    //   body: JSON.stringify(user),
    // });
  };

  let selectedUserValues = {
    owner_name: ownerName,
    email: email,
    card_num: cardNum,
    card_pin: cardPin,
    balance: balance,
  };

  let adminContextData = {
    ownerName: ownerName,
    email: email,
    cardNum: cardNum,
    cardPin: cardPin,
    balance: balance,

    setOwnerName: setOwnerName,
    setEmail: setEmail,
    setCardNum: setCardNum,
    setCardPin: setCardPin,
    setBalance: setBalance,

    selectedUserValues: selectedUserValues,

    modalMethod: modalMethod,
    setModalMethod: setModalMethod,

    selectedUser: selectedUser,
    setSelectedUser: selectedUser,

    dialogRef: dialogRef,
    handleCloseModal: handleCloseModal,
    handleShowModal: handleShowModal,

    fortbankUsers: fortbankUsers,
    setFortbankUsers: setFortbankUsers,

    getUsers: getUsers,
    addUser: addUser,
  };

  return (
    <AdminContext.Provider value={adminContextData}>
      {children}
    </AdminContext.Provider>
  );
};

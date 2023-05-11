import { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import {
  AdminContextType,
  AuthContextType,
  FortbankUser,
  ChildProp,
} from "../Interfaces/interfaces";
import { User } from "../Models/UserModel";

const AdminContext = createContext<AdminContextType | null>(null);
export default AdminContext;

export const AdminProvider = ({ children }: ChildProp) => {
  let { baseUrl, user, authTokens } = useContext<AuthContextType | null>(
    AuthContext
  ) ?? { baseUrl: "", user: null, authTokens: null };

  const [userId, setUserId] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [balance, setBalance] = useState("");

  const [modalMethod, setModalMethod] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<FortbankUser | undefined>(
    undefined
  );

  const [isValidated, setIsValidated] = useState(true);

  const [query, setQuery] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShowModal = () => {
    if (dialogRef.current) {
      dialogRef.current?.showModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);

    setOwnerName("");
    setEmail("");
    setCardNum("");
    setCardPin("");
    setBalance("");

    setIsValidated(true);

    if (dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  const [fortbankUsers, setFortbankUsers] = useState<FortbankUser[]>([]);

  useEffect(() => {
    if (user) getUsers();
    return;
  }, [user]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      });
      setFortbankUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async (user: User) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users/`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      });
      setFortbankUsers([...fortbankUsers, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userId: number, updatedUserData: User) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/users/${userId}`,
        updatedUserData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens?.access),
          },
        }
      );
      setFortbankUsers(
        fortbankUsers.map((user: FortbankUser) =>
          user.id === userId ? response.data : user
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${baseUrl}/api/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      });
      setFortbankUsers(
        fortbankUsers.filter((user: FortbankUser) => user.id !== userId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getFilteredUsers = (query: string, users: FortbankUser[]) => {
    if (!query) {
      return users;
    }
    return users.filter(
      (user: FortbankUser) =>
        String(user.id).includes(query) ||
        user.owner_name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        String(user.card_num).includes(query) ||
        String(user.balance).includes(query)
    );
  };

  const filteredUsers: FortbankUser[] = getFilteredUsers(query, fortbankUsers);

  useEffect(() => {
    setUserId(selectedUser?.id || 0);
    setOwnerName(selectedUser?.owner_name || "");
    setEmail(selectedUser?.email || "");
    setCardNum(selectedUser?.card_num || "");
    setCardPin(selectedUser?.card_pin || "");
    setBalance(selectedUser?.balance || "");
  }, [selectedUser]);

  let selectedUserValues = {
    id: userId,
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
    setSelectedUser: setSelectedUser,

    dialogRef: dialogRef,
    handleCloseModal: handleCloseModal,
    handleShowModal: handleShowModal,

    fortbankUsers: fortbankUsers,
    setFortbankUsers: setFortbankUsers,

    getUsers: getUsers,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,

    query: query,
    setQuery: setQuery,
    filteredUsers: filteredUsers,

    isValidated: isValidated,
    setIsValidated: setIsValidated,
  };

  return (
    <AdminContext.Provider value={adminContextData}>
      {children}
    </AdminContext.Provider>
  );
};

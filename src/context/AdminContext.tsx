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
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [balance, setBalance] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [gender, setGender] = useState(0);
  const [civilStatus, setCivilStatus] = useState(0);
  const [address, setAddress] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const generateCardNumber = (userId: string): string => {
    let currentTime = new Date();
    let currentDayOfYear =
      (Date.UTC(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate()
      ) -
        Date.UTC(currentTime.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000;
    let secondThreeDigits = ("00" + currentDayOfYear).slice(-3);

    let thirdThreeDigits = ("00" + (parseInt(userId) % 1000)).slice(-3);

    let cardNumber = "456" + secondThreeDigits + thirdThreeDigits;

    return cardNumber;
  };

  const [modalMethod, setModalMethod] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<FortbankUser | null>(null);

  const [isValidated, setIsValidated] = useState(true);

  const [query, setQuery] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShowModal = () => {
    if (dialogRef.current) {
      dialogRef.current?.showModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);

    setUserId(0);
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setCardNum("");
    setCardPin("");
    setBalance("");
    setMobileNumber("");
    setBirthDate("");
    setGender(0);
    setCivilStatus(0);
    setAddress("");

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
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        String(user.useraccount?.card_num).includes(query) ||
        String(user.useraccount?.balance).includes(query) ||
        String(user.userprofile?.mobile_number).includes(query)
    );
  };

  const filteredUsers: FortbankUser[] = getFilteredUsers(query, fortbankUsers);

  useEffect(() => {
    setUserId(selectedUser?.id || fortbankUsers.slice(-1)[0]?.id);
    setFirstName(selectedUser?.first_name || "");
    setLastName(selectedUser?.last_name || "");
    setUsername(selectedUser?.username || "");
    setEmail(selectedUser?.email || "");
    setCardNum(
      selectedUser?.useraccount?.card_num ||
        generateCardNumber(String(userId + 1))
    );
    setCardPin(selectedUser?.useraccount?.card_pin || "");
    setBalance(selectedUser?.useraccount?.balance || "");
    setMobileNumber(selectedUser?.userprofile?.mobile_number || "");
    setBirthDate(selectedUser?.userprofile?.birthdate || "");
    setGender(selectedUser?.userprofile?.gender || 0);
    setCivilStatus(selectedUser?.userprofile?.civil_status || 0);
    setAddress(selectedUser?.userprofile?.address || "");
  }, [selectedUser, userId, fortbankUsers]);

  // useEffect(() => {
  //   setUserId(selectedUser?.id || 0);
  //   setFirstName(selectedUser?.first_name || "");
  //   setLastName(selectedUser?.last_name || "");
  //   setEmail(selectedUser?.email || "");
  //   setCardNum(String(selectedUser?.useraccount?.card_num) || "");
  //   setCardPin(String(selectedUser?.useraccount?.card_pin) || "");
  //   setBalance(String(selectedUser?.useraccount?.balance) || "");
  //   setMobileNumber(String(selectedUser?.userprofile?.mobile_number) || "");
  //   setBirthDate(selectedUser?.userprofile?.birthdate || "");
  //   setGender(selectedUser?.userprofile?.gender || 0);
  //   setCivilStatus(selectedUser?.userprofile?.civil_status || 0);
  //   setAddress(selectedUser?.userprofile?.address || "");
  // }, [selectedUser]);

  let selectedUserValues = {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    useraccount: {
      card_num: cardNum,
      card_pin: cardPin,
      balance: balance,
    },
    userprofile: {
      mobile_number: mobileNumber,
      birthdate: birthdate,
      gender: gender,
      civil_status: civilStatus,
      address: address,
    },
    last_login: lastLogin,
  };

  let adminContextData = {
    setFirstName: setFirstName,
    setLastName: setLastName,
    setUsername: setUsername,
    setEmail: setEmail,
    setCardNum: setCardNum,
    setCardPin: setCardPin,
    setBalance: setBalance,
    setMobileNumber: setMobileNumber,
    setBirthDate: setBirthDate,
    setGender: setGender,
    setCivilStatus: setCivilStatus,
    setAddress: setAddress,

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

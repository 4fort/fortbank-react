import { User } from "../Models/UserModel";

export interface UserAccount {
  card_num: string;
  card_pin: string;
  balance: string;
}

export interface UserProfile {
  mobile_number: string;
  birthdate: string;
  gender: number;
  civil_status: number;
  address: string;
}

export interface FortbankUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  useraccount: UserAccount;
  userprofile: UserProfile;
  last_login: string;
}

export interface AuthContextType {
  baseUrl: string;
  user: {
    username: string | null;
  } | null;
  authTokens: {
    access: string | null;
    refresh: string | null;
  } | null;
  loginAdmin: (e: React.FormEvent<HTMLFormElement>) => void;
  logoutAdmin: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  unauthorized: boolean;
}

export interface AdminContextType {
  // first_name: string;
  // last_name: string;
  // username: string;
  // email: string;
  // cardNum: string;
  // cardPin: string;
  // balance: string;
  // mobile_number: string;
  // birthdate: string;
  // gender: number;
  // civil_status: number;
  // address: string;

  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setCardNum: React.Dispatch<React.SetStateAction<string>>;
  setCardPin: React.Dispatch<React.SetStateAction<string>>;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setBirthDate: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<number>>;
  setCivilStatus: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;

  selectedUserValues: FortbankUser;

  modalMethod: number;
  setModalMethod: React.Dispatch<React.SetStateAction<number>>;

  selectedUser: FortbankUser | undefined;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<FortbankUser | undefined>
  >;

  dialogRef: React.MutableRefObject<DialogRefInterface | null>;

  handleCloseModal: () => void;
  handleShowModal: () => void;

  fortbankUsers: FortbankUser[];
  setFortbankUsers: React.Dispatch<React.SetStateAction<FortbankUser[]>>;

  getUsers: () => void;
  addUser: (user: User) => void;
  updateUser: (userId: number, user: User) => void;
  deleteUser: (userId: number) => void;

  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredUsers: FortbankUser[];

  isValidated: boolean;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DialogRefInterface extends HTMLDialogElement {
  showModal: () => void;
  close: () => void;
}

export type Validate = (e: string) => string | undefined;

export type ChildProp = {
  children: React.ReactNode;
};

export interface ClientContextType {}

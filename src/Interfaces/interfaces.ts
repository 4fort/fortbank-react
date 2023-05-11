import { User } from "../Models/UserModel";

export interface FortbankUser {
  id: number;
  owner_name: string;
  email: string;
  card_num: string;
  card_pin: string;
  balance: string;
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
  ownerName: string;
  email: string;
  cardNum: string;
  cardPin: string;
  balance: string;

  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setCardNum: React.Dispatch<React.SetStateAction<string>>;
  setCardPin: React.Dispatch<React.SetStateAction<string>>;
  setBalance: React.Dispatch<React.SetStateAction<string>>;

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

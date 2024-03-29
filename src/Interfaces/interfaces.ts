import { ChangeEvent } from "react";
import { User } from "../Models/UserModel";

export interface UserWallet {
  balance: string;
}

export interface UserAccount {
  brand: string;
  card_num: string;
  card_pin: string;
  date_added: string;
}

export interface UserCards extends UserAccount {
  id: number;
}

export interface ModifiedUserAccount
  extends Omit<UserAccount, "brand" | "date_added"> {}

export interface UserProfile {
  mobile_number: string;
  birthdate: string;
  gender: number;
  civil_status: number;
  address: string;
}

export interface TransactionTicket {
  reference_id: number;
  user: number;
}

export interface UserTransactions {
  id: number;
  sent_to: string;
  amount: number;
  previous_balance: number;
  transaction_type: string;
  transaction_date: string;
}

export interface FortbankUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  userwallet: UserWallet;
  useraccount_set: [UserAccount];
  userprofile: UserProfile;
  transactionticket_set: [TransactionTicket];
  transactionhistory_set: [UserTransactions];
  last_login: string;

  is_active: boolean | undefined;
  is_superuser: boolean | undefined;
}
interface ModifiedFortbankUser
  extends Omit<
    FortbankUser,
    "transactionticket_set" | "useraccount_set" | "transactionhistory_set"
  > {}

export interface UserToken {
  user_id: number;
  username: string;
  is_superuser: boolean;
  is_active: boolean;
}

export interface AuthTokensType {
  access: string;
  refresh: string;
}

export interface AuthContextType {
  baseUrl: string;
  user: UserToken | null;
  authTokens: AuthTokensType | null;
  loginAdmin: (e: React.FormEvent<HTMLFormElement>) => void;
  logoutAdmin: () => void;
  register: (e: React.FormEvent<HTMLFormElement>) => void;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  logout: () => void;
  setUnauthorized: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  unauthorized: boolean;

  isValidated: boolean;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;

  isOTP: boolean;
  setIsOTP: React.Dispatch<React.SetStateAction<boolean>>;
  OTPInput: string;
  setOTPInput: React.Dispatch<React.SetStateAction<string>>;
  verifyOTP: (e: ChangeEvent<HTMLInputElement>) => void;
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
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setBirthDate: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<number>>;
  setCivilStatus: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuperUser: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  password_confirm: string;

  selectedUserValues: ModifiedFortbankUser;

  modalMethod: number;
  setModalMethod: React.Dispatch<React.SetStateAction<number>>;

  selectedUser: FortbankUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<FortbankUser | null>>;

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

  // isValidated: boolean;
  // setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DialogRefInterface extends HTMLDialogElement {
  showModal: () => void;
  close: () => void;
}

export type Validate = (e: string, x?: string) => string | undefined;

export type ChildProp = {
  children: React.ReactNode;
};

export interface ClientContextType {
  userLoggedIn: FortbankUser;
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
}

export interface UserPreferencesType {
  sidePanelState: boolean;
  balanceVisibility: boolean;
}

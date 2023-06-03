import axios from "axios";
import {
  AuthTokensType,
  FortbankUser,
  ModifiedUserAccount,
  TransactionTicket,
  UserAccount,
  UserCards,
  UserTransactions,
  UserWallet,
} from "../Interfaces/interfaces";
import { User } from "../Models/UserModel";
import { baseUrl, bankUrl } from "../context/GlobalVars";

export const getUser = async (
  userId: number,
  authTokens: AuthTokensType
): Promise<FortbankUser | null> => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateWholeUser = async (
  userId: number,
  updatedUserData: User,
  authTokens: AuthTokensType
): Promise<FortbankUser | null> => {
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
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBalance = async (
  userId: number,
  authTokens: AuthTokensType
): Promise<UserWallet | null> => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/wallet/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface newBalance {
  balance: number;
}

export const updateBalance = async (
  userId: number,
  newBalance: newBalance,
  authTokens: AuthTokensType
): Promise<UserWallet | null> => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/users/updatebalance/${userId}`,
      newBalance,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getTicket = async (
  reference_id: number,
  authTokens: AuthTokensType
): Promise<TransactionTicket | null> => {
  try {
    const response = await axios.get(`${baseUrl}/api/tickets/${reference_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCard = async (
  userId: number,
  authTokens: AuthTokensType
): Promise<UserCards[] | null> => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/account/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addCard = async (
  userId: number,
  cardDetails: ModifiedUserAccount,
  authTokens: AuthTokensType
): Promise<UserAccount | null> => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/account/${userId}`,
      cardDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateCard = async (
  userId: number,
  cardDetails: ModifiedUserAccount,
  authTokens: AuthTokensType
): Promise<UserAccount | null> => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/users/account/${userId}`,
      cardDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteCard = async (
  userId: number,
  cardDetails: ModifiedUserAccount,
  authTokens: AuthTokensType
): Promise<UserAccount | null> => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/users/account/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
        data: cardDetails,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface PaymentData {
  user1: number;
  user2: number;
  amount: number;
}

export const TransacPayment = async (
  data: PaymentData,
  authTokens: AuthTokensType
): Promise<UserWallet | null> => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/transaction/payment`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface AddFundsData {
  user: number;
  card_num: number;
  card_pin: number;
  amount: number;
}

export const addFunds = async (
  data: AddFundsData,
  authTokens: AuthTokensType
): Promise<UserWallet | null> => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/transaction/addfunds`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const CashOutFunds = async (
  data: AddFundsData,
  authTokens: AuthTokensType
): Promise<UserWallet | null> => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/transaction/cashoutfunds`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHistorySet = async (
  userId: number,
  authTokens: AuthTokensType
): Promise<UserTransactions[] | null> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/transaction/history/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

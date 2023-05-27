import axios from "axios";
import {
  AuthTokensType,
  FortbankUser,
  TransactionTicket,
  UserAccount,
} from "../Interfaces/interfaces";
import { User } from "../Models/UserModel";
import { baseUrl } from "../context/GlobalVars";

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
): Promise<UserAccount | null> => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/users/${userId}/updatebalance`,
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

interface newBalance {
  useraccount: {
    balance: number;
  };
}

export const updateBalance = async (
  userId: number,
  newBalance: newBalance,
  authTokens: AuthTokensType
): Promise<UserAccount | null> => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/users/${userId}/updatebalance`,
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

import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ClientContext from "../../../context/ClientContext";
import {
  AuthContextType,
  ClientContextType,
  UserTransactions,
  UserWallet,
} from "../../../Interfaces/interfaces";
import {
  TbSquareRoundedArrowDownFilled,
  TbSquareRoundedArrowUpFilled,
} from "react-icons/tb";
import { getHistorySet } from "../../../utils/Transactions";
import AuthContext from "../../../context/AuthContext";

const Transactions = () => {
  let { authTokens } = useContext<AuthContextType | null>(AuthContext) ?? {
    authTokens: null,
  };
  let { userLoggedIn } = useContext<ClientContextType | null>(
    ClientContext
  ) ?? {
    userLoggedIn: {
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      useraccount_set: [
        {
          card_num: "",
          card_pin: "",
          date_added: "",
        },
      ],
      userwallet: {
        balance: "",
      },
      userprofile: {
        mobile_number: "",
        birthdate: "",
        gender: 0,
        civil_status: 0,
        address: "",
      },
      transactionhistory_set: [
        {
          id: 0,
          user: 0,
          sent_to: "",
          amount: 0,
          previous_balance: 0,
          transaction_type: "",
          transaction_date: "",
        },
      ],
      last_login: "",
    },
  };

  const [transactionHistory, setTransactionHistory] = useState<
    UserTransactions[] | null
  >([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (userLoggedIn?.id) {
        const data = await getHistorySet(userLoggedIn.id, authTokens!);
        setTransactionHistory(data);
      }
    };

    fetchData();
  }, [userLoggedIn, authTokens]);

  return (
    <div className='main-panel transactions'>
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>Recent Activity</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory
            ?.slice()
            .reverse()
            .map((e) => {
              let date = new Date(e.transaction_date);
              let currentDate = new Date();

              let displayDate;
              if (date.toDateString() === currentDate.toDateString()) {
                displayDate = date.toLocaleTimeString(undefined, {
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                  second: undefined,
                });
              } else {
                let yesterday = new Date(currentDate);
                yesterday.setDate(currentDate.getDate() - 1);

                if (date.toDateString() === yesterday.toDateString()) {
                  displayDate = "Yesterday";
                } else {
                  displayDate = date.toLocaleString();
                }
              }

              return (
                <tr key={e.id} className='activity'>
                  <td>
                    <div className='type'>
                      {e.transaction_type === "Pay" ? (
                        <TbSquareRoundedArrowUpFilled />
                      ) : (
                        <TbSquareRoundedArrowDownFilled />
                      )}
                      <div className=''>
                        <span>{e.transaction_type}</span>
                        <span>
                          {e.transaction_type === "Pay" ? (
                            <p>Payment sent to @{e.sent_to}</p>
                          ) : (
                            <p>Received payment from @{e.sent_to}</p>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='amount'>
                      <span
                        style={
                          e.transaction_type === "Pay"
                            ? { color: "red" }
                            : { color: "green" }
                        }
                      >
                        {e.transaction_type !== "Pay" ? "+" : "-"} ₱
                        {e.amount.toLocaleString("en-US")}
                      </span>
                      <span>₱{e.previous_balance.toLocaleString("en-US")}</span>
                      <span>{displayDate}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

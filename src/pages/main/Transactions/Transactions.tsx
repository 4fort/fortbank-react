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
  TbCreditCard,
  TbSquareRoundedArrowDownFilled,
  TbSquareRoundedArrowUpFilled,
  TbWallet,
} from "react-icons/tb";
import { getHistorySet } from "../../../utils/Transactions";
import AuthContext from "../../../context/AuthContext";
import HistoryRow from "../../../components/HistoryRow";
import ClientModal from "../../../components/ClientModal";

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

  const [isModal, setIsModal] = useState(false);
  const [modalMode, setModalMode] = useState(3);
  const modalProps = {
    modalMode: modalMode,
  };

  const selectedActivityData: UserTransactions = {
    id: 0,
    sent_to: "",
    amount: 0,
    previous_balance: 0,
    transaction_type: "",
    transaction_date: "",
  };
  const [selectedActivity, setSelectedActivity] =
    useState<UserTransactions>(selectedActivityData);

  const [transactionHistory, setTransactionHistory] = useState<
    UserTransactions[] | null
  >(userLoggedIn?.transactionhistory_set);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (userLoggedIn) {
        const data = await getHistorySet(userLoggedIn.id, authTokens!);
        setTransactionHistory(data);
      }
    };

    fetchData();
  }, [userLoggedIn?.transactionhistory_set]);

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
                  let time = date.toLocaleTimeString(undefined, {
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric",
                    second: undefined,
                  });
                  displayDate = `Yesterday at ${time}`;
                } else {
                  displayDate = date.toLocaleString();
                }
              }

              return (
                <HistoryRow
                  key={e.id}
                  id={e.id}
                  transaction_type={e.transaction_type}
                  sent_to={e.sent_to}
                  amount={e.amount}
                  previous_balance={e.previous_balance}
                  displayDate={displayDate}
                  transaction_date={date.toLocaleString()}
                  setIsModal={setIsModal}
                  setModalMode={setModalMode}
                  setSelectedActivity={setSelectedActivity}
                />
              );
            })}
        </tbody>
      </table>
      {isModal ? (
        <ClientModal
          setIsModal={setIsModal}
          modalProps={modalProps}
          selectedActivity={selectedActivity}
        />
      ) : null}
    </div>
  );
};

export default Transactions;

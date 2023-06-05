import { useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  ClientContextType,
  UserAccount,
  UserCards,
  UserTransactions,
} from "../../../Interfaces/interfaces";
import ClientContext from "../../../context/ClientContext";
import { getCard, getHistorySet } from "../../../utils/Transactions";
import AuthContext from "../../../context/AuthContext";
import ATMCard from "../../../components/ATMCard";
import { useNavigate } from "react-router-dom";
import ClientModal from "../../../components/ClientModal";
import {
  TbCreditCard,
  TbSquareRoundedArrowDownFilled,
  TbSquareRoundedArrowUpFilled,
  TbWallet,
} from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import HistoryRow from "../../../components/HistoryRow";

const Card = () => {
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
          id: 0,
          brand: "",
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

  const navigate = useNavigate();

  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [modalMode, setModalMode] = useState(0);
  const selectedCard = {
    card_num: cardNum,
    card_pin: cardPin,
  };
  const modalProps = {
    setCardNum: setCardNum,
    setCardPin: setCardPin,
    modalMode: modalMode,
    setModalMode: setModalMode,
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
    useState(selectedActivityData);

  const [userCards, setUserCards] = useState<UserCards[] | null>(
    userLoggedIn?.useraccount_set as UserCards[]
  );
  useEffect(() => {
    const fetchData = async () => {
      if (userLoggedIn && authTokens) {
        const data = await getCard(userLoggedIn.id, authTokens);
        setUserCards(data);
      }
    };
    fetchData();
  }, [userLoggedIn?.useraccount_set, isModal]);

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

  const getFilteredHistory = (histories: UserTransactions[] | null) => {
    return histories?.filter((e) => {
      return (
        e.transaction_type.toLowerCase().includes("transfer") ||
        e.transaction_type.toLowerCase().includes("funds")
      );
    });
  };
  const filtereredHistory = getFilteredHistory(transactionHistory);

  return (
    <>
      {isModal ? (
        <ClientModal
          setIsModal={setIsModal}
          selectedCard={selectedCard}
          selectedActivity={selectedActivity}
          modalProps={modalProps}
        />
      ) : null}
      <div className='main-panel no-card-section user-account'>
        <h1>Account</h1>
        <div className='container'>
          <div className='cards'>
            {userCards &&
              userCards?.map((e) => {
                return (
                  <ATMCard
                    setIsModal={setIsModal}
                    modalProps={modalProps}
                    selectedCard={selectedCard}
                    key={e.id}
                    brand={e.brand}
                    card_num={e.card_num}
                    card_pin={e.card_pin}
                    date_added={e.date_added}
                  />
                );
              })}
            <div
              className='add_card'
              onClick={() => {
                setIsModal(true);
                setModalMode(0);
              }}
            >
              <p>Add card</p>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='recent-transactions transactions'>
              <table>
                <thead>
                  <tr>
                    <th>Recent Card Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {filtereredHistory
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
            </div>
            <div
              className={!userCards?.length ? "actions disabled" : "actions"}
            >
              <div
                className='add-funds'
                onClick={() => navigate("/card/add-funds")}
              >
                <span>
                  <TbWallet />
                </span>
                Add funds
              </div>
              <div
                className='transfer-to-bank'
                onClick={() => navigate("/card/transfer-to-bank")}
              >
                <span>
                  <TbCreditCard />
                </span>
                Transfer to bank
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

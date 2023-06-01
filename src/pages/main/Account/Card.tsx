import { useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  ClientContextType,
  UserAccount,
  UserCards,
} from "../../../Interfaces/interfaces";
import ClientContext from "../../../context/ClientContext";
import { getCard } from "../../../utils/Transactions";
import AuthContext from "../../../context/AuthContext";
import ATMCard from "../../../components/ATMCard";
import { useNavigate } from "react-router-dom";
import AddCard from "./AddCard";

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

  return (
    <>
      {isModal ? (
        <AddCard
          setIsModal={setIsModal}
          selectedCard={selectedCard}
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
        </div>
      </div>
    </>
  );
};

export default Card;

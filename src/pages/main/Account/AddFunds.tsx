import { useContext, useState, useEffect } from "react";
import { TbChevronLeft } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import {
  AuthContextType,
  ClientContextType,
  UserCards,
} from "../../../Interfaces/interfaces";
import AuthContext from "../../../context/AuthContext";
import ClientContext from "../../../context/ClientContext";
import { getCard } from "../../../utils/Transactions";
import ATMCard from "../../../components/ATMCard";

const AddFunds = () => {
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
  }, [userLoggedIn?.useraccount_set]);

  const [cardNum, setCardNum] = useState("456123");
  const [cardPin, setCardPin] = useState("");
  const selectedCard = {
    card_num: cardNum,
    card_pin: cardPin,
  };
  const modalProps = {
    setCardNum: setCardNum,
  };

  let cardsSize: number = userCards?.length! + 1;
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(cardsSize - 2);

  const nextCard = () => {
    if (startSlice < 4) {
      setStartSlice(startSlice + 1);
      setEndSlice(endSlice + 1);
    } else {
      setStartSlice(0);
      setEndSlice(cardsSize - 2);
    }
  };
  console.log(startSlice, endSlice);

  return (
    <div className='main-panel pay'>
      <h1>
        Account
        <NavLink to='/card'>
          <TbChevronLeft /> Return
        </NavLink>
      </h1>
      <div className='container carousel'>
        <div className='cards'>
          {userCards &&
            userCards
              ?.map((e) => {
                return (
                  <ATMCard
                    selectedCard={selectedCard}
                    modalProps={modalProps}
                    key={e.id}
                    brand={e.brand}
                    card_num={e.card_num}
                    card_pin={e.card_pin}
                    date_added={e.date_added}
                  />
                );
              })
              .slice(startSlice, endSlice)
              .concat(
                userCards
                  ?.map((e) => {
                    return (
                      <ATMCard
                        selectedCard={selectedCard}
                        modalProps={modalProps}
                        key={e.id}
                        brand={e.brand}
                        card_num={e.card_num}
                        card_pin={e.card_pin}
                        date_added={e.date_added}
                      />
                    );
                  })
                  .slice(0, endSlice >= 5 ? endSlice - 4 : 0)
              )}
        </div>
        <button>prev</button>
        <button onClick={() => nextCard()}>next</button>
        <div className='options'>
          <input type='text' />
          <button>add funds</button>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;

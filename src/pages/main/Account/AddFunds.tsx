import { useContext, useState, useEffect, useCallback } from "react";
import {
  TbChevronLeft,
  TbSquareRoundedChevronLeft,
  TbSquareRoundedChevronRight,
} from "react-icons/tb";
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

import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";

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

  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");
  const selectedCard = {
    card_num: cardNum,
    card_pin: cardPin,
  };
  const modalProps = {
    setCardNum: setCardNum,
    setCardPin: setCardPin,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
    },
    [ClassNames({ selected: "selected" })]
  );
  useEffect(() => {
    console.log("here");
    if (emblaApi) {
      console.log(emblaApi.slidesInView());
    }
  }, [emblaApi]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='main-panel add-funds'>
      <h1>
        Account
        <NavLink to='/card'>
          <TbChevronLeft /> Return
        </NavLink>
      </h1>
      <div className='container carousel' ref={emblaRef}>
        <div className='cards'>
          {userCards &&
            userCards?.map((e) => {
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
            })}
        </div>
      </div>
      <div className='bottom-container'>
        <div className='nav-btns'>
          <TbSquareRoundedChevronLeft onClick={scrollPrev} />
          <TbSquareRoundedChevronRight onClick={scrollNext} />
        </div>
        <div className='options'>
          <label htmlFor='amount'>Amount</label>
          <input type='text' />
          <button onClick={() => console.log(selectedCard)}>add funds</button>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;

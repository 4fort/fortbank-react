import { useContext, useState, useEffect } from "react";
import {
  TbChevronLeft,
  TbCircleCheck,
  TbCircleX,
  TbExclamationCircle,
} from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AuthContextType,
  ClientContextType,
  UserCards,
} from "../../../Interfaces/interfaces";
import AuthContext from "../../../context/AuthContext";
import ClientContext from "../../../context/ClientContext";
import { addFunds, getCard } from "../../../utils/adapters";
import ATMCard from "../../../components/ATMCard";
import {
  selectedAmountValidator,
  selectedCardValidator,
} from "../../../utils/FormValidator";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { timeoutInterval } from "../../../context/GlobalVars";

import { toast } from "react-toastify";

const AddFunds = () => {
  let { authTokens } = useContext<AuthContextType | null>(AuthContext) ?? {
    authTokens: null,
  };
  let { userLoggedIn, setUserBalance } = useContext<ClientContextType | null>(
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
    setUserBalance: (e: number) => {},
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

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

  const presetAmount = [100, 300, 500, 1000, 5000, 10000];
  const [amount, setAmount] = useState(0);
  let cardError: string | undefined;
  let amountError: string | undefined;
  const [cardErrorMsg, setCardErrorMsg] = useState("");
  const [amountErrorMsg, setAmountErrorMsg] = useState("");

  useEffect(() => {
    if (cardNum && cardPin) {
      setCardErrorMsg("");
    }
    if (amount !== 0) {
      setAmountErrorMsg("");
    }
  }, [selectedCard]);

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      user: userLoggedIn.id,
      card_num: Number(cardNum),
      card_pin: Number(cardPin),
      amount: amount,
    };
    cardError = selectedCardValidator(data);
    setCardErrorMsg(cardError!);
    amountError = selectedAmountValidator(data.amount);
    setAmountErrorMsg(amountError!);

    if (cardError === undefined && amountError === undefined) {
      let newBalance;
      try {
        newBalance = await addFunds(data, authTokens!);
      } catch (error: any) {
        setLoading(false);
        return toast.error(
          `Failed to add funds. Server response: ${
            error.response.data.message === undefined
              ? "Service provider unreachable"
              : error.response.data.message
          }`,
          {
            className: "toast tst",
          }
        );
      }

      toast.success("Successfully added funds to your account.", {
        className: "toast tst",
      });
      setUserBalance(Number(newBalance.balance));
      setLoading(false);
      setIsSuccessful(true);
      setTimeout(() => {
        return navigate("/card");
      }, timeoutInterval);
    }

    console.log(data);
    console.log(cardError);
    setLoading(false);
    return;
  };
  return (
    <>
      <div className='main-panel pay'>
        {loading ? (
          <Loading />
        ) : isSuccessful ? (
          <Alert
            className='success-screen'
            msg={alertMsg}
            icon={<TbCircleCheck />}
            title='Success!'
          />
        ) : isFail ? (
          <Alert
            className='fail-screen'
            msg={alertMsg}
            icon={<TbCircleX />}
            title='Fail!'
          />
        ) : (
          <>
            <h1>
              Cards
              <NavLink to='/card'>
                <TbChevronLeft /> Return
              </NavLink>
            </h1>
            <div className='container carousel'>
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
              <div className='options'>
                <div className='presets'>
                  {presetAmount.map((e) => {
                    return (
                      <div
                        className={
                          amount === e
                            ? "preset-amount selected"
                            : "preset-amount"
                        }
                        onClick={() => {
                          setAmount(e);
                        }}
                        key={e}
                      >
                        {e}
                      </div>
                    );
                  })}
                </div>
                <div className='pro-tip'>
                  <span>
                    <TbExclamationCircle />
                    <p>
                      Tip: Click the card and amount above you wish to add funds
                      to
                    </p>
                  </span>
                </div>
                <div className='custom'>
                  {/* <input type='text' onChange={(e) => setAmount(e.target.value)} /> */}
                  {cardErrorMsg || amountErrorMsg ? (
                    <div className='error'>
                      {cardErrorMsg ? (
                        <span>
                          <TbExclamationCircle />
                          {cardErrorMsg}
                        </span>
                      ) : null}
                      {amountErrorMsg ? (
                        <span>
                          <TbExclamationCircle />
                          {amountErrorMsg}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <button onClick={handleSubmit}>add funds</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddFunds;

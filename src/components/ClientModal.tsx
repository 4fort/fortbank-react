import { useContext, useState } from "react";
import {
  AuthContextType,
  ClientContextType,
  ModifiedUserAccount,
} from "../Interfaces/interfaces";
import AuthContext from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import {
  TbAlertCircle,
  TbAlertCircleFilled,
  TbChevronLeft,
  TbExclamationCircle,
  TbX,
} from "react-icons/tb";
import { addCard, deleteCard, updateCard } from "../utils/Transactions";
import ClientContext from "../context/ClientContext";
import ATMCard from "./ATMCard";
import { cardNumValidator, cardPinValidator } from "../utils/FormValidator";

import { ToastContainer, toast } from "react-toastify";

interface Props {
  setIsModal: (e: boolean) => void;
  selectedCard?: {
    card_num?: string;
    card_pin?: string;
  };
  modalProps?: {
    setCardNum?: (e: string) => void;
    setCardPin?: (e: string) => void;
    modalMode?: number;
    setModalMode?: (e: number) => void;
  };
  selectedActivity?: {
    id: number;
    sent_to: string;
    amount: number;
    previous_balance: number;
    transaction_type: string;
    transaction_date: string;
  };
}

const ClientModal = (props: Props) => {
  let { authTokens } = useContext<AuthContextType | null>(AuthContext) ?? {
    authTokens: null,
  };
  let { userLoggedIn, userBalance } = useContext<ClientContextType | null>(
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
    userBalance: 0,
  };

  const { setIsModal, modalProps, selectedCard, selectedActivity } = props;

  let today = new Date();
  let [cardNumError, setCardNumError] = useState<String | undefined>(undefined);
  let [cardPinError, setCardPinError] = useState<String | undefined>(undefined);
  let NumError: string | undefined;
  let PinError: string | undefined;
  let cardDetails: ModifiedUserAccount = {
    card_num: selectedCard?.card_num!,
    card_pin: selectedCard?.card_pin!,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data);
    console.log(payload);

    cardDetails = {
      card_num: String(payload.card_num),
      card_pin: String(payload.card_pin),
    };
    NumError = cardNumValidator(cardDetails.card_num);
    PinError = cardPinValidator(cardDetails.card_pin);

    setCardNumError(cardNumValidator(cardDetails.card_num));
    setCardPinError(cardPinValidator(cardDetails.card_pin));
    if (
      (cardNumError !== undefined && cardPinError !== undefined) ||
      (NumError && PinError)
    ) {
      console.log(NumError);
      console.log(NumError);
      return;
    }
    if (modalProps?.modalMode === 1) {
      let edited;
      try {
        edited = await updateCard(userLoggedIn.id, cardDetails, authTokens!);
      } catch (error) {
        return toast.error("Failed to edit card. Card isn't verified.", {
          className: "toast tst",
        });
      }
      modalProps.setCardNum!("");
      modalProps.setCardPin!("");
      setIsModal(false);
      return toast.success("Card edited successfully", {
        className: "toast tst",
      });
    }

    const isExist = userLoggedIn.useraccount_set.some((e) => {
      return e.card_num == cardDetails.card_num;
    });

    if (isExist) {
      toast.error("Card already exist in your account", {
        className: "toast tst",
      });
      console.log("Account already exists");
      return;
    } else if (!isExist) {
      let added;
      try {
        added = await addCard(userLoggedIn.id, cardDetails, authTokens!);
      } catch (error) {
        return toast.error("Failed to add card. Card is invalid.", {
          className: "toast tst",
        });
      }

      modalProps?.setCardNum!("");
      modalProps?.setCardPin!("");
      setIsModal(false);
      return toast.success(
        `Card successfully ${
          modalProps?.modalMode === 0 ? "added" : "edited"
        } to your account`,
        {
          className: "toast tst",
        }
      );
    }
  };

  const printIt = (e: string) => {
    let win = window.open();
    self.focus();
    win?.document.open();
    win?.document.write(e);
    win?.document.close();
    win?.print();
    win?.close();
  };

  const modalMode = ["Add Card", "Edit Card"];
  return (
    <div className='modal-container'>
      <div className='modal'>
        {modalProps?.modalMode === 2 ? (
          <div className='delete-card'>
            <TbAlertCircle className='alert-icon' />
            <p>Are You Sure You want to delete this card?</p>
            <ATMCard
              setIsModal={setIsModal}
              modalProps={modalProps}
              selectedCard={selectedCard}
              brand='...'
              card_num={selectedCard?.card_num ? selectedCard.card_num : "..."}
              card_pin={selectedCard?.card_pin ? selectedCard.card_pin : "..."}
              date_added={String(today)}
            />
            <div className='buttons'>
              <button
                className='yes'
                onClick={() => {
                  toast.success("Card deleted in your account", {
                    className: "toast tst",
                  });
                  modalProps?.setCardNum!("");
                  modalProps?.setCardPin!("");
                  deleteCard(userLoggedIn.id, cardDetails, authTokens!);
                  setIsModal(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  modalProps?.setCardNum!("");
                  modalProps?.setCardPin!("");
                  setIsModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : modalProps?.modalMode === 0 || modalProps?.modalMode === 1 ? (
          <>
            <span className='title'>
              <h3>{modalMode[modalProps?.modalMode!]}</h3>
              <TbX
                onClick={() => {
                  setIsModal(false);
                  modalProps?.setCardNum!("");
                  modalProps?.setCardPin!("");
                }}
              />
            </span>
            <div className='card-preview'>
              <ATMCard
                setIsModal={setIsModal}
                modalProps={modalProps}
                selectedCard={selectedCard}
                brand='...'
                card_num={
                  selectedCard?.card_num ? selectedCard.card_num : "..."
                }
                card_pin={
                  selectedCard?.card_pin ? selectedCard.card_pin : "..."
                }
                date_added={String(today)}
              />
            </div>
            <form action='' onSubmit={handleSubmit}>
              <label htmlFor='card_num'>Card Number</label>
              <input
                type='text'
                id='card_num'
                name='card_num'
                value={selectedCard ? selectedCard.card_num : undefined}
                onChange={(e) => {
                  modalProps?.setCardNum!(e.target.value);
                  setCardNumError(cardNumValidator(e.target.value));
                }}
              />
              {cardNumError ? (
                <span className='error'>
                  <TbExclamationCircle />
                  {cardNumError}
                </span>
              ) : null}
              <label htmlFor='card_pin'>Card PIN</label>
              <input
                type='text'
                id='card_pin'
                name='card_pin'
                value={selectedCard ? selectedCard.card_pin : undefined}
                onChange={(e) => {
                  modalProps?.setCardPin!(e.target.value);
                  setCardPinError(cardPinValidator(e.target.value));
                }}
              />
              {cardPinError ? (
                <span className='error'>
                  <TbExclamationCircle />
                  {cardPinError}
                </span>
              ) : null}
              <button
                className={cardNumError || cardPinError ? "btn disabled" : ""}
              >
                {modalMode[modalProps?.modalMode!]}
              </button>
            </form>
          </>
        ) : modalProps?.modalMode === 3 ? (
          <>
            <span className='title'>
              <h3>Activity Details</h3>
              <TbX
                onClick={() => {
                  setIsModal(false);
                }}
              />
            </span>
            <div className='activity-data'>
              <h3>
                {selectedActivity?.transaction_type === "Pay"
                  ? "Sent to"
                  : selectedActivity?.transaction_type === "Receive Payment"
                  ? "Received Payment From"
                  : selectedActivity?.transaction_type === "Add funds"
                  ? "Added funds from"
                  : selectedActivity?.transaction_type === "Transfer to bank"
                  ? "Transfered funds to"
                  : null}
                &nbsp;
                <span>
                  {selectedActivity?.transaction_type === "Pay" ||
                  selectedActivity?.transaction_type === "Receive Payment"
                    ? "@"
                    : null}
                  {selectedActivity?.sent_to}
                </span>
              </h3>

              <div className='row'>
                <span>Reference number:</span>
                <span>{selectedActivity?.id}</span>
              </div>
              {/* <div className='row'>
                <span>
                  {selectedActivity?.transaction_type === "Pay"
                    ? "Sent to:"
                    : selectedActivity?.transaction_type === "Receive Payment"
                    ? "Received Payment From:"
                    : selectedActivity?.transaction_type === "Add funds"
                    ? "Added funds from:"
                    : selectedActivity?.transaction_type === "Transfer to bank"
                    ? "Transfered funds to:"
                    : null}
                </span>
                <span>
                  {selectedActivity?.transaction_type === "Pay" ||
                  selectedActivity?.transaction_type === "Receive Payment"
                    ? "@"
                    : null}
                  {selectedActivity?.sent_to}
                </span>
              </div> */}
              <div className='row'>
                <span>Amount:</span>
                <span>₱{selectedActivity?.amount.toLocaleString("en-US")}</span>
              </div>
              <div className='row'>
                <span>Previous balance:</span>
                <span>{selectedActivity?.previous_balance}</span>
              </div>
              {/* <div className='row'>
                <span>Transaction Type:</span>
                <span>{selectedActivity?.transaction_type}</span>
              </div> */}
              <div className='row'>
                <span>Date & Time:</span>
                <span>{selectedActivity?.transaction_date}</span>
              </div>
              <button
                onClick={() => {
                  printIt(`
                <style>
                * {
                    font-family: monospace;
                    line-height: 5px;
                    font-size: 1.3rem;
                }
                h1 {
                    font-size: 2.1rem;
                }
                h1, h5 {
                    text-align: center;
                    margin: 20px;
                }
                span {
                    display: flex;
                    justify-content: space-between;
                }
                h4 {
                    text-transform: Capitalize;
                }
                .username {
                  text-transform: none;
                }
                </style>

                <hr>
                <br>
                <h1>FORTPAY</h1>
                <br>
                <hr>
                <span><h4>Date:</h4><h4>${
                  selectedActivity?.transaction_date
                }</h4></span>
                <span><h4>Customer Name:</h4><h4>${
                  userLoggedIn.first_name
                }&nbsp;${userLoggedIn.last_name}</h4></span>
                <span><h4>${
                  selectedActivity?.transaction_type === "Pay"
                    ? "Sent to:"
                    : selectedActivity?.transaction_type === "Receive Payment"
                    ? "Received Payment From:"
                    : selectedActivity?.transaction_type === "Add funds"
                    ? "Added funds from:"
                    : selectedActivity?.transaction_type === "Transfer to bank"
                    ? "Transfered funds to:"
                    : ""
                }</h4><h4 class='username'>${
                    selectedActivity?.transaction_type === "Pay" ||
                    selectedActivity?.transaction_type === "Receive Payment"
                      ? "@"
                      : ""
                  }${selectedActivity?.sent_to}</h4></span>
                <span><h4>Transaction:</h4><h4>${
                  selectedActivity?.transaction_type
                }</h4></span>
                <span><h4>Reference number:</h4><h4>${
                  selectedActivity?.id
                }</h4></span>
                <hr>
                <span><h2>Amount:</h2><h2>₱${
                  selectedActivity?.amount
                }</h2></span>
                <span><h4>Previous Balance:</h4><h4>₱${
                  selectedActivity?.previous_balance
                }</h4></span>
                <span><h4>Total Balance:</h4><h4>₱${
                  selectedActivity?.transaction_type == "Pay" ||
                  selectedActivity?.transaction_type === "Transfer to bank"
                    ? (
                        selectedActivity?.previous_balance -
                        selectedActivity?.amount
                      ).toFixed(2)
                    : (
                        selectedActivity?.previous_balance! +
                        selectedActivity?.amount!
                      ).toFixed(2)
                }</h4></span>
                <span><h4>Current Balance:</h4><h4>₱${userBalance}</h4></span>
                <hr>
                <h5>THANKS FOR USING MY ATM SYSTEM</h5>
                <h5>Sir Please Perfect Akong Score ^_^</h5>
                <h5>100/100</h5>
            `);
                }}
              >
                Print
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ClientModal;

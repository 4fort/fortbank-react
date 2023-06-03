import { useContext, useState } from "react";
import {
  AuthContextType,
  ClientContextType,
  ModifiedUserAccount,
} from "../../../Interfaces/interfaces";
import AuthContext from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import {
  TbAlertCircle,
  TbAlertCircleFilled,
  TbChevronLeft,
  TbExclamationCircle,
  TbX,
} from "react-icons/tb";
import { addCard, deleteCard, updateCard } from "../../../utils/Transactions";
import ClientContext from "../../../context/ClientContext";
import ATMCard from "../../../components/ATMCard";
import {
  cardNumValidator,
  cardPinValidator,
} from "../../../utils/FormValidator";

import { ToastContainer, toast } from "react-toastify";

interface Props {
  setIsModal: (e: boolean) => void;
  selectedCard: {
    card_num: string;
    card_pin: string;
  };
  modalProps: {
    setCardNum: (e: string) => void;
    setCardPin: (e: string) => void;
    modalMode: number;
    setModalMode: (e: number) => void;
  };
}

const AddCard = (props: Props) => {
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

  const { setIsModal, modalProps, selectedCard } = props;

  let today = new Date();
  let [cardNumError, setCardNumError] = useState<String | undefined>(undefined);
  let [cardPinError, setCardPinError] = useState<String | undefined>(undefined);
  let NumError: string | undefined;
  let PinError: string | undefined;
  let cardDetails: ModifiedUserAccount = {
    card_num: selectedCard.card_num,
    card_pin: selectedCard.card_pin,
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
    if (modalProps.modalMode === 1) {
      let edited = await updateCard(userLoggedIn.id, cardDetails, authTokens!);
      if (!edited) {
        return toast.error("Failed to edit card", {
          className: "toast tst",
        });
      }
      modalProps.setCardNum("");
      modalProps.setCardPin("");
      setIsModal(false);
      return;
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
      let added = await addCard(userLoggedIn.id, cardDetails, authTokens!);
      if (!added) {
        return toast.error("Failed to add card", {
          className: "toast tst",
        });
      }
      modalProps.setCardNum("");
      modalProps.setCardPin("");
      setIsModal(false);
      return toast.success(
        `Card successfully ${
          modalProps.modalMode === 0 ? "added" : "edited"
        } to your account`,
        {
          className: "toast tst",
        }
      );
    }
  };

  const modalMode = ["Add Card", "Edit Card"];
  return (
    <div className='modal-container'>
      <div className='modal'>
        {modalProps.modalMode === 2 ? (
          <div className='delete-card'>
            <TbAlertCircle className='alert-icon' />
            <p>Are You Sure You want to delete this card?</p>
            <ATMCard
              setIsModal={setIsModal}
              modalProps={modalProps}
              selectedCard={selectedCard}
              brand='...'
              card_num={selectedCard.card_num ? selectedCard.card_num : "..."}
              card_pin={selectedCard.card_pin ? selectedCard.card_pin : "..."}
              date_added={String(today)}
            />
            <div className='buttons'>
              <button
                className='yes'
                onClick={() => {
                  toast.success("Card deleted in your account", {
                    className: "toast tst",
                  });
                  modalProps.setCardNum("");
                  modalProps.setCardPin("");
                  deleteCard(userLoggedIn.id, cardDetails, authTokens!);
                  setIsModal(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  modalProps.setCardNum("");
                  modalProps.setCardPin("");
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className='title'>
              <p>{modalMode[modalProps.modalMode]}</p>
              <TbX
                onClick={() => {
                  setIsModal(false);
                  modalProps.setCardNum("");
                  modalProps.setCardPin("");
                }}
              />
            </span>
            <div className='card-preview'>
              <ATMCard
                setIsModal={setIsModal}
                modalProps={modalProps}
                selectedCard={selectedCard}
                brand='...'
                card_num={selectedCard.card_num ? selectedCard.card_num : "..."}
                card_pin={selectedCard.card_pin ? selectedCard.card_pin : "..."}
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
                  modalProps.setCardNum(e.target.value);
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
                  modalProps.setCardPin(e.target.value);
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
                {modalMode[modalProps.modalMode]}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCard;

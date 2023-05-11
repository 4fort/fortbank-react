import { useContext } from "react";
import { TbX } from "react-icons/tb";
import FormInput from "./FormInput";
import {
  ownerNameValidator,
  emailValidator,
  cardNumValidator,
  cardPinValidator,
  balanceValidator,
} from "../utils/FormValidator";
import { User } from "../Models/UserModel";
import AdminContext from "../context/AdminContext";
import { AdminContextType } from "../Interfaces/interfaces";

const Modal = () => {
  let {
    setOwnerName,
    setEmail,
    setCardNum,
    setCardPin,
    setBalance,
    dialogRef,
    modalMethod,

    handleCloseModal,

    selectedUserValues,

    addUser,
    updateUser,

    setIsValidated,
  } = useContext<AdminContextType | null>(AdminContext) ?? {
    setOwnerName: () => {},
    setEmail: () => {},
    setCardNum: () => {},
    setCardPin: () => {},
    setBalance: () => {},
    dialogRef: {
      current: null,
      showModal: () => {},
      close: () => {},
    },
    modalMethod: 0,

    handleCloseModal: () => {},

    selectedUserValues: {
      id: 0,
      owner_name: "",
      email: "",
      card_num: "",
      card_pin: "",
      balance: "",
    },

    addUser: () => {},
    updateUser: () => {},

    setIsValidated: () => {},
  };

  const modalMethods = ["Add User", "Update User"];

  let ownerNameError: string | undefined;
  let emailError: string | undefined;
  let cardNumError: string | undefined;
  let cardPinError: string | undefined;
  let balanceError: string | undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ownerNameError = ownerNameValidator(selectedUserValues.owner_name);
    emailError = emailValidator(selectedUserValues.email);
    cardNumError = cardNumValidator(String(selectedUserValues.card_num));
    cardPinError = cardPinValidator(String(selectedUserValues.card_pin));
    balanceError = balanceValidator(String(selectedUserValues.balance));

    if (
      ownerNameError ||
      emailError ||
      cardNumError ||
      cardPinError ||
      balanceError
    ) {
      if (ownerNameError) {
        console.log(ownerNameError);
      }
      if (emailError) {
        console.log(emailError);
      }
      if (cardNumError) {
        console.log(cardNumError);
      }
      if (cardPinError) {
        console.log(cardPinError);
      }
      if (balanceError) {
        console.log(balanceError);
      }
      setIsValidated(false);
      return;
    }

    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data);

    let user = new User("", "", 0, 0, 0);

    let cardNum = parseInt(String(payload.card_num).replace(/-/g, ""));
    let cardPin = parseInt(String(payload.card_pin));
    if (isNaN(cardNum) || isNaN(cardPin)) {
      console.log("cardNum or cardPin is not a number");
    } else {
      user = new User(
        String(payload.owner_name),
        String(payload.email),
        cardNum,
        cardPin,
        parseFloat(String(payload.balance))
      );
    }

    if (modalMethod === 0) {
      addUser(user);
    } else if (modalMethod === 1) {
      updateUser(selectedUserValues.id, user);
    }
  };

  return (
    <dialog ref={dialogRef}>
      <div>
        <span>{modalMethods[modalMethod]}</span>
        <TbX onClick={handleCloseModal} />
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          labelFor='owner_name'
          inputType='text'
          inputLabel='Full Name'
          value={selectedUserValues.owner_name}
          onInputChange={setOwnerName}
          validate={ownerNameValidator}
        />
        <FormInput
          labelFor='email'
          inputType='text'
          inputLabel='Email'
          value={selectedUserValues.email}
          onInputChange={setEmail}
          validate={emailValidator}
        />
        <FormInput
          labelFor='card_num'
          inputType='text'
          inputLabel='Card Num'
          value={selectedUserValues.card_num}
          onInputChange={setCardNum}
          validate={cardNumValidator}
        />
        <FormInput
          labelFor='card_pin'
          inputType='text'
          inputLabel='Card Pin'
          value={selectedUserValues.card_pin}
          onInputChange={setCardPin}
          validate={cardPinValidator}
        />
        <FormInput
          labelFor='balance'
          inputType='text'
          inputLabel='Balance'
          value={selectedUserValues.balance}
          onInputChange={setBalance}
          validate={balanceValidator}
        />
        <button type='submit'>{modalMethods[modalMethod]}</button>
      </form>
    </dialog>
  );
};

export default Modal;

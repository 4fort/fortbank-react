import { useState, useContext } from "react";
import { TbX } from "react-icons/tb";
import {
  FortbankUser,
  FormInputInterface,
  FormValuesInterface,
} from "../Interfaces/interfaces";
import FormInput from "./FormInput";
import {
  ownerNameValidator,
  emailValidator,
  cardNumValidator,
  cardPinValidator,
  balanceValidator,
} from "../utils/FormValidator";
import { User } from "../Models/UserModel";
import AuthContext from "../context/AuthContext";
import AdminContext from "../context/AdminContext";

interface PropsStruct {
  dialogRef: any;
  modalMethods: Array<string>;
  modalMethod: number;
  handleCloseModal: void;
  selectedUserValues: FortbankUser;
  selectedUser: FortbankUser;
}

const Modal = (props: any) => {
  let {
    setOwnerName,
    setEmail,
    setCardNum,
    setCardPin,
    setBalance,
    dialogRef,

    selectedUserValues,

    addUser,
  }: any = useContext(AdminContext);

  const modalMethods = ["Add User", "Update User"];

  const { modalMethod, handleCloseModal } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ownerNameError = ownerNameValidator(selectedUserValues.owner_name);
    const emailError = emailValidator(selectedUserValues.email);
    const cardNumError = cardNumValidator(String(selectedUserValues.card_num));
    const cardPinError = cardPinValidator(String(selectedUserValues.card_pin));
    const balanceError = balanceValidator(String(selectedUserValues.balance));

    if (
      ownerNameError ||
      emailError ||
      cardNumError ||
      cardPinError ||
      balanceError
    ) {
      if (ownerNameError) {
        console.log("Error in Name");
      }
      if (emailError) {
        console.log("Error in Email");
      }
      if (cardNumError) {
        console.log("Error in Card Num");
      }
      if (cardPinError) {
        console.log("Error in Card Pin");
      }
      if (balanceError) {
        console.log("Error in Balance");
      }
      return;
    }

    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data);
    console.log(payload);

    let user = new User(
      payload.owner_name,
      payload.email,
      parseInt(payload.card_num.replace(/-/g, "")),
      parseInt(payload.card_pin),
      parseFloat(payload.balance)
    );

    addUser(user);

    console.log(user);

    handleCloseModal();
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

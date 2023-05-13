import { useContext } from "react";
import { TbX } from "react-icons/tb";
import FormInput from "./FormInput";
import * as validator from "../utils/FormValidator";
import { User } from "../Models/UserModel";
import AdminContext from "../context/AdminContext";
import { AdminContextType } from "../Interfaces/interfaces";
import SelectInput from "./SelectInput";

const Modal = () => {
  let {
    setFirstName,
    setLastName,
    setUsername,
    setEmail,
    setCardNum,
    setCardPin,
    setBalance,
    setMobileNumber,
    setBirthDate,
    setGender,
    setCivilStatus,
    setAddress,

    dialogRef,
    modalMethod,

    handleCloseModal,

    selectedUserValues,

    addUser,
    updateUser,

    setIsValidated,
  } = useContext<AdminContextType | null>(AdminContext) ?? {
    setFirstName: () => {},
    setLastName: () => {},
    setUsername: () => {},
    setEmail: () => {},
    setCardNum: () => {},
    setCardPin: () => {},
    setBalance: () => {},
    setMobileNumber: () => {},
    setBirthDate: () => {},
    setGender: () => {},
    setCivilStatus: () => {},
    setAddress: () => {},
    dialogRef: {
      current: null,
      showModal: () => {},
      close: () => {},
    },
    modalMethod: 0,

    handleCloseModal: () => {},

    selectedUserValues: {
      id: 0,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      useraccount: {
        card_num: "",
        card_pin: "",
        balance: "",
      },
      userprofile: {
        mobile_number: "",
        birthdate: "",
        gender: 0,
        civil_status: 0,
        address: "",
      },
    },

    addUser: () => {},
    updateUser: () => {},

    setIsValidated: () => {},
  };

  const modalMethods = ["Add User", "Update User"];

  let firstNameError: string | undefined;
  let lastNameError: string | undefined;
  let usernameError: string | undefined;
  let emailError: string | undefined;
  let cardNumError: string | undefined;
  let cardPinError: string | undefined;
  let balanceError: string | undefined;
  let mobileNumberError: string | undefined;
  let birthdateError: string | undefined;
  let genderError: string | undefined;
  let civilStatusError: string | undefined;
  let addressError: string | undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    firstNameError = validator.firstNameValidator(
      selectedUserValues.first_name
    );
    lastNameError = validator.lastNameValidator(selectedUserValues.last_name);
    usernameError = validator.usernameValidator(selectedUserValues.username);
    emailError = validator.emailValidator(selectedUserValues.email);
    cardNumError = validator.cardNumValidator(
      String(selectedUserValues.useraccount.card_num)
    );
    cardPinError = validator.cardPinValidator(
      String(selectedUserValues.useraccount.card_pin)
    );
    balanceError = validator.balanceValidator(
      String(selectedUserValues.useraccount.balance)
    );
    mobileNumberError = validator.mobileNumberValidator(
      selectedUserValues.userprofile.mobile_number
    );
    birthdateError = validator.birthdateValidator(
      selectedUserValues.userprofile.birthdate
    );
    genderError = validator.genderValidator(
      String(selectedUserValues.userprofile.gender)
    );
    civilStatusError = validator.civilStatusValidator(
      String(selectedUserValues.userprofile.civil_status)
    );
    addressError = validator.addressValidator(
      selectedUserValues.userprofile.address
    );

    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      cardNumError ||
      cardPinError ||
      balanceError ||
      mobileNumberError ||
      birthdateError ||
      genderError ||
      civilStatusError ||
      addressError
    ) {
      if (firstNameError) {
        console.log(firstNameError);
      }
      if (lastNameError) {
        console.log(lastNameError);
      }
      if (usernameError) {
        console.log(usernameError);
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
      if (mobileNumberError) {
        console.log(mobileNumberError);
      }
      if (birthdateError) {
        console.log(birthdateError);
      }
      if (genderError) {
        console.log(genderError);
      }
      if (civilStatusError) {
        console.log(civilStatusError);
      }
      if (addressError) {
        console.log(addressError);
      }
      setIsValidated(false);
      return;
    }

    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data);
    console.log(payload);

    let cardNum = parseInt(String(payload.card_num).replace(/-/g, ""));
    let user = new User(
      String(payload.username),
      String(payload.first_name),
      String(payload.last_name),
      String(payload.email),
      cardNum,
      Number(payload.card_pin),
      Number(payload.balance),
      Number(payload.mobile_number),
      String(payload.birthdate),
      Number(payload.gender),
      Number(payload.civil_status),
      String(payload.address)
    );

    console.log(JSON.stringify(user));

    if (modalMethod === 0) {
      addUser(user);
    } else if (modalMethod === 1) {
      updateUser(selectedUserValues.id, user);
    }
  };

  return (
    <dialog ref={dialogRef}>
      <div className='actionLabel'>
        <span>{modalMethods[modalMethod]}</span>
        <TbX onClick={handleCloseModal} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='firstSection'>
          <div className='nameInputs'>
            <span className='fieldTitle'>Name Fields</span>
            <div className='nameFields'>
              <div>
                <FormInput
                  labelFor='first_name'
                  inputType='text'
                  inputLabel='First Name'
                  value={selectedUserValues.first_name}
                  onInputChange={setFirstName}
                  validate={validator.firstNameValidator}
                />
              </div>
              <div>
                <FormInput
                  labelFor='last_name'
                  inputType='text'
                  inputLabel='Last Name'
                  value={selectedUserValues.last_name}
                  onInputChange={setLastName}
                  validate={validator.lastNameValidator}
                />
              </div>
            </div>
            <FormInput
              labelFor='username'
              inputType='text'
              inputLabel='Username'
              value={selectedUserValues.username}
              onInputChange={setUsername}
              validate={validator.usernameValidator}
            />
            <FormInput
              labelFor='email'
              inputType='text'
              inputLabel='Email'
              value={selectedUserValues.email}
              onInputChange={setEmail}
              validate={validator.emailValidator}
            />
            <FormInput
              labelFor='mobile_number'
              inputType='text'
              inputLabel='Mobile Number'
              value={selectedUserValues.userprofile.mobile_number}
              onInputChange={setMobileNumber}
              validate={validator.mobileNumberValidator}
            />
          </div>
          <div className='profileInputs'>
            <span className='fieldTitle'>Profile Fields</span>
            <FormInput
              labelFor='birthdate'
              inputType='date'
              inputLabel='Date of Birth'
              value={selectedUserValues.userprofile.birthdate}
              onInputChange={setBirthDate}
              validate={validator.birthdateValidator}
            />
            <SelectInput
              labelFor='gender'
              inputLabel='Gender'
              value={selectedUserValues.userprofile.gender}
              onInputChange={setGender}
              validate={validator.genderValidator}
            />
            <SelectInput
              labelFor='civil_status'
              inputLabel='Civil Status'
              value={selectedUserValues.userprofile.civil_status}
              onInputChange={setCivilStatus}
              validate={validator.civilStatusValidator}
            />
            <FormInput
              labelFor='address'
              inputType='text'
              inputLabel='Address'
              value={selectedUserValues.userprofile.address}
              onInputChange={setAddress}
              validate={validator.addressValidator}
            />
          </div>
          <div className='accountInputs'>
            <span className='fieldTitle'>Bank Account Fields</span>
            <FormInput
              labelFor='card_num'
              inputType='text'
              inputLabel='Card Num'
              value={selectedUserValues.useraccount.card_num}
              onInputChange={setCardNum}
              validate={validator.cardNumValidator}
            />
            <FormInput
              labelFor='card_pin'
              inputType='text'
              inputLabel='Card Pin'
              value={selectedUserValues.useraccount.card_pin}
              onInputChange={setCardPin}
              validate={validator.cardPinValidator}
            />
            <FormInput
              labelFor='balance'
              inputType='text'
              inputLabel='Balance'
              value={selectedUserValues.useraccount.balance}
              onInputChange={setBalance}
              validate={validator.balanceValidator}
            />
          </div>
        </div>
        <button type='submit'>{modalMethods[modalMethod]}</button>
      </form>
    </dialog>
  );
};

export default Modal;

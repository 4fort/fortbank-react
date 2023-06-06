import { useContext, useState, ChangeEvent } from "react";
import { AuthContextType } from "../Interfaces/interfaces";
import AuthContext from "../context/AuthContext";
import FormInput from "../components/FormInput";
import SelectInput from "../components/SelectInput";
import * as validator from "../utils/FormValidator";

const Register = () => {
  const context = useContext<AuthContextType | null>(AuthContext) ?? {
    isValidated: null,
    register: () => {},
    isOTP: null,
    setIsOTP: () => {},
    OTPInput: "",
    setOTPInput: () => {},
    verifyOTP: (e: ChangeEvent<HTMLInputElement>) => {},
    loading: null,
    setLoading: (e: boolean) => {},
  };
  const {
    isValidated,
    register,
    isOTP,
    setIsOTP,
    OTPInput,
    setOTPInput,
    verifyOTP,
    loading,
    setLoading,
  } = context;

  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [gender, setGender] = useState(0);
  const [civilStatus, setCivilStatus] = useState(0);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  return (
    <div className='registerWrapper'>
      {isOTP ? (
        <div className='OTP'>
          <span className='title'>Enter your OTP</span>
          <div className='firstSection'>
            <input type='text' value={OTPInput} onChange={verifyOTP} />
          </div>
        </div>
      ) : (
        <form onSubmit={register}>
          <span className='title'>Register</span>
          <div className='firstSection'>
            <div className='nameInputs'>
              <span className='fieldTitle'>Name Fields</span>
              <div className='nameFields'>
                <div>
                  <FormInput
                    labelFor='first_name'
                    inputType='text'
                    inputLabel='First Name'
                    onInputChange={setFirstName}
                    value={firstName}
                    validate={validator.firstNameValidator}
                  />
                </div>
                <div>
                  <FormInput
                    labelFor='last_name'
                    inputType='text'
                    inputLabel='Last Name'
                    onInputChange={setLastName}
                    value={lastName}
                    validate={validator.lastNameValidator}
                  />
                </div>
              </div>
              <FormInput
                labelFor='username'
                inputType='text'
                inputLabel='Username'
                onInputChange={setUsername}
                value={username}
                validate={validator.usernameValidator}
              />
              <FormInput
                labelFor='email'
                inputType='text'
                inputLabel='Email'
                onInputChange={setEmail}
                value={email}
                validate={validator.emailValidator}
              />
              <FormInput
                labelFor='mobile_number'
                inputType='text'
                inputLabel='Mobile Number'
                onInputChange={setMobileNumber}
                value={mobileNumber}
                validate={validator.mobileNumberValidator}
              />
            </div>
            <div className='profileInputs'>
              <span className='fieldTitle'>Profile Fields</span>
              <FormInput
                labelFor='birthdate'
                inputType='date'
                inputLabel='Date of Birth'
                onInputChange={setBirthDate}
                value={birthdate}
                validate={validator.birthdateValidator}
              />
              <SelectInput
                labelFor='gender'
                inputLabel='Gender'
                onInputChange={setGender}
                value={gender}
                validate={validator.genderValidator}
              />
              <SelectInput
                labelFor='civil_status'
                inputLabel='Civil Status'
                onInputChange={setCivilStatus}
                value={civilStatus}
                validate={validator.civilStatusValidator}
              />
              <FormInput
                labelFor='address'
                inputType='text'
                inputLabel='Address'
                onInputChange={setAddress}
                value={address}
                validate={validator.addressValidator}
              />
            </div>
            <div className='accountInputs'>
              <span className='fieldTitle'>Other Fields</span>
              <FormInput
                labelFor='password'
                inputType='password'
                inputLabel='Password'
                value={password}
                onInputChange={setPassword}
                validate={validator.passwordValidator}
              />
              <FormInput
                labelFor='password_confirm'
                inputType='password'
                inputLabel='Confirm Password'
                value={password_confirm}
                onInputChange={setPasswordConfirm}
                value2={password}
                validate2={validator.passwordConfirmValidator}
              />
              <div id='recaptcha-container'></div>
            </div>
          </div>
          <button type='submit' disabled={isValidated ? false : true}>
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;

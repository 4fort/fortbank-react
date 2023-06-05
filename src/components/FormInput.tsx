import { useEffect, useState, useContext } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import AdminContext from "../context/AdminContext";
import {
  AdminContextType,
  AuthContextType,
  Validate,
} from "../Interfaces/interfaces";
import AuthContext from "../context/AuthContext";

type OnInputChange = (e: string) => void;

interface Props {
  labelFor: string;
  inputType: string;
  inputLabel: string;
  value: string;
  value2?: string;
  validate?: Validate;
  validate2?: Validate;
  onInputChange: OnInputChange;
}

const FormInput = (props: Props) => {
  const {
    labelFor,
    inputType,
    inputLabel,
    value,
    value2,
    validate,
    validate2,
    onInputChange,
  } = props;

  let { isValidated } = useContext<AuthContextType | null>(AuthContext) ?? {
    isValidated: null,
  };

  const [errorPrompt, setErrorPrompt] = useState<string | undefined>("");
  useEffect(() => {
    !isValidated
      ? validate2
        ? setErrorPrompt(validate2!(String(value), String(value2)))
        : setErrorPrompt(validate!(String(value)))
      : setErrorPrompt("");
  }, [isValidated]);

  return (
    <>
      <label htmlFor={labelFor}>{inputLabel}</label>
      {labelFor === "card_num" ? (
        <>
          <input
            id={labelFor}
            name={labelFor}
            type={inputType}
            value={value}
            readOnly
            className='disabled'
          />
          {errorPrompt ? (
            <span className='error'>
              <TbExclamationCircle />
              {errorPrompt}
            </span>
          ) : null}
        </>
      ) : (
        <>
          <input
            id={labelFor}
            name={labelFor}
            type={inputType}
            value={value}
            onChange={(e) => {
              validate2
                ? setErrorPrompt(
                    validate2!(String(e.target.value), String(value2))
                  )
                : setErrorPrompt(validate!(String(e.target.value)));
              onInputChange(e.target.value);
            }}
          />
          {errorPrompt ? (
            <span className='error'>
              <TbExclamationCircle />
              {errorPrompt}
            </span>
          ) : null}
        </>
      )}
    </>
  );
};

export default FormInput;

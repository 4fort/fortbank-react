import { useEffect, useState, useContext } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import AdminContext from "../context/AdminContext";
import {
  AdminContextType,
  AuthContextType,
  Validate,
} from "../Interfaces/interfaces";
import AuthContext from "../context/AuthContext";

type OnInputChange = (e: number) => void;

interface Props {
  labelFor: string;
  inputLabel: string;
  value?: number;
  validate: Validate;
  onInputChange: OnInputChange;
}

const SelectInput = (props: Props) => {
  const { labelFor, inputLabel, value, validate, onInputChange } = props;

  let { isValidated } = useContext<AuthContextType | null>(AuthContext) ?? {
    isValidated: null,
  };

  const [errorPrompt, setErrorPrompt] = useState<string | undefined>("");
  useEffect(() => {
    !isValidated ? setErrorPrompt(validate(String(value))) : setErrorPrompt("");
  }, [isValidated]);

  return (
    <>
      <label htmlFor={labelFor}>{inputLabel}</label>
      <select
        name={labelFor}
        id={labelFor}
        value={value}
        onChange={(e) => {
          setErrorPrompt(validate(String(e.target.value)));
          onInputChange(Number(e.target.value));
        }}
      >
        {labelFor == "gender" ? (
          <>
            <option value='0' disabled>
              Select an option
            </option>
            <option value='1'>Male</option>
            <option value='2'>Female</option>
            <option value='3'>Other</option>
          </>
        ) : null}
        {labelFor == "civil_status" ? (
          <>
            <option value='0' disabled>
              Select an option
            </option>
            <option value='1'>Single</option>
            <option value='2'>Married</option>
            <option value='3'>Widowed</option>
            <option value='4'>Divorced</option>
          </>
        ) : null}
      </select>
      {errorPrompt ? (
        <span className='error'>
          <TbExclamationCircle />
          {errorPrompt}
        </span>
      ) : null}
    </>
  );
};

export default SelectInput;

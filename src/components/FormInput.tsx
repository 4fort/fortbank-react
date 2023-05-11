import { useEffect, useState, useContext } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import AdminContext from "../context/AdminContext";
import { AdminContextType, Validate } from "../Interfaces/interfaces";

type OnInputChange = (e: string) => void;

interface Props {
  labelFor: string;
  inputType: string;
  inputLabel: string;
  value: string;
  validate: Validate;
  onInputChange: OnInputChange;
}

const FormInput = (props: Props) => {
  const { labelFor, inputType, inputLabel, value, validate, onInputChange } =
    props;

  let { isValidated } = useContext<AdminContextType | null>(AdminContext) ?? {
    isValidated: null,
  };

  const [errorPrompt, setErrorPrompt] = useState<string | undefined>("");
  useEffect(() => {
    !isValidated ? setErrorPrompt(validate(String(value))) : setErrorPrompt("");
  }, [isValidated]);

  return (
    <>
      <label htmlFor={labelFor}>{inputLabel}</label>
      <input
        id={labelFor}
        name={labelFor}
        type={inputType}
        value={value}
        onChange={(e) => {
          setErrorPrompt(validate(String(e.target.value)));
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
  );
};

export default FormInput;

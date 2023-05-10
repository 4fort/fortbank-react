import { useEffect, useState, useContext } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import AdminContext from "../context/AdminContext";

type Validate = (e: string | undefined) => string;
type OnInputChange = (e: string) => string;

interface Props {
  labelFor: string;
  inputType: string;
  inputLabel: string;
  value: string;
  validate: Validate;
  onInputChange: OnInputChange;
  isValidated: boolean;
}

const FormInput = (props: Props) => {
  const { labelFor, inputType, inputLabel, value, validate, onInputChange } =
    props;

  let { isValidated } = useContext(AdminContext);

  const [errorPrompt, setErrorPrompt] = useState("");
  useEffect(() => {
    !isValidated ? setErrorPrompt(validate("")) : setErrorPrompt("");
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
          setErrorPrompt(validate(e.target.value));
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

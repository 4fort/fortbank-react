import { useState } from "react";
import { TbExclamationCircle } from "react-icons/tb";

const FormInput = (props) => {
  const [errorPrompt, setErrorPrompt] = useState("");
  const { labelFor, inputType, inputLabel, value, validate, onInputChange } =
    props;
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

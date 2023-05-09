export interface FortbankUser {
  id: number;
  owner_name: string;
  email: string;
  card_num: string;
  card_pin: string;
  balance: string;
}

export interface FormInputInterface {
  id: string;
  type: string;
  label: string;
  labelFor: keyof FormValues; // Add this line to allow accessing properties using a string key
  value?: string;
  options?: string[];
  inputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FormValuesInterface = {
  owner_name: string;
  email: string;
  card_num: number;
  card_pin: number;
  balance: number;
};

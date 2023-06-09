import { Validate } from "../Interfaces/interfaces";

export const firstNameValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "First name is required";
  }
  if (!/^[a-zA-Z .]+$/.test(e)) {
    return "First name should only contain letters and spaces";
  }
  return undefined;
};

export const lastNameValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "Last name is required";
  }
  if (!/^[a-zA-Z .]+$/.test(e)) {
    return "Last name should only contain letters and spaces";
  }
  return undefined;
};

export const usernameValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "Username is required";
  }
  if (!/^[a-zA-Z0-9_-]{3,20}$/.test(e)) {
    return "Username should only contain letters, numbers, underscores, and hyphens and be between 3 and 20 characters long";
  }
  return undefined;
};

export const emailValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "Email is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return "Invalid email address";
  }
  return undefined;
};

export const cardNumValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "Card Num is required";
  }
  if (!/^[0-9]{6}(-[0-9]{1,4})?$/.test(e)) {
    return "Card Num must be a 6-digit number optionally separated by a dash";
  }
  return undefined;
};

export const cardPinValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "Card Pin is required";
  }
  if (!/^[0-9]{4}$/.test(e)) {
    return "Card Pin must be a 4-digit number";
  }
  return undefined;
};

export const balanceValidator: Validate = (e: string) => {
  if (!e.trim()) {
    return "Balance is required";
  }
  if (isNaN(Number(e))) {
    return "Balance must be a number";
  }
  if (Number(e) < 0) {
    return "Balance must be a positive number";
  }
  return undefined;
};

export const mobileNumberValidator: Validate = (e: string) => {
  if (!e) {
    return "Mobile number is required";
  }
  const mobile = String(e);
  if (!mobile.trim()) {
    return "Mobile number is required";
  }
  if (!/^[0-9]{10}$/.test(mobile)) {
    return "Mobile number must be a 10-digit number";
  }
  return undefined;
};

export const birthdateValidator: Validate = (birthdate: string) => {
  if (!birthdate) {
    return "Birthdate is required";
  }

  const date = new Date(birthdate);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const ageInMs = 1000 * 60 * 60 * 24 * 365.25 * 18;

  if (diff < ageInMs) {
    return "The user must be at least 18 years old to register";
  }

  return undefined;
};

export const genderValidator: Validate = (gender: string) => {
  if (gender === undefined) {
    return "Gender is required";
  }

  if (gender < "1" || gender > "3") {
    return "Gender must be either Male, Female, or Other";
  }

  return undefined;
};

export const civilStatusValidator: Validate = (civil_status: string) => {
  if (civil_status === undefined) {
    return "Civil status is required";
  }

  if (civil_status < "1" || civil_status > "4") {
    return "Invalid civil status value";
  }

  return undefined;
};

export const addressValidator: Validate = (address: string) => {
  if (!address.trim()) {
    return "Address is required";
  }

  if (address.length < 10) {
    return "Address must be at least 10 characters long";
  }

  return undefined;
};

export const passwordValidator: Validate = (password: string) => {
  if (!password.trim()) {
    return "Password is required";
  }

  if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()])\S{8,}$/.test(password)) {
    return "Password must be at least 8 characters long, have 1 Capital letter, and have 1 special character.";
  }

  return undefined;
};

export const passwordConfirmValidator: Validate = (p1: string, p2?: string) => {
  if (!p1.trim()) {
    return "You must confirm Password";
  }

  if (String(p1) !== String(p2)) {
    console.log(p1, p2);
    return "Password does not match";
  }

  return undefined;
};

interface cardDetails {
  user: number;
  card_num: number;
  card_pin: number;
  amount: number;
}

export const selectedCardValidator = (cardDetails: cardDetails) => {
  if (cardDetails.card_num === 0 && cardDetails.card_pin === 0) {
    return "Must select a card";
  }
  return undefined;
};

export const selectedAmountValidator = (amount: number) => {
  if (amount === 0) {
    return "Must select amount";
  }
  return undefined;
};

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
  if (!/^[0-9]+-?[0-9]+-?[0-9]+-?[0-9]{0,4}$/.test(e)) {
    return "Card Num must be a sequence of digits separated by dashes (optional)";
  }
  const digits = e.replace(/-/g, "");
  if (digits.length !== 9) {
    return "Card Num must contain exactly 9 digits";
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
  if (!e.trim()) {
    return "Mobile number is required";
  }
  if (!/^[0-9]{11}$/.test(e)) {
    return "Mobile number must be a 11-digit number";
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
    return "You must be at least 18 years old to register";
  }

  return undefined;
};

export const genderValidator: Validate = (gender: string) => {
  if (gender === undefined) {
    return "Gender is required";
  }

  if (gender !== "1" && gender !== "3") {
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

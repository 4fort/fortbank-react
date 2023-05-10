export const ownerNameValidator = (e: string) => {
  if (!e.trim()) {
    return "Full name is required";
  }
  if (!/^[a-zA-Z .]+$/.test(e)) {
    return "Full name should only contain letters and spaces";
  }
  return undefined;
};

export const emailValidator = (e: string) => {
  if (!e.trim()) {
    return "Email is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return "Invalid email address";
  }
  return undefined;
};

export const cardNumValidator = (e: string) => {
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

export const cardPinValidator = (e: string) => {
  if (!e.trim()) {
    return "Card Pin is required";
  }
  if (!/^[0-9]{4}$/.test(e)) {
    return "Card Pin must be a 4-digit number";
  }
  return undefined;
};

export const balanceValidator = (e: string) => {
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

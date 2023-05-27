export class User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  userwallet: { balance: number };
  userprofile: {
    mobile_number: number;
    birthdate: string;
    gender: number;
    civil_status: number;
    address: string;
  };
  is_active: boolean;
  is_superuser: boolean;

  constructor(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    balance: number,
    mobile_number: number,
    birthdate: string,
    gender: number,
    civil_status: number,
    address: string,
    is_active: boolean,
    is_superuser: boolean
  ) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.userwallet = {
      balance,
    };
    this.userprofile = {
      mobile_number,
      birthdate,
      gender,
      civil_status,
      address,
    };
    (this.is_active = is_active), (this.is_superuser = is_superuser);
  }
}

export class User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  useraccount: {
    card_num: number;
    card_pin: number;
    balance: number;
  };
  userprofile: {
    mobile_number: number;
    birthdate: string;
    gender: number;
    civil_status: number;
    address: string;
  };

  constructor(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    card_num: number,
    card_pin: number,
    balance: number,
    mobile_number: number,
    birthdate: string,
    gender: number,
    civil_status: number,
    address: string
  ) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.useraccount = {
      card_num,
      card_pin,
      balance,
    };
    this.userprofile = {
      mobile_number,
      birthdate,
      gender,
      civil_status,
      address,
    };
  }
}

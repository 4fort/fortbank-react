export class User {
  owner_name: string;
  email: string;
  card_num: number;
  card_pin: number;
  balance: number;

  constructor(
    owner_name: string,
    email: string,
    card_num: number,
    card_pin: number,
    balance: number
  ) {
    this.owner_name = owner_name;
    this.email = email;
    this.card_num = card_num;
    this.card_pin = card_pin;
    this.balance = balance;
  }
}

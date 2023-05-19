import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TbExclamationCircle } from "react-icons/tb";
import ClientContext from "../context/ClientContext";
import { ClientContextType } from "../Interfaces/interfaces";
import ATMCard from "./ATMCard";

const CardsPanel = () => {
  let { userLoggedIn } = useContext<ClientContextType | null>(
    ClientContext
  ) ?? {
    userLoggedIn: {
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      useraccount: {
        card_num: "",
        card_pin: "",
        balance: "",
      },
      userprofile: {
        mobile_number: "",
        birthdate: "",
        gender: 0,
        civil_status: 0,
        address: "",
      },
      last_login: "",
    },
  };

  return (
    <>
      <div className='cards-panel'>
        <h3>Your Cards</h3>
        <div className='cards'>
          <h5>Card #1</h5>
          <ATMCard userLoggedIn={userLoggedIn} />
          <h5>Card #2</h5>
          <ATMCard userLoggedIn={userLoggedIn} />
          <NavLink to='/card'>See more</NavLink>
        </div>
        <p className='description'>
          <TbExclamationCircle />
          View and configure more of your cards in cards panel
        </p>
      </div>
    </>
  );
};

export default CardsPanel;

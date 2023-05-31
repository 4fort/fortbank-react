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
      useraccount_set: [
        {
          brand: "",
          card_num: "",
          card_pin: "",
          date_added: "",
        },
      ],
      userwallet: {
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
          {userLoggedIn?.useraccount_set[0] ? (
            <>
              {userLoggedIn?.useraccount_set
                .map((e) => {
                  return (
                    <ATMCard
                      key={e.card_num}
                      brand={e.brand}
                      card_num={e.card_num}
                      card_pin={e.card_pin}
                      date_added={e.date_added}
                    />
                  );
                })
                .slice(0, 2)}
              <NavLink to='/card'>See more</NavLink>
            </>
          ) : (
            <NavLink to='/card'>Add Card</NavLink>
          )}
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

import React, { useContext, useState } from "react";
import ClientContext from "../../context/ClientContext";
import { ClientContextType } from "../../Interfaces/interfaces";

const Home = () => {
  let { userLoggedIn } = useContext<ClientContextType | null>(ClientContext);

  const [viewPin, setViewPin] = useState<boolean>(false);

  return (
    <>
      <div className='atm_card'>
        <div className='logo'>
          FORT<span>BANK</span>
        </div>
        <div className='qrcode'></div>
        <div className='atm_cardNum'>
          {userLoggedIn
            ? String(userLoggedIn?.useraccount?.card_num)
                .match(/.{1,3}/g)
                .join("-")
            : "loading.."}
        </div>
        <div className='atm_cardHolder'>
          CARD HOLDER
          <span id='atm_cardHolder'>
            {userLoggedIn
              ? userLoggedIn?.first_name + " " + userLoggedIn.last_name
              : "loading..."}
          </span>
        </div>
        <div className='atm_cardId'>
          PIN
          <span
            id='atm_cardId'
            onClick={() => {
              setViewPin(!viewPin);
            }}
          >
            {viewPin && userLoggedIn
              ? userLoggedIn?.useraccount?.card_pin
              : "****"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;

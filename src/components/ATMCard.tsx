import { useState } from "react";
import QRCode from "react-qr-code";
import { TbPolygon } from "react-icons/tb";

const ATMCard = (props) => {
  const { userLoggedIn } = props;

  const [viewPin, setViewPin] = useState<boolean>(false);

  let qrValue = {
    username: userLoggedIn?.username,
  };

  return (
    <>
      <div className='atm_card'>
        <span className='backdrop'>
          <TbPolygon />
        </span>
        <div className='logo'>
          FORT<span>BANK</span>
        </div>
        <div className='qrcode'>
          <QRCode
            size={128}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
            value={JSON.stringify(qrValue)}
          />
        </div>
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
              : "⦁⦁⦁⦁"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ATMCard;

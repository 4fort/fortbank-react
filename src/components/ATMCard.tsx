import { useState } from "react";
import QRCode from "react-qr-code";
import { TbPolygon } from "react-icons/tb";
import { UserAccount } from "../Interfaces/interfaces";

const ATMCard = (props: UserAccount) => {
  const { brand, card_num, card_pin, date_added } = props;

  const date = new Date(date_added);

  const [viewPin, setViewPin] = useState<boolean>(false);

  let qrValue = {
    username: card_num,
  };

  return (
    <>
      <div className='atm_card'>
        <span className='backdrop'>
          <TbPolygon />
        </span>
        <div className='logo'>
          {brand == "FortBank" ? (
            <>
              FORT<span>BANK</span>
            </>
          ) : (
            "brand"
          )}
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
          {card_num
            ? String(card_num)
                ?.match(/.{1,3}/g)
                ?.join(" ")
            : "loading.."}
        </div>
        <div className='atm_cardHolder'>
          Date added
          <span id='atm_cardHolder'>
            {date_added ? date.toLocaleString() : "loading..."}
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
            {viewPin && card_pin ? card_pin : "⦁⦁⦁⦁"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ATMCard;

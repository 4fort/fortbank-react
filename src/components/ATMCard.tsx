import { useState } from "react";
import QRCode from "react-qr-code";
import { TbEdit, TbPolygon, TbTrash } from "react-icons/tb";
import { UserAccount } from "../Interfaces/interfaces";

interface Props extends UserAccount {
  setIsModal?: (e: boolean) => void;
  selectedCard?: {
    card_num: string;
    card_pin: string;
  };
  modalProps?: {
    setCardNum?: (e: string) => void;
    setCardPin?: (e: string) => void;
    modalMode?: number;
    setModalMode?: (e: number) => void;
  };
  className?: string;
}

const ATMCard = (props: Props) => {
  const {
    brand,
    card_num,
    card_pin,
    date_added,
    setIsModal,
    modalProps,
    selectedCard,
    className,
  } = props;

  const date = new Date(date_added);
  const dateAdded = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const [viewPin, setViewPin] = useState<boolean>(false);

  let qrValue = {
    username: card_num,
  };

  return (
    <>
      <div
        className={
          // brand == "FortBank" ? "atm_card fortbank" : "atm_card otherbrand"
          selectedCard?.card_num == card_num ? "selected atm_card" : "atm_card"
        }
        onClick={() => {
          modalProps?.setCardNum!(card_num);
          modalProps?.setCardPin!(card_pin);
        }}
      >
        <div className='actions'>
          <div
            className='edit'
            onClick={() => {
              setIsModal!(true);
              modalProps!.setCardNum!(card_num);
              modalProps!.setCardPin!(card_pin);
              modalProps!.setModalMode!(1);
            }}
          >
            <TbEdit />
          </div>
          <div
            className='delete'
            onClick={() => {
              setIsModal!(true);
              modalProps!.setCardNum!(card_num);
              modalProps!.setCardPin!(card_pin);
              modalProps!.setModalMode!(2);
            }}
          >
            <TbTrash />
          </div>
        </div>
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
            {date_added ? dateAdded : "loading..."}
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

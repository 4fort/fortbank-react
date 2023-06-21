import React, { useContext, useState } from "react";
import {
  TbUserCircle,
  TbHistory,
  TbCreditCard,
  TbCash,
  TbArrowsTransferUp,
  TbPolygon,
} from "react-icons/tb";
import ClientContext from "../../context/ClientContext";
import { ClientContextType } from "../../Interfaces/interfaces";
import QRCode from "react-qr-code";

const Home = () => {
  let { userLoggedIn } = useContext<ClientContextType | null>(
    ClientContext
  ) ?? {
    userLoggedIn: {
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      userwallet: {
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

  const [viewPin, setViewPin] = useState<boolean>(false);

  let qrValue = {
    username: userLoggedIn?.username,
  };

  return (
    <>
      <div className='appContainer'>
        <div className='detailsContainer'>
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
                ? String(userLoggedIn?.userwallet?.card_num)
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
                  ? userLoggedIn?.userwallet?.card_pin
                  : "⦁⦁⦁⦁"}
              </span>
            </div>
          </div>
          <div className='balance_container'>
            <span>You have</span>
            <div>
              ₱
              {parseFloat(userLoggedIn?.userwallet?.balance).toLocaleString(
                "en-US"
              )}
            </div>
          </div>
        </div>
        <div className='bottomContainer'>
          <div className='transactions'>
            {/* <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>withdraw</td>
                  <td>12-13-2003</td>
                  <td>-900</td>
                </tr>
              </tbody>
            </table> */}
          </div>
          <div className='actions'>
            <div className='sub_actions'>
              <div className='profile'>
                <TbUserCircle />
                Profile
              </div>
              <div className='activities'>
                <TbHistory />
                Transactions
              </div>
              <div className='physical-card'>
                <TbCreditCard />
                Card
              </div>
              <div className='payment'>
                <TbCash />
                Payment
              </div>
            </div>
            <div className='main_actions'>
              <div className='deposit' data-transaction='deposit'>
                <span>
                  <TbCreditCard />
                </span>
                DEPOSIT
              </div>
              <div className='withdraw' data-transaction='withdraw'>
                <span>
                  <TbCash />
                </span>
                WITHDRAW
              </div>
              <div className='transfer' data-transaction='transfer'>
                <span>
                  <TbArrowsTransferUp />
                </span>
                TRANSFER
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

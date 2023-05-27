import axios from "axios";
import { useContext, useState } from "react";
import { TbChevronLeft } from "react-icons/tb";
import QRCode from "react-qr-code";
import { NavLink } from "react-router-dom";
import {
  AuthContextType,
  ClientContextType,
} from "../../../Interfaces/interfaces";
import AuthContext from "../../../context/AuthContext";
import ClientContext from "../../../context/ClientContext";

const Receive = () => {
  let { baseUrl, authTokens } = useContext<AuthContextType | null>(
    AuthContext
  ) ?? {
    baseUrl: "",
    authTokens: null,
  };
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
      transactionticket_set: [],
    },
  };

  const makeTicket = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/ticket/`,
        userLoggedIn,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens?.access),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [qrValue, setQrValue] = useState();
  console.log(qrValue);

  return (
    <div className='main-panel receive'>
      <h1>
        Payment
        <NavLink to='/payment'>
          <TbChevronLeft /> Return
        </NavLink>
      </h1>
      <div className='container'>
        <div className='reference-code-wrapper'>
          <div className='qrcode'>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
              value={String(
                userLoggedIn?.transactionticket_set[0]?.reference_id
              )}
            />

            <span className='reference-code'>
              Reference Code:&nbsp;
              <span>
                {userLoggedIn?.transactionticket_set[0]?.reference_id}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;

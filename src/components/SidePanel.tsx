import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  TbUserCircle,
  TbHistory,
  TbCreditCard,
  TbCash,
  TbArrowsTransferUp,
  TbPolygon,
  TbSettings,
} from "react-icons/tb";
import ClientContext from "../context/ClientContext";
import { ClientContextType } from "../Interfaces/interfaces";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../Interfaces/interfaces";

const SidePanel = () => {
  let { logout } = useContext<AuthContextType | null>(AuthContext) ?? {
    logout: () => {},
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
      <div className='side-panel'>
        <div className='user'>
          <span>{userLoggedIn?.first_name}</span>
          <span>@{userLoggedIn?.username}</span>
        </div>
        <div className='balance'>
          <span>Balance</span>P{userLoggedIn?.useraccount?.balance}
        </div>
        <div className='actions'>
          <NavLink to='/' className='profile'>
            <TbUserCircle />
            Profile
          </NavLink>
          <NavLink to='/payment' className='payment'>
            <TbCreditCard />
            Payment
          </NavLink>
          <NavLink to='/transactions' className='transactions'>
            <TbHistory />
            Transactions
          </NavLink>
          <NavLink to='/card' className='card'>
            <TbCreditCard />
            Card
          </NavLink>
          <NavLink to='/settings' className='settings'>
            <TbSettings />
            Settings
          </NavLink>
        </div>
        <div onClick={logout} className='logout'>
          <span>Logout</span>
        </div>
      </div>
    </>
  );
};

export default SidePanel;

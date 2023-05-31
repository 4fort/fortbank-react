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
  TbHome,
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
  TbLogout,
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

  const [sidePanelState, setSidePanelState] = useState(true);
  return (
    <>
      <div className={sidePanelState ? "side-panel" : "side-panel hidden"}>
        <div className='user'>
          <div className='details'>
            <span>{userLoggedIn?.first_name}</span>
            <span>@{userLoggedIn?.username}</span>
          </div>
          <div className='show-hide-sidepanel'>
            {sidePanelState ? (
              <TbLayoutSidebarLeftCollapse
                onClick={() => setSidePanelState(!sidePanelState)}
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                onClick={() => setSidePanelState(!sidePanelState)}
              />
            )}
          </div>
        </div>
        <div className='balance'>
          <span>Wallet Balance</span>
          {!userLoggedIn
            ? "Processing..."
            : "₱" +
              parseFloat(userLoggedIn?.userwallet?.balance).toLocaleString(
                "en-US"
              )}
        </div>
        <div className='actions'>
          <NavLink to='/' className='home'>
            <TbHome />
            <p>Home</p>
          </NavLink>
          <NavLink to='/payment' className='payment'>
            <TbCreditCard />
            <p>Payment</p>
          </NavLink>
          <NavLink to='/transactions' className='transactions'>
            <TbHistory />
            <p>Transactions</p>
          </NavLink>
          <NavLink to='/card' className='card'>
            <TbCreditCard />
            <p>Account</p>
          </NavLink>
          <NavLink to='/Profile' className='profile'>
            <TbUserCircle />
            <p>Profile</p>
          </NavLink>
          <NavLink to='/settings' className='settings'>
            <TbSettings />
            <p>Settings</p>
          </NavLink>
        </div>
        <div onClick={logout} className='logout'>
          <span>{sidePanelState ? "Logout" : <TbLogout />}</span>
        </div>
        <span className='footer'>
          {sidePanelState ? "FortPay © Fort 2023" : "FortPay © 2023"}
        </span>
      </div>
    </>
  );
};

export default SidePanel;

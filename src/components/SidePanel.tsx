import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  TbHistory,
  TbCreditCard,
  TbCash,
  TbHome,
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
  TbLogout,
} from "react-icons/tb";
import ClientContext from "../context/ClientContext";
import {
  ClientContextType,
  UserPreferencesType,
} from "../Interfaces/interfaces";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../Interfaces/interfaces";

const SidePanel = () => {
  const { logout } = useContext<AuthContextType | null>(AuthContext) ?? {
    logout: () => {},
  };
  const { userLoggedIn, userBalance } = useContext<ClientContextType | null>(
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
          id: 0,
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
      transactionhistory_set: [
        {
          id: 0,
          user: 0,
          sent_to: "",
          amount: 0,
          previous_balance: 0,
          transaction_type: "",
          transaction_date: "",
        },
      ],
      last_login: "",
    },
  };

  // const [userPreferences, setUserPreferences] = useState<UserPreferences>(
  //   JSON.parse(
  //     localStorage.getItem("userPreferences") ?? '{"sidePanelState": true}'
  //   ) ?? "{}"
  // );

  const userPreferencesString = localStorage.getItem("userPreferences");
  const userPreferences = userPreferencesString
    ? (JSON.parse(userPreferencesString) as UserPreferencesType)
    : { sidePanelState: true };

  const [sidePanelState, setSidePanelState] = useState<boolean>(
    userPreferences.sidePanelState
  );

  // console.log(sidePanelState);

  // const [sidePanelState, setSidePanelState] = useState<
  //   UserPreferencesType["sidePanelState"]
  // >(JSON.parse(localStorage.getItem("userPreferences") ?? "true"));

  // console.log(JSON.parse(localStorage.getItem("userPreferences") ?? "{}"));

  // localStorage.setItem("userPreferences", JSON.stringify({ sidePanelState }));
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
                onClick={() => {
                  setSidePanelState(!sidePanelState);
                  const userPreferencesString =
                    localStorage.getItem("userPreferences");
                  const userPreferences = userPreferencesString
                    ? JSON.parse(userPreferencesString)
                    : { sidePanelState: false };
                  localStorage.setItem(
                    "userPreferences",
                    JSON.stringify({
                      ...userPreferences,
                      sidePanelState: !sidePanelState,
                    })
                  );
                }}
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                onClick={() => {
                  setSidePanelState(!sidePanelState);
                  const userPreferencesString =
                    localStorage.getItem("userPreferences");
                  const userPreferences = userPreferencesString
                    ? JSON.parse(userPreferencesString)
                    : { sidePanelState: true };
                  localStorage.setItem(
                    "userPreferences",
                    JSON.stringify({
                      ...userPreferences,
                      sidePanelState: !sidePanelState,
                    })
                  );
                }}
              />
            )}
          </div>
        </div>
        <div className='balance'>
          <span>Wallet Balance</span>
          {!userLoggedIn
            ? "Processing..."
            : "₱" + userBalance?.toLocaleString("en-US")}
        </div>
        <div className='actions'>
          <NavLink to='/' className='home'>
            <TbHome />
            <p>Home</p>
          </NavLink>
          <NavLink to='/payment' className='payment'>
            <TbCash />
            <p>Payment</p>
          </NavLink>
          <NavLink to='/transactions' className='transactions'>
            <TbHistory />
            <p>Transactions</p>
          </NavLink>
          <NavLink to='/card' className='card'>
            <TbCreditCard />
            <p>Cards</p>
          </NavLink>
          {/* <NavLink to='/Profile' className='profile'>
            <TbUserCircle />
            <p>Profile</p>
          </NavLink>
          <NavLink to='/settings' className='settings'>
            <TbSettings />
            <p>Settings</p>
          </NavLink> */}
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

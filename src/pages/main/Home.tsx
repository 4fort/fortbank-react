import { useContext, useState } from "react";
import {
  ClientContextType,
  UserPreferencesType,
} from "../../Interfaces/interfaces";
import ClientContext from "../../context/ClientContext";
import { NavLink } from "react-router-dom";
import {
  TbCash,
  TbCreditCard,
  TbEye,
  TbEyeOff,
  TbHistory,
} from "react-icons/tb";

import { bottomMargin } from "../../utils/mobile-functions";

const Home = () => {
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
    userBalance: 0,
  };

  const userPreferencesString = localStorage.getItem("userPreferences");
  const userPreferences = userPreferencesString
    ? (JSON.parse(userPreferencesString) as UserPreferencesType)
    : { balanceVisibility: false };

  const [showBalance, setShowBalance] = useState<boolean>(
    userPreferences.balanceVisibility
  );

  return (
    <div className='main-panel home'>
      <h1>
        Fort<span>Pay</span>
      </h1>

      <div className='hero'>
        <div className='user'>
          Hello,
          <span>
            &nbsp;{userLoggedIn?.first_name}&nbsp;{userLoggedIn?.last_name}
          </span>
        </div>
        <div className='balance'>
          <div className='show-hide-balance'>
            <p>You have</p>
            {!showBalance ? (
              <TbEye
                onClick={() => {
                  setShowBalance(!showBalance);
                  const userPreferencesString =
                    localStorage.getItem("userPreferences");
                  const userPreferences = userPreferencesString
                    ? JSON.parse(userPreferencesString)
                    : { balanceVisibility: false };
                  localStorage.setItem(
                    "userPreferences",
                    JSON.stringify({
                      ...userPreferences,
                      balanceVisibility: !showBalance,
                    })
                  );
                }}
              />
            ) : (
              <TbEyeOff
                onClick={() => {
                  setShowBalance(!showBalance);
                  const userPreferencesString =
                    localStorage.getItem("userPreferences");
                  const userPreferences = userPreferencesString
                    ? JSON.parse(userPreferencesString)
                    : { balanceVisibility: true };
                  localStorage.setItem(
                    "userPreferences",
                    JSON.stringify({
                      ...userPreferences,
                      balanceVisibility: !showBalance,
                    })
                  );
                }}
              />
            )}
          </div>
          <span>
            {!userLoggedIn
              ? "Processing..."
              : "₱" +
                (showBalance ? userBalance?.toLocaleString("en-US") : " •••••")}
          </span>
          <span className='shape'>
            <svg
              id='wave'
              style={{ transform: "rotate(0deg); transition: 0.3s" }}
              viewBox='0 0 1440 490'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
                  <stop
                    stopColor='rgba(182.513, 182.513, 182.513, 1)'
                    offset='0%'
                  ></stop>
                  <stop stopColor='rgba(255, 255, 255, 0)' offset='100%'></stop>
                </linearGradient>
              </defs>
              <path
                style={{ transform: "translate(0, 0px); opacity:1" }}
                fill='url(#sw-gradient-0)'
                d='M0,245L60,236.8C120,229,240,212,360,212.3C480,212,600,229,720,269.5C840,310,960,376,1080,400.2C1200,425,1320,408,1440,367.5C1560,327,1680,261,1800,236.8C1920,212,2040,229,2160,220.5C2280,212,2400,180,2520,179.7C2640,180,2760,212,2880,228.7C3000,245,3120,245,3240,228.7C3360,212,3480,180,3600,138.8C3720,98,3840,49,3960,40.8C4080,33,4200,65,4320,130.7C4440,196,4560,294,4680,326.7C4800,359,4920,327,5040,294C5160,261,5280,229,5400,187.8C5520,147,5640,98,5760,73.5C5880,49,6000,49,6120,40.8C6240,33,6360,16,6480,40.8C6600,65,6720,131,6840,196C6960,261,7080,327,7200,294C7320,261,7440,131,7560,73.5C7680,16,7800,33,7920,32.7C8040,33,8160,16,8280,57.2C8400,98,8520,196,8580,245L8640,294L8640,490L8580,490C8520,490,8400,490,8280,490C8160,490,8040,490,7920,490C7800,490,7680,490,7560,490C7440,490,7320,490,7200,490C7080,490,6960,490,6840,490C6720,490,6600,490,6480,490C6360,490,6240,490,6120,490C6000,490,5880,490,5760,490C5640,490,5520,490,5400,490C5280,490,5160,490,5040,490C4920,490,4800,490,4680,490C4560,490,4440,490,4320,490C4200,490,4080,490,3960,490C3840,490,3720,490,3600,490C3480,490,3360,490,3240,490C3120,490,3000,490,2880,490C2760,490,2640,490,2520,490C2400,490,2280,490,2160,490C2040,490,1920,490,1800,490C1680,490,1560,490,1440,490C1320,490,1200,490,1080,490C960,490,840,490,720,490C600,490,480,490,360,490C240,490,120,490,60,490L0,490Z'
              ></path>
            </svg>
          </span>
          <span className='shape'>
            <svg
              id='wave'
              style={{ transform: "rotate(0deg); transition: 0.3s" }}
              viewBox='0 0 1440 490'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
                  <stop
                    stopColor='rgba(182.513, 182.513, 182.513, 1)'
                    offset='0%'
                  ></stop>
                  <stop stopColor='rgba(255, 255, 255, 0)' offset='100%'></stop>
                </linearGradient>
              </defs>
              <path
                style={{ transform: "translate(0, 0px); opacity:1" }}
                fill='url(#sw-gradient-0)'
                d='M0,245L60,236.8C120,229,240,212,360,212.3C480,212,600,229,720,269.5C840,310,960,376,1080,400.2C1200,425,1320,408,1440,367.5C1560,327,1680,261,1800,236.8C1920,212,2040,229,2160,220.5C2280,212,2400,180,2520,179.7C2640,180,2760,212,2880,228.7C3000,245,3120,245,3240,228.7C3360,212,3480,180,3600,138.8C3720,98,3840,49,3960,40.8C4080,33,4200,65,4320,130.7C4440,196,4560,294,4680,326.7C4800,359,4920,327,5040,294C5160,261,5280,229,5400,187.8C5520,147,5640,98,5760,73.5C5880,49,6000,49,6120,40.8C6240,33,6360,16,6480,40.8C6600,65,6720,131,6840,196C6960,261,7080,327,7200,294C7320,261,7440,131,7560,73.5C7680,16,7800,33,7920,32.7C8040,33,8160,16,8280,57.2C8400,98,8520,196,8580,245L8640,294L8640,490L8580,490C8520,490,8400,490,8280,490C8160,490,8040,490,7920,490C7800,490,7680,490,7560,490C7440,490,7320,490,7200,490C7080,490,6960,490,6840,490C6720,490,6600,490,6480,490C6360,490,6240,490,6120,490C6000,490,5880,490,5760,490C5640,490,5520,490,5400,490C5280,490,5160,490,5040,490C4920,490,4800,490,4680,490C4560,490,4440,490,4320,490C4200,490,4080,490,3960,490C3840,490,3720,490,3600,490C3480,490,3360,490,3240,490C3120,490,3000,490,2880,490C2760,490,2640,490,2520,490C2400,490,2280,490,2160,490C2040,490,1920,490,1800,490C1680,490,1560,490,1440,490C1320,490,1200,490,1080,490C960,490,840,490,720,490C600,490,480,490,360,490C240,490,120,490,60,490L0,490Z'
              ></path>
            </svg>
          </span>
        </div>
        <div className='actions'>
          <NavLink to='/payment'>
            <TbCash />
            Make payments
          </NavLink>
          <NavLink to='/transactions'>
            <TbHistory />
            View recent transactions
          </NavLink>
          <NavLink to='/card'>
            <TbCreditCard />
            Add/Remove Cards
          </NavLink>
        </div>
      </div>

      <div className='coming-soon'>
        <p>More features will be added soon</p>
      </div>
    </div>
  );
};

export default Home;

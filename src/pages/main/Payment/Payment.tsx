import React from "react";
import { TbQrcode, TbScan, TbWallet } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Payment = () => {
  return (
    <div className='main-panel'>
      <h1>Payment</h1>
      <div className='container'>
        <div className='transaction-actions'>
          <NavLink to='/payment/pay' className='pay'>
            <TbScan />
            <h3>Pay</h3>
            <p>Make payments using reference code or by scanning qr code</p>
          </NavLink>
          <NavLink to='/payment/receive' className='receive-payment'>
            <TbQrcode />
            <h3>Receive Payment</h3>
            <p>Receive payments using reference code or by using qr code</p>
          </NavLink>
          <NavLink to='/card' className='add-funds'>
            <TbWallet />
            <h3>Add Funds</h3>
            <p>Add funds to your wallet from your selected atm card</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Payment;

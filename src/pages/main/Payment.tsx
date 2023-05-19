import React from "react";
import { TbQrcode, TbScan, TbWallet } from "react-icons/tb";

const Payment = () => {
  return (
    <div className='main-panel'>
      <h1>Payment</h1>
      <div className='container'>
        <div className='transaction-actions'>
          <div className='pay'>
            <TbScan />
            <h3>Pay</h3>
            <p>Make payments using reference code or by scanning qr code</p>
          </div>
          <div className='receive-payment'>
            <TbQrcode />
            <h3>Receive Payment</h3>
            <p>Receive payments using reference code or by using qr code</p>
          </div>
          <div className='add-funds'>
            <TbWallet />
            <h3>Add Funds</h3>
            <p>Add funds to your wallet from your selected atm card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

import React from "react";

const Payment = () => {
  return (
    <div className='main-panel'>
      <h1>Payment</h1>
      <div className='container'>
        <div className='transaction-actions'>
          <div className='pay'>Pay</div>
          <div className='receive-payment'>Receive Payment</div>
          <div className='add-funds'>Add Funds</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

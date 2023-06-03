import React from "react";
import {
  TbCreditCard,
  TbSquareRoundedArrowDownFilled,
  TbSquareRoundedArrowUpFilled,
  TbWallet,
} from "react-icons/tb";

interface Props {
  id: number;
  transaction_type: string;
  sent_to: string;
  amount: number;
  previous_balance: number;
  displayDate: string;
}

const HistoryRow = (props: Props) => {
  let { id, transaction_type, sent_to, amount, previous_balance, displayDate } =
    props;
  return (
    <>
      <tr key={id} className='activity'>
        <td>
          <div className='type'>
            {transaction_type === "Pay" ? (
              <TbSquareRoundedArrowUpFilled />
            ) : transaction_type === "Add funds" ? (
              <TbWallet />
            ) : transaction_type === "Receive Payment" ? (
              <TbSquareRoundedArrowDownFilled />
            ) : transaction_type === "Transfer to bank" ? (
              <TbCreditCard />
            ) : null}
            <div className=''>
              <span>{transaction_type}</span>
              <span>
                {transaction_type === "Pay" ? (
                  <p>Payment sent to @{sent_to}</p>
                ) : transaction_type === "Receive Payment" ? (
                  <p>Received payment from @{sent_to}</p>
                ) : transaction_type === "Add funds" ? (
                  <p>Added funds from {sent_to}</p>
                ) : transaction_type === "Transfer to bank" ? (
                  <p>Transfered funds to {sent_to}</p>
                ) : null}
              </span>
            </div>
          </div>
        </td>
        <td>
          <div className='amount'>
            <span
              style={
                transaction_type === "Pay" ||
                transaction_type === "Transfer to bank"
                  ? { color: "red" }
                  : transaction_type === "Add funds" ||
                    transaction_type === "Receive Payment"
                  ? { color: "green" }
                  : { color: "white" }
              }
            >
              {transaction_type === "Pay" ||
              transaction_type === "Transfer to bank"
                ? "-"
                : transaction_type === "Add funds" ||
                  transaction_type === "Receive Payment"
                ? "+"
                : null}
              ₱{amount.toLocaleString("en-US")}
            </span>
            <span>₱{previous_balance.toLocaleString("en-US")}</span>
            <span>{displayDate}</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default HistoryRow;

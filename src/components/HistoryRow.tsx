import React, { Dispatch, SetStateAction } from "react";
import {
  TbCreditCard,
  TbSquareRoundedArrowDown,
  TbSquareRoundedArrowDownFilled,
  TbSquareRoundedArrowUp,
  TbSquareRoundedArrowUpFilled,
  TbWallet,
} from "react-icons/tb";
import { UserTransactions } from "../Interfaces/interfaces";

interface Props {
  id: number;
  transaction_type: string;
  sent_to: string;
  amount: number;
  previous_balance: number;
  displayDate: string;
  transaction_date?: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setModalMode: Dispatch<SetStateAction<number>>;
  setSelectedActivity: Dispatch<SetStateAction<UserTransactions>>;
}

const HistoryRow = (props: Props) => {
  let {
    id,
    transaction_type,
    sent_to,
    amount,
    previous_balance,
    displayDate,
    transaction_date,
    setIsModal,
    setModalMode,
    setSelectedActivity,
  } = props;

  const handleClick = () => {
    setIsModal(true);
    setModalMode(3);
    setSelectedActivity({
      id: id,
      sent_to: sent_to,
      amount: amount,
      previous_balance: previous_balance,
      transaction_type: transaction_type,
      transaction_date: transaction_date!,
    });
  };

  return (
    <tr className='activity' onClick={handleClick}>
      <td>
        <div className='type'>
          {transaction_type === "Pay" ? (
            <TbSquareRoundedArrowUp />
          ) : transaction_type === "Add funds" ? (
            <TbWallet />
          ) : transaction_type === "Receive Payment" ? (
            <TbSquareRoundedArrowDown />
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
  );
};

export default HistoryRow;

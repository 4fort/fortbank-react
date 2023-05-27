import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TbChevronLeft, TbCircleCheck, TbCircleX } from "react-icons/tb";
import Html5QrcodePlugin from "../../../components/Html5QrcodePlugin";
import {
  AuthContextType,
  ClientContextType,
  FortbankUser,
  TransactionTicket,
} from "../../../Interfaces/interfaces";
import AuthContext from "../../../context/AuthContext";
import {
  getBalance,
  getTicket,
  getUser,
  updateBalance,
} from "../../../utils/Transactions";
import ClientContext from "../../../context/ClientContext";
import Loading from "../../../components/Loading";
import { timeoutInterval } from "../../../context/GlobalVars";
import Alert from "../../../components/Alert";

let ticket: TransactionTicket | null = null;

const Pay = () => {
  let { authTokens } = useContext<AuthContextType | null>(AuthContext) ?? {
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
    },
  };

  const navigate = useNavigate();
  const [refIdInput, setRefIdInput] = useState(0);
  const [isPaying, setIsPaying] = useState(false);

  const [receiverDetails, setReceiverDetails] = useState<FortbankUser | null>();

  const [amount, setAmount] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const regex: RegExp = /[0-9]/;

  const onNewScanResult = async (decodedText: string) => {
    if (loading) return;

    ticket = await getTicket(Number(decodedText), authTokens!);
    setReceiverDetails(await getUser(Number(ticket?.user), authTokens!));

    validateUser();

    setLoading(true);
    !receiverDetails
      ? setTimeout(() => {
          setIsPaying(true);
          setLoading(false);
        }, timeoutInterval - 1000)
      : setIsPaying(true);
    // return makePayment();
  };

  const proceedPayment = async () => {
    ticket = await getTicket(Number(refIdInput), authTokens!);
    setReceiverDetails(await getUser(Number(ticket?.user), authTokens!));

    validateUser();

    setLoading(true);
    !receiverDetails
      ? setTimeout(() => {
          setIsPaying(true);
          setLoading(false);
        }, timeoutInterval - 1000)
      : setIsPaying(true);
    // return makePayment();
  };

  const validateUser = () => {
    if (ticket?.user === userLoggedIn?.id) {
      setLoading(false);
      setIsFail(true);
      setAlertMsg("You cannot pay to yourself!");
      return setTimeout(() => {
        navigate("/payment");
      }, timeoutInterval);
    }
    if (ticket === null) {
      setLoading(false);
      setIsFail(true);
      setAlertMsg("The code is invalid!");
      return setTimeout(() => {
        navigate("/payment");
      }, timeoutInterval);
    }
  };

  const makePayment = async () => {
    setLoading(true);

    const receiverBalance = receiverDetails?.userwallet?.balance;
    const senderBalance = userLoggedIn?.userwallet?.balance;
    const newReceiverBalance = {
      useraccount: {
        balance: Number(receiverBalance) + Number(amount),
      },
    };
    const newSenderBalance = {
      useraccount: {
        balance: Number(senderBalance) - Number(amount),
      },
    };

    console.log(senderBalance, Number(senderBalance) - Number(amount));
    console.log(receiverBalance, Number(receiverBalance) + Number(amount));

    if (Number(senderBalance) < amount) {
      setLoading(false);
      setIsFail(true);
      setAlertMsg("Insufficient Balance!");
      return setTimeout(() => {
        navigate("/payment");
      }, timeoutInterval);
    }

    let newBalance = await updateBalance(
      userLoggedIn.id,
      newSenderBalance,
      authTokens!
    );
    await updateBalance(ticket!.user, newReceiverBalance, authTokens!);

    userLoggedIn.userwallet.balance = String(newBalance?.balance);

    setLoading(false);
    setIsSuccessful(true);
    setTimeout(() => {
      navigate("/payment");
    }, timeoutInterval);
  };

  return (
    <div className='main-panel pay'>
      <h1>
        Payment
        <NavLink to='/payment'>
          <TbChevronLeft /> Return
        </NavLink>
      </h1>
      {loading ? (
        <Loading />
      ) : isSuccessful ? (
        <Alert
          className='success-screen'
          msg={alertMsg}
          icon={<TbCircleCheck />}
          title='Success!'
        />
      ) : isFail ? (
        <Alert
          className='fail-screen'
          msg={alertMsg}
          icon={<TbCircleX />}
          title='Fail!'
        />
      ) : (
        <>
          <div className='container'>
            <div className='reference-code-wrapper'>
              {isPaying ? (
                <div className='proceed-payment'>
                  <div className='receiverDetails'>
                    <h2>
                      {receiverDetails?.first_name +
                        " " +
                        receiverDetails?.last_name}
                    </h2>
                    <span>@{receiverDetails?.username}</span>
                  </div>
                  <label htmlFor='amount'>Amount to pay</label>
                  <input
                    type='text'
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                  <button
                    onClick={() => amount && Number(amount) && makePayment()}
                  >
                    Pay
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor='reference_id_input'>Reference Code</label>
                    <span>
                      <input
                        type='text'
                        id='reference_id_input'
                        name='reference_id_input'
                        onChange={(e) => setRefIdInput(Number(e.target.value))}
                      />
                      <button onClick={() => proceedPayment()}>Submit</button>
                    </span>
                  </div>
                  <hr />
                  <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pay;

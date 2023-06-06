import {
  createContext,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AdminContextType, AuthContextType } from "../Interfaces/interfaces";
import Loading from "../components/Loading";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { User } from "../Models/UserModel";
import { OTP_authentication } from "../utils/firebase-config";
import AdminContext from "./AdminContext";
import * as validator from "../utils/FormValidator";
import { RegisterToDB } from "../utils/adapters";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: Props) => {
  const baseUrl: string = "http://127.0.0.1:8000";

  const [authTokens, setAuthTokens] = useState<
    AuthContextType["authTokens"] | null
  >(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );
  const [user, setUser] = useState<AuthContextType["user"] | null>(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens")!)
      : null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  const navigate = useNavigate();

  let loginAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let response = await fetch(`${baseUrl}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("admin/dashboard");
      setUnauthorized(false);

      setLoading(false);
    } else {
      setUnauthorized(true);

      setLoading(false);
    }
  };

  let logoutAdmin = () => {
    setLoading(true);

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("admin");

    setLoading(false);
  };

  let firstNameError: string | undefined;
  let lastNameError: string | undefined;
  let usernameError: string | undefined;
  let emailError: string | undefined;
  let mobileNumberError: string | undefined;
  let birthdateError: string | undefined;
  let genderError: string | undefined;
  let civilStatusError: string | undefined;
  let addressError: string | undefined;
  let passwordError: string | undefined;
  let passwordConfirmError: string | undefined;

  const generateRecaptcha = () => {
    //@ts-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      OTP_authentication
    );
  };

  const [isValidated, setIsValidated] = useState(true);
  const [isOTP, setIsOTP] = useState(false);
  const [OTPInput, setOTPInput] = useState("");
  const [userDataState, setUserDataState] = useState<User | null>(null);

  const verifyOTP = (e: ChangeEvent<HTMLInputElement>) => {
    let otp = e.target.value;
    setOTPInput(otp);

    if (otp.length === 6) {
      console.log(otp);
      //@ts-ignore
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(() => {
          // REGISTER!
          try {
            RegisterToDB(userDataState);
          } catch (error) {
            console.log(error);
          }
          setIsOTP(false);
          navigate("/login");
          toast.success("Success! you can now login.", {
            className: "toast tst",
            position: "top-center",
          });
        })
        .catch((error: any) => {
          toast.error(`Server response:${error}.`, {
            className: "toast tst",
            position: "top-center",
          });
          console.log(error);
          throw error;
        });
    }
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data);
    console.log(payload);

    const userData = new User(
      String(payload.username),
      String(payload.first_name),
      String(payload.last_name),
      String(payload.email),
      Number(0),
      Number(payload.mobile_number),
      String(payload.birthdate),
      Number(payload.gender),
      Number(payload.civil_status),
      String(payload.address),
      Boolean(true),
      Boolean(false),
      String(payload.password)
    );

    firstNameError = validator.firstNameValidator(userData.first_name);
    lastNameError = validator.lastNameValidator(userData.last_name);
    usernameError = validator.usernameValidator(userData.username);
    emailError = validator.emailValidator(userData.email);
    mobileNumberError = validator.mobileNumberValidator(
      String(userData.userprofile.mobile_number)
    );
    birthdateError = validator.birthdateValidator(
      userData.userprofile.birthdate
    );
    genderError = validator.genderValidator(
      String(userData.userprofile.gender)
    );
    civilStatusError = validator.civilStatusValidator(
      String(userData.userprofile.civil_status)
    );
    addressError = validator.addressValidator(userData.userprofile.address);
    passwordError = validator.passwordValidator(userData.password!);
    passwordConfirmError = validator.passwordConfirmValidator(
      userData.password!
    );

    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      mobileNumberError ||
      birthdateError ||
      genderError ||
      civilStatusError ||
      addressError
      // passwordError ||
      // passwordConfirmError
    ) {
      // if (firstNameError) {
      //   console.log(firstNameError);
      // }
      // if (lastNameError) {
      //   console.log(lastNameError);
      // }
      // if (usernameError) {
      //   console.log(usernameError);
      // }
      // if (emailError) {
      //   console.log(emailError);
      // }
      // if (cardNumError) {
      //   console.log(cardNumError);
      // }
      // if (cardPinError) {
      //   console.log(cardPinError);
      // }
      // if (balanceError) {
      //   console.log(balanceError);
      // }
      // if (mobileNumberError) {
      //   console.log(mobileNumberError);
      // }
      // if (birthdateError) {
      //   console.log(birthdateError);
      // }
      // if (genderError) {
      //   console.log(genderError);
      // }
      // if (civilStatusError) {
      //   console.log(civilStatusError);
      // }
      // if (addressError) {
      //   console.log(addressError);
      // }
      setIsValidated(false);
      console.log(passwordError, passwordConfirmError);
      return;
    }
    setUserDataState(userData);
    setIsValidated(false);
    generateRecaptcha();
    //@ts-ignore
    const appVerifier = window.recaptchaVerifier;
    const submit = signInWithPhoneNumber(
      OTP_authentication,
      "+63" + String(userData.userprofile.mobile_number),
      appVerifier
    )
      .then((confirmationResult) => {
        //@ts-ignore
        window.confirmationResult = confirmationResult;
        setIsOTP(true);
      })
      .catch((error) => {
        toast.error(`Server response: ${error}.`, {
          className: "toast tst",
          position: "top-center",
        });
        console.log(error);
        setIsValidated(true);
        throw error;
      });
    toast.promise(
      submit,
      {
        pending: "Sending request to the server.",
        success: "OTP sent to your device.",
        error:
          "An error occured in the server. Please reload and try again in a while.",
      },
      {
        className: "toast tst",
        position: "top-center",
      }
    );
  };

  let login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let response = await fetch(`${baseUrl}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      setUnauthorized(false);

      setLoading(false);
    } else {
      setUnauthorized(true);

      setLoading(false);
    }
  };

  let logout = () => {
    setLoading(true);

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("login");

    setLoading(false);
  };

  let updateToken = async () => {
    let response = await fetch(`${baseUrl}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setUnauthorized(false);
    } else {
      setUnauthorized(true);
      logoutAdmin();
    }
  };

  let contextData: AuthContextType = {
    baseUrl: baseUrl,
    user: user,
    authTokens: authTokens,
    loginAdmin: loginAdmin,
    logoutAdmin: logoutAdmin,
    register: register,
    login: login,
    logout: logout,
    setUnauthorized: setUnauthorized,
    loading: loading,
    setLoading: setLoading,
    unauthorized: unauthorized,

    isValidated: isValidated,
    setIsValidated: setIsValidated,

    isOTP: isOTP,
    setIsOTP: setIsOTP,
    OTPInput: OTPInput,
    setOTPInput: setOTPInput,
    verifyOTP: verifyOTP,
  };

  useEffect(() => {
    let updateInterval = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, updateInterval);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  // useEffect(() => {
  //   const inactivityInterval = 1000 * 5;
  //   const interval = setTimeout(() => {
  //     if (authTokens) {
  //       logout();
  //     }
  //   }, inactivityInterval);
  //   console.log("inactive");
  //   return () => clearTimeout(interval);
  // }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuthContext.Provider value={contextData}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

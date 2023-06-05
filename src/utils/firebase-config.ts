import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_T3mk304mkZkrgOZ8JBOP3Ed4i2BhcaM",
  authDomain: "fortpay-otp.firebaseapp.com",
  projectId: "fortpay-otp",
  storageBucket: "fortpay-otp.appspot.com",
  messagingSenderId: "974776672634",
  appId: "1:974776672634:web:64d4785dc4e5e10eaff6c3",
};

const app = initializeApp(firebaseConfig);
export const OTP_authentication = getAuth(app);

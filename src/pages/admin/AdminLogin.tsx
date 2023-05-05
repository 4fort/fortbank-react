import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminLogin = () => {
  let { loginAdmin }: any = useContext(AuthContext);

  return (
    <>
      <form onSubmit={loginAdmin}>
        <input placeholder='username' name='username' type='text' />
        <input placeholder='password' name='password' type='password' />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default AdminLogin;

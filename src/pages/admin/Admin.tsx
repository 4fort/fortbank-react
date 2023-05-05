import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Admin = () => {
  let { name }: any = useContext(AuthContext);
  return (
    <>
      <h1>You are Logged in {name}!</h1>
    </>
  );
};

export default Admin;

import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import UsersTable from "../../components/admin/UsersTable";
import { AdminContext, AdminContextProvider } from "../../context/AdminContext";

import { FortbankUser } from "../../Interfaces/interfaces";
import "../../styles/admin/admin.css";

const Admin = () => {
  let { user, authTokens }: any = useContext(AuthContext);
  let [fortbankUsers, setFortbankUsers] = useState<FortbankUser[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setFortbankUsers(data);
  };

  return (
    <>
      <AdminContextProvider>
        <UsersTable fortbankUsers={fortbankUsers} />
      </AdminContextProvider>
    </>
  );
};

export default Admin;

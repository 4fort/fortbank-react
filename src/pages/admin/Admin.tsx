import React, { useContext, useState, useEffect } from "react";
import { TbSearch, TbUserPlus } from "react-icons/tb";

import AuthContext from "../../context/AuthContext";
import AdminContext from "../../context/AdminContext";
import UsersTable from "../../components/admin/UsersTable";

import { FortbankUser } from "../../Interfaces/interfaces";
import { User } from "../../Models/UserModel";
import "../../styles/admin/admin.css";

const Admin = () => {
  let { baseUrl, user, authTokens }: any = useContext(AuthContext);
  let {
    ownerName,
    email,
    cardNum,
    cardPin,
    balance,

    setOwnerName,
    setEmail,
    setCardNum,
    setCardPin,
    setBalance,

    selectedUserValues,

    modalMethod,
    setModalMethod,

    selectedUser,
    setSelectedUser,

    handleCloseModal,
    handleShowModal,

    fortbankUsers,

    getUsers,
    addUser,
  }: any = useContext(AdminContext);

  useEffect(() => {
    setOwnerName(selectedUser?.owner_name || "");
    setEmail(selectedUser?.email || "");
    setCardNum(selectedUser?.card_num || "");
    setCardPin(selectedUser?.card_pin || "");
    setBalance(selectedUser?.balance || "");
  }, [selectedUser]);

  return (
    <>
      <div className='adminActions'>
        <div>
          <span className='search'>
            <TbSearch />
            <input type='text' />
          </span>
          <button
            onClick={() => {
              setModalMethod(0);
              handleShowModal();
            }}
          >
            Add user <TbUserPlus />
          </button>
        </div>
      </div>
      <UsersTable fortbankUsers={fortbankUsers} />
    </>
  );
};

export default Admin;

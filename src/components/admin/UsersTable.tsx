import { useEffect, useRef, useState, useContext } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import Modal from "../Modal.tsx";
import { FortbankUser } from "../../Interfaces/interfaces.tsx";
import AdminContext from "../../context/AdminContext.tsx";

const UsersTable = () => {
  let {
    setSelectedUser,
    setModalMethod,
    handleShowModal,
    deleteUser,
    filteredUsers,
  }: any = useContext(AdminContext);

  return (
    <div className='tableWrapper'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Card Number</th>
            <th>Card PIN</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: FortbankUser) => (
              <tr key={user.id}>
                <td data-cell='id'>{user.id}</td>
                <td data-cell='name'>{user.owner_name}</td>
                <td data-cell='email'>{user.email}</td>
                <td data-cell='card number'>
                  {String(user.card_num)
                    .match(/.{1,3}/g)
                    .join("-")}
                </td>
                <td data-cell='card pin'>{user.card_pin}</td>
                <td data-cell='balance'>
                  ₱{parseFloat(user.balance).toLocaleString("en-US")}
                </td>
                <td data-cell='actions'>
                  <span>
                    <TbEdit
                      onClick={() => {
                        setModalMethod(1);
                        handleShowModal();
                        setSelectedUser(user);
                      }}
                    />
                  </span>
                  <span>
                    <TbTrash
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Users</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal />
    </div>
  );
};

export default UsersTable;

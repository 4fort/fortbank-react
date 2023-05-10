import { useEffect, useRef, useState, useContext } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import Modal from "../Modal.tsx";
import { FortbankUser } from "../../Interfaces/interfaces.tsx";
import AdminContext from "../../context/AdminContext.tsx";

const UsersTable = ({ fortbankUsers }: any) => {
  let {
    setSelectedUser,
    modalMethod,
    setModalMethod,

    handleCloseModal,
    handleShowModal,
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
          {fortbankUsers.length > 0 ? (
            fortbankUsers.map((user: any) => (
              <tr key={user.id}>
                <td data-cell='id'>{user.id}</td>
                <td data-cell='name'>{user.owner_name}</td>
                <td data-cell='email'>{user.email}</td>
                <td data-cell='card number'>{user.card_num}</td>
                <td data-cell='card pin'>{user.card_pin}</td>
                <td data-cell='balance'>₱{user.balance}</td>
                <td data-cell='actions'>
                  <span>
                    <TbEdit
                      onClick={() => {
                        setModalMethod(1);
                        handleShowModal();
                        setSelectedUser(
                          fortbankUsers.find((currentuser: any) => {
                            if (user.id === currentuser.id) return currentuser;
                            return null;
                          })
                        );
                      }}
                    />
                  </span>
                  <span>
                    <TbTrash />
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
      <Modal modalMethod={modalMethod} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default UsersTable;

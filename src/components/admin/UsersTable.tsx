import { useContext } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import Modal from "../Modal.tsx";
import { FortbankUser } from "../../Interfaces/interfaces.ts";
import AdminContext from "../../context/AdminContext.tsx";
import { AdminContextType } from "../../Interfaces/interfaces.ts";

const UsersTable = () => {
  const context = useContext<AdminContextType | null>(AdminContext) ?? {
    setSelectedUser: () => {},
    setModalMethod: () => {},
    handleShowModal: () => {},
    deleteUser: () => {},
    filteredUsers: () => {},
  };
  const {
    setSelectedUser,
    setModalMethod,
    handleShowModal,
    deleteUser,
    filteredUsers,
  } = context;

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
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user: FortbankUser) => (
              <tr key={user.id}>
                <td data-cell='id'>{user.id}</td>
                <td data-cell='name'>{user.owner_name}</td>
                <td data-cell='email'>{user.email}</td>
                <td data-cell='card number'>
                  {String(user.card_num)
                    ?.match(/.{1,3}/g)
                    ?.join("-")}
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
              <td colSpan={6}>No Users</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal />
    </div>
  );
};

export default UsersTable;

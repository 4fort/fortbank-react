import { useEffect, useRef, useState } from "react";
import { TbEdit, TbTrash, TbSearch, TbUserPlus, TbX } from "react-icons/tb";
import Modal from "../Modal.tsx";
import { FortbankUser } from "../../Interfaces/interfaces.tsx";

const UsersTable = ({ fortbankUsers }: any) => {
  const dialogRef = useRef(null);

  const modalMethods = ["Add User", "Update User"];
  const [modalMethod, setModalMethod] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<FortbankUser>();

  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    setOwnerName(selectedUser?.owner_name || "");
    setEmail(selectedUser?.email || "");
    setCardNum(selectedUser?.card_num || "");
    setCardPin(selectedUser?.card_pin || "");
    setBalance(selectedUser?.balance || "");
  }, [selectedUser]);

  let selectedUserValues = {
    owner_name: ownerName,
    email: email,
    card_num: cardNum,
    card_pin: cardPin,
    balance: balance,
  };

  const handleShowModal = () => {
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);

    setOwnerName("");
    setEmail("");
    setCardNum("");
    setCardPin("");
    setBalance("");

    dialogRef.current.close();
  };

  return (
    <>
      <table>
        <caption>
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
        </caption>
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
      <Modal
        dialogRef={dialogRef}
        modalMethods={modalMethods}
        modalMethod={modalMethod}
        handleCloseModal={handleCloseModal}
        selectedUserValues={selectedUserValues}
        setOwnerName={setOwnerName}
        setEmail={setEmail}
        setCardNum={setCardNum}
        setCardPin={setCardPin}
        setBalance={setBalance}
      />
    </>
  );
};

export default UsersTable;

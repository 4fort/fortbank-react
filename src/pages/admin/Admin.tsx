import { useContext } from "react";
import { TbSearch, TbUserPlus } from "react-icons/tb";

import AdminContext from "../../context/AdminContext";
import UsersTable from "../../components/admin/UsersTable";

import "../../styles/admin/admin.css";
import { AdminContextType } from "../../Interfaces/interfaces";

const Admin = () => {
  const context = useContext<AdminContextType | null>(AdminContext) ?? {
    setModalMethod: () => {},
    handleShowModal: () => {},
    setQuery: () => {},
  };
  const { setModalMethod, handleShowModal, setQuery } = context;

  return (
    <>
      <div className='adminActions'>
        <div>
          <span className='search'>
            <TbSearch />
            <input type='text' onChange={(e) => setQuery(e.target.value)} />
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
      <UsersTable />
    </>
  );
};

export default Admin;

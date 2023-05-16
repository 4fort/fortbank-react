import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../Interfaces/interfaces";
import ClientContext from "../context/ClientContext";

const AdminHeader = () => {
  let { user, logout } = useContext<AuthContextType | null>(AuthContext) ?? {
    logout: () => {},
  };
  let { userInfo } = useContext(ClientContext);

  return (
    <header>
      <div className='logo'>
        FORT<span>BANK</span>
      </div>
      <div className='actions'>
        {user && (
          <span>
            You are logged in, <b>{user?.username}</b>
          </span>
        )}
        {user ? (
          <span onClick={logout} className='logout'>
            Logout
          </span>
        ) : (
          <>
            <Link to='/admin'>Admin Dashboard</Link>
            <Link to='/'>Login</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;

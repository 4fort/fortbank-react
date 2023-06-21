import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { AuthContextType } from "../../Interfaces/interfaces";

const AdminHeader = () => {
  let { user, logoutAdmin } = useContext<AuthContextType | null>(
    AuthContext
  ) ?? { user: { username: "" } };

  return (
    <header className='admin'>
      <div className='logo admin'>
        FORT<span>PAY</span>
      </div>
      <div className='actions'>
        {user && (
          <span>
            You are logged in, <b>{user?.username}</b>
          </span>
        )}
        {user ? (
          <span onClick={logoutAdmin} className='logout'>
            Logout
          </span>
        ) : (
          <>
            <Link to='/login'>Client Login</Link>
            <Link to='/admin'>Login</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;

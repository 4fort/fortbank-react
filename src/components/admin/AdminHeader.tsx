import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const Header = () => {
  let { user, logoutAdmin }: any = useContext(AuthContext);
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
        <Link to='/admin-dashboard'>Admin Dashboard</Link>
        {user ? (
          <span onClick={logoutAdmin} className='logout'>
            Logout
          </span>
        ) : (
          <Link to='/admin'>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;

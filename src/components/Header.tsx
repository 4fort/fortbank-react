import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to='/admin-dashboard'>Admin Dashboard</Link>
      <span> | </span>
      <Link to='/admin'>Admin</Link>
    </div>
  );
};

export default Header;

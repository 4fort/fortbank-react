import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../styles/admin/admin.css";

const AdminLogin = () => {
  let { loginAdmin }: any = useContext(AuthContext);

  return (
    <div className='loginWrapper'>
      <form onSubmit={loginAdmin} className='loginForm'>
        <span>Login Admin</span>
        <label htmlFor='username'>Username</label>
        <input
          placeholder='username'
          name='username'
          id='username'
          type='text'
        />
        <label htmlFor='password'>Password</label>
        <input
          placeholder='password'
          name='password'
          id='password'
          type='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

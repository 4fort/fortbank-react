import { useContext } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import AuthContext from "../context/AuthContext";
import "../styles/style.css";
import { AuthContextType } from "../Interfaces/interfaces";
import { NavLink } from "react-router-dom";

const Login = () => {
  const context = useContext<AuthContextType | null>(AuthContext) ?? {
    login: () => {},
    unauthorized: true,
    setUnauthorized: () => {},
  };
  let { login: login, unauthorized } = context;

  return (
    <div className='loginWrapper'>
      <form onSubmit={login} className='loginForm'>
        <span>Login</span>
        {unauthorized ? (
          <span className='error'>
            <TbExclamationCircle />
            Unauthorized
          </span>
        ) : null}
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
        <span className='bottom-prompt'>
          Dont have an account? register&nbsp;
          <NavLink to='/register'>here</NavLink>
        </span>
      </form>
    </div>
  );
};

export default Login;

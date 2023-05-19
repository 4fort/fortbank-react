import { NavLink } from "react-router-dom";
import { TbChevronLeft } from "react-icons/tb";

const Pay = () => {
  return (
    <div className='main-panel pay'>
      <h1>
        Payment
        <NavLink to='/payment'>
          <TbChevronLeft /> Return
        </NavLink>
      </h1>
      <div className='container'>
        <div className='reference-code-wrapper'>
          <form action=''>
            <label htmlFor='reference-code'></label>
            <input type='text' id='reference-code' name='reference-code' />
            <button>Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pay;

import { TbChevronLeft } from "react-icons/tb";
import { NavLink } from "react-router-dom";

interface Props {
  setIsViewed: (e: boolean) => void;
}

const History = (props: Props) => {
  const { setIsViewed } = props;

  return (
    <div className='main-panel transactions'>
      <h1>
        Transactions
        <NavLink to='/transactions' onClick={() => setIsViewed(false)}>
          <TbChevronLeft /> Return
        </NavLink>
      </h1>
      <div className='history-card'>
        <div className='profile-pic'></div>
      </div>
    </div>
  );
};

export default History;

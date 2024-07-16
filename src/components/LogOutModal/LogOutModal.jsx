import { useDispatch } from 'react-redux';
import css from '../LogOutModal/LogOutModal.module.css';
import { logout } from '../../redux/user/operations';

export default function LogOutModal({ isModalOpen }) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logout())
      .unwrap()
      .then(() => isModalOpen(false));
  };
  return (
    <div className={css.modal}>
      <h3 className={css.title}>Log out</h3>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.btnWrap}>
        <button className={css.logoutBtn} type="button" onClick={onClick}>
          Log out
        </button>
        <button
          className={css.cancelBtn}
          type="button"
          onClick={() => isModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import css from '../LogOutModal/LogOutModal.module.css';
import { logout } from '../../redux/user/operations';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../redux/user/selectors';
import { Loader } from '../Loader/Loader';

export default function LogOutModal({ isModalOpen }) {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logout())
      .unwrap()
      .then(() => isModalOpen(false))
      .catch(() => toast.error('Sorry, try again later'));
  };
  return (
    <>
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
      {isLoading && <Loader />}
    </>
  );
}

import css from '../UserPanel/UserPanel.module.css';
import UserBar from '../../components/UserBar/UserBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { login } from '../../redux/user/operations';
export default function UserPanel() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={css.wrap}>
      <button
        onClick={() =>
          dispatch(login({ email: 'test1@gmail.com', password: 'test123' }))
        }
      >
        click
      </button>
      <p className={css.title}>
        Hello,{' '}
        <span className={css.name}>{user.name ? user.name : 'User'}</span>
      </p>
      <UserBar />
    </div>
  );
}

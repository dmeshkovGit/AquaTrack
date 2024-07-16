import css from '../UserPanel/UserPanel.module.css';
import UserBar from '../../components/UserBar/UserBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
export default function UserPanel() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className={css.wrap}>
      <p className={css.title}>
        Hello,{' '}
        <span className={css.name}>{user.name ? user.name : 'User'}</span>
      </p>
      <UserBar />
    </div>
  );
}

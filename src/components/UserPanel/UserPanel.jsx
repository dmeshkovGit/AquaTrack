import css from '../UserPanel/UserPanel.module.css';
import UserBar from '../../components/UserBar/UserBar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { login } from '../../redux/user/operations';
export default function UserPanel() {
  const user = useSelector(selectUser);
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

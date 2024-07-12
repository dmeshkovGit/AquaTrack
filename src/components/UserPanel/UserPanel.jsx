import css from '../UserPanel/UserPanel.module.css';
import UserBar from '../../components/UserBar/UserBar';

export default function UserPanel() {
  return (
    <div className={css.wrap}>
      <p className={css.title}>
        Hello, <span className={css.name}>Username</span>
      </p>
      <UserBar />
    </div>
  );
}

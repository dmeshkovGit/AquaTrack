import css from '../UserPanel/UserPanel.module.css';
import UserBar from '../../components/UserBar/UserBar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { login } from '../../redux/user/operations';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function UserPanel() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  return (
    <div className={css.wrap}>
      <p className={css.title}>
        {t('Hello user')},{' '}
        <span className={css.name}>{user.name ? user.name : 'User'}!</span>
      </p>
      <UserBar />
    </div>
  );
}

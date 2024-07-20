import { useDispatch, useSelector } from 'react-redux';
import css from '../LogOutModal/LogOutModal.module.css';
import { logout } from '../../redux/user/operations';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../redux/user/selectors';
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function LogOutModal({ isModalOpen }) {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logout())
      .unwrap()
      .then(() => isModalOpen(false))
      .catch(() => toast.error('Sorry, try again later'));
  };
  const { t } = useTranslation();
  return (
    <>
      <div className={css.modal}>
        <h3 className={css.title}>{t('Log out')}</h3>
        <p className={css.text}>{t('Do you really')}</p>
        <div className={css.btnWrap}>
          <button className={css.logoutBtn} type="button" onClick={onClick}>
            {isLoading ? <DotLoader text="Logging out" /> : t('Log out')}
          </button>
          <button
            className={css.cancelBtn}
            type="button"
            onClick={() => isModalOpen(false)}
          >
            {t('Log exit')}
          </button>
        </div>
      </div>
    </>
  );
}

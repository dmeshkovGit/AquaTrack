import { useDispatch, useSelector } from 'react-redux';
import css from '../LogOutModal/LogOutModal.module.css';
import { logout } from '../../redux/user/operations';
import toastMaker from '../../shared/helpers/toastMaker/toastMaker.jsx';
import { selectIsLoading } from '../../redux/user/selectors';
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function LogOutModal({ isModalOpen }) {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const onClick = () => {
    dispatch(logout())
      .unwrap()
      .then(() => isModalOpen(false))
      .catch(() => toastMaker(t('Sorry, try again later', 'error')));
  };

  return (
    <div className={css.modal}>
      <h3
        className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
      >
        {t('Log out')}
      </h3>
      <p className={clsx(css.text, { [css.textUk]: i18n.language === 'uk' })}>
        {t('Do you really')}
      </p>
      <div className={css.btnWrap}>
        <button
          className={clsx(css.logoutBtn, {
            [css.logoutBtnUk]: i18n.language === 'uk',
          })}
          type="button"
          onClick={onClick}
        >
          {isLoading ? <DotLoader text="Logging out" /> : t('Log out')}
        </button>
        <button
          className={clsx(css.cancelBtn, {
            [css.cancelBtnUk]: i18n.language === 'uk',
          })}
          type="button"
          onClick={() => isModalOpen(false)}
        >
          {t('Log exit')}
        </button>
      </div>
    </div>
  );
}

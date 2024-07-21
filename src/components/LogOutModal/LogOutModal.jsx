import { useDispatch, useSelector } from 'react-redux';
import css from '../LogOutModal/LogOutModal.module.css';
import { logout } from '../../redux/user/operations';
import toast from 'react-hot-toast';
import { selectIsLoading } from '../../redux/user/selectors';
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function LogOutModal({
  isModalOpen,
  titleText,
  messageText,
  confirmButtonText,
  cancelButtonText,
  loaderText,
  onConfirmClick,
  onCancelClick,
}) {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const onClick = () => {
  //   dispatch(logout())
  //     .unwrap()
  //     .then(() => isModalOpen(false))
  //     .catch(() => toast.error(t('Sorry, try again later')));
  // };

  const handleConfirmClick = () => {
    if (onConfirmClick) {
      onConfirmClick();
    } else {
      dispatch(logout())
        .unwrap()
        .then(() => isModalOpen(false))
        .catch(() => toast.error(t('Sorry, try again later')));
    }
  };

  const handleCancelClick = () => {
    if (onCancelClick) {
      onCancelClick();
    } else {
      isModalOpen(false);
    }
  };

  return (
    <>
      <div className={css.modal}>
        <h3 className={css.title}>{titleText || t('Log out')}</h3>
        <p className={css.text}>{messageText || t('Do you really')}</p>
        <div className={css.btnWrap}>
          <button
            className={css.logoutBtn}
            type="button"
            onClick={handleConfirmClick}
          >
            {isLoading ? (
              <DotLoader text={loaderText || t('Logging out')} />
            ) : (
              confirmButtonText || t('Log out')
            )}
          </button>
          <button
            className={css.cancelBtn}
            type="button"
            onClick={handleCancelClick}
          >
            {cancelButtonText || t('Log exit')}
          </button>
        </div>
      </div>
    </>
  );
}

import css from '../DeleteWaterModal/DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';
import { selectIsLoading } from '../../redux/water/selectors.js';
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

import clsx from 'clsx';

export default function DeleteWaterModal({ onClose, waterId }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const handleDelete = () => {
    try {
      dispatch(deleteWater(waterId))
        .unwrap()
        .then(() => onClose());
    } catch (error) {
      console.log(error);
    }
  };
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}></button>
        <h3
          className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
        >
          {t('Delete entry')}
        </h3>
        <p
          className={clsx(css.message, {
            [css.messageUk]: i18n.language === 'uk',
          })}
        >
          {t('Your sure')}
        </p>
        <div className={css.buttons}>
          <button
            className={clsx(css.deleteButton, {
              [css.deleteButtonUk]: i18n.language === 'uk',
            })}
            onClick={handleDelete}
          >
            {isLoading ? <DotLoader text="Deleting" /> : t('Delete card')}
          </button>
          <button className={css.cancelButton} onClick={onClose}>
            {t('Log exit')}
          </button>
        </div>
      </div>
    </>
  );
}

import css from '../DeleteWaterModal/DeleteWaterModal.module.css';
import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function DeleteWaterModal({ onClose, waterId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteWater(waterId));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const { t } = useTranslation();

  return (
    <div className={css.modalContent}>
      <button className={css.closeButton} onClick={onClose}></button>
      <h1 className={css.title}>{t('Delete entry')}</h1>
      <p className={css.message}>{t('Your sure')}</p>
      <div className={css.buttons}>
        <button className={css.deleteButton} onClick={handleDelete}>
          {t('Delete card')}
        </button>
        <button className={css.cancelButton} onClick={onClose}>
          {t('Log exit')}
        </button>
      </div>
    </div>
  );
}

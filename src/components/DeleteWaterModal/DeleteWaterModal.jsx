import css from '../DeleteWaterModal/DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';
import { selectIsLoading } from '../../redux/water/selectors.js';
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

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
  const { t } = useTranslation();

  return (
    <>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}></button>
        <h3 className={css.title}>{t('Delete entry')}</h3>
        <p className={css.message}>{t('Your sure')}</p>
        <div className={css.btnWrap}>
          <button
            className={css.deleteButton}
            type="button"
            onClick={handleDelete}
          >
            {isLoading ? <DotLoader text="Deleting" /> : t('Delete card')}
          </button>
          <button className={css.cancelButton} type="button" onClick={onClose}>
            {t('Log exit')}
          </button>
        </div>
      </div>
    </>
  );
}

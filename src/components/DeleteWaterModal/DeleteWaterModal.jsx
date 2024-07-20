import css from '../DeleteWaterModal/DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';
import { selectIsLoading } from '../../redux/water/selectors.js';
import { Loader } from '../../shared/components/Loader/Loader';

export default function DeleteWaterModal({ onClose, waterId }) {
  const dispatch = useDispatch();
  const isLoader = useSelector(selectIsLoading);

  const handleDelete = () => {
    try {
      dispatch(deleteWater(waterId));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}></button>
        <h3 className={css.title}>Delete entry</h3>
        <p className={css.message}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.btnWrap}>
          <button
            className={css.deleteButton}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className={css.cancelButton} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      {isLoader && <Loader />}
    </>
  );
}

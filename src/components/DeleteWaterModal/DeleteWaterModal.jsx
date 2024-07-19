import css from '../DeleteWaterModal/DeleteWaterModal.module.css';
import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';

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

  return (
    <div className={css.modalContent}>
      <button className={css.closeButton} onClick={onClose}></button>
      <h1 className={css.title}>Delete entry</h1>
      <p className={css.message}>Are you sure you want to delete the entry?</p>
      <div className={css.buttons}>
        <button className={css.deleteButton} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

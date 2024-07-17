import css from '../DeleteWaterModal/DeleteWaterModal.module.css';

export default function DeleteWaterModal({ onClose, onDelete }) {
  return (
    <div className={css.modalContent}>
      <button className={css.closeButton} onClick={onClose}></button>
      <h1 className={css.title}>Delete entry</h1>
      <p className={css.message}>Are you sure you want to delete the entry?</p>
      <div className={css.buttons}>
        <button className={css.deleteButton} onClick={onDelete}>
          Delete
        </button>
        <button className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

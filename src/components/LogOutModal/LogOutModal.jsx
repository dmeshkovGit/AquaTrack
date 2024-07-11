import css from '../LogOutModal/LogOutModal.module.css';

export default function LogOutModal({ isModalOpen }) {
  return (
    <div className={css.modal}>
      <h3 className={css.title}>Log out</h3>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.btnWrap}>
        <button className={css.logoutBtn} type="button">
          Log out
        </button>
        <button
          className={css.cancelBtn}
          type="button"
          onClick={() => isModalOpen(false)}
        >
          Cancel
        </button>
      </div>
      <button
        className={css.closeBtn}
        type="button"
        onClick={() => isModalOpen(false)}
      >
        X
      </button>
    </div>
  );
}

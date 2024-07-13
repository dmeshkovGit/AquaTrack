import Icon from '../Icon/Icon';
import clsx from 'clsx';
import css from '../AddWaterBtn/AddWaterBtn.module.css';

export default function AddWaterBtn({ handleOpen, addStyle }) {
  return (
    <button
      className={clsx(css.btn, addStyle && css.addStyle)}
      type="button"
      onClick={() => {
        handleOpen();
      }}
    >
      <Icon
        className={clsx(css.icon, addStyle && css.addIcon)}
        width="16"
        height="16"
        id="upload"
      />
      Add water
    </button>
  );
}

import clsx from 'clsx';
import css from '../CalendarItem/CalendarItem.module.css';

export default function CalendarItem({ item, activeDay }) {
  return (
    <div className={css.container}>
      <button
        className={clsx(css.button, item == activeDay && css.activeButton)}
      >
        {item}
      </button>
      <span className={css.label}>60%</span>
    </div>
  );
}
